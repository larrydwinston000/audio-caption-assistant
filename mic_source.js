import { createClient } from "@deepgram/sdk";

let micStream = null;
let deviceStream = null;
let connection = null;
let isRecording = false;
let audioContext = null;
let audioProcessor = null;
let keepAliveInterval = null;
let currentApiKey = null;
let currentCaptureMode = null;

async function getStreams(captureMode, streamId) {
  const streams = [];

  if (captureMode === 'mic' || captureMode === 'both') {
    try {
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStream = mic;
      streams.push(mic);
    } catch (err) {
      console.warn('Mic access failed:', err.message);
      if (captureMode === 'mic') throw err; // hard fail for mic-only
      // for 'both', continue and try device
    }
  }

  if (captureMode === 'device' || captureMode === 'both') {
    try {
      let device;
      if (streamId) {
        device = await navigator.mediaDevices.getUserMedia({
          audio: {
            mandatory: {
              chromeMediaSource: 'tab',
              chromeMediaSourceId: streamId
            }
          },
          video: false
        });
      } else {
        device = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,  // required to show screen picker
          audio: true
        });
        // Drop the video track immediately — we only need audio
        device.getVideoTracks().forEach(t => t.stop());
      }
      deviceStream = device;

      if (device.getAudioTracks().length > 0) {
        streams.push(device);
      } else {
        window.parent.postMessage({ 
          type: 'CAPTIONS_ERROR', 
          error: 'No system audio captured. Make sure to check "Share system audio" in the screen picker.' 
        }, '*');
        // Still continue with mic if available
      }
    } catch (err) {
      if (captureMode === 'device') throw err; // hard fail for device-only
      // For 'both', warn and continue with mic only
      console.warn('Device audio failed or was cancelled:', err.message);
      window.parent.postMessage({ 
        type: 'CAPTIONS_ERROR', 
        error: 'Device audio unavailable, falling back to microphone only.' 
      }, '*');
    }
  }

  return streams;
}

// Sets up (or re-establishes) only the Deepgram WebSocket connection,
// reusing the already-running audioContext and audioProcessor.
function openDeepgramConnection(apiKey) {
  if (!audioContext || !audioProcessor) return;

  const deepgram = createClient(apiKey);

  connection = deepgram.listen.live({ 
    model: "nova-2", 
    smart_format: true,
    encoding: "linear16",
    sample_rate: audioContext.sampleRate,
    channels: 1
  });

  // Route worklet PCM output to the new connection
  audioProcessor.port.onmessage = (event) => {
    if (isRecording && connection) {
      connection.send(event.data);
    }
  };

  connection.on("open", () => {
    console.log('Deepgram connection opened');
    clearInterval(keepAliveInterval);
    keepAliveInterval = setInterval(() => {
      if (connection) {
        connection.keepAlive();
      }
    }, 8000);
  });

  connection.on("Results", (data) => {
    const transcript = data.channel?.alternatives[0]?.transcript;
    if (transcript && data.is_final) {
      window.parent.postMessage({ type: 'CAPTIONS_RESULT', text: transcript + ' ' }, '*');
    }
  });

  connection.on("error", (error) => {
    console.error('Deepgram WebSocket error:', error);
    window.parent.postMessage({ type: 'CAPTIONS_ERROR', error: 'Deepgram connection error. Check your API key.' }, '*');
  });

  connection.on("close", () => {
    console.log('Deepgram connection closed');
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    connection = null;

    if (isRecording) {
      console.log('Unexpected close, reconnecting in 1.5s...');
      setTimeout(() => {
        if (isRecording) {
          openDeepgramConnection(currentApiKey);
        }
      }, 1500);
    }
  });
}

async function startDeepgram(apiKey, captureMode = 'both', streamId = null) {
  currentApiKey = apiKey;
  currentCaptureMode = captureMode;

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const streams = await getStreams(captureMode, streamId);

    if (streams.length === 0) {
      window.parent.postMessage({ type: 'CAPTIONS_ERROR', error: 'No audio streams available. Check permissions.' }, '*');
      audioContext.close();
      audioContext = null;
      return;
    }

    isRecording = true;

    // Load the worklet module
    await audioContext.audioWorklet.addModule(chrome.runtime.getURL('audio-processor.js'));
    audioProcessor = new AudioWorkletNode(audioContext, 'audio-processor', {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      outputChannelCount: [1]
    });

    // Connect all audio streams into a single worklet input
    if (streams.length > 1) {
      const merger = audioContext.createChannelMerger(streams.length);
      streams.forEach((stream, i) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(merger, 0, i);
      });
      merger.connect(audioProcessor);
    } else {
      const source = audioContext.createMediaStreamSource(streams[0]);
      source.connect(audioProcessor);
    }

    // Needed in some browsers to keep the worklet alive
    audioProcessor.connect(audioContext.destination);

    // Open Deepgram WebSocket now that audio pipeline is ready
    openDeepgramConnection(apiKey);

  } catch (error) {
    console.error("Audio error:", error);
    isRecording = false;
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    window.parent.postMessage({ 
      type: 'CAPTIONS_ERROR', 
      error: error.message || 'Audio access denied or cancelled' 
    }, '*');
  }
}

function stopCaptions() {
  isRecording = false;

  clearInterval(keepAliveInterval);
  keepAliveInterval = null;

  if (connection) {
    connection.requestClose();
    connection = null;
  }

  if (audioProcessor) {
    audioProcessor.disconnect();
    audioProcessor = null;
  }

  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close();
  }
  audioContext = null;

  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }

  if (deviceStream) {
    deviceStream.getTracks().forEach(track => track.stop());
    deviceStream = null;
  }

  currentApiKey = null;
  currentCaptureMode = null;
}

window.addEventListener('message', (event) => {
  if (event.data.type === 'START_CAPTIONS') {
    if (!isRecording && event.data.apiKey) {
      startDeepgram(event.data.apiKey, event.data.captureMode || 'both', event.data.streamId);
    } else if (!event.data.apiKey) {
      window.parent.postMessage({ type: 'CAPTIONS_ERROR', error: 'Missing Deepgram API Key' }, '*');
    }
  } else if (event.data.type === 'STOP_CAPTIONS') {
    stopCaptions();
  }
});
