const { ipcRenderer } = require('electron');
const WebSocket = require('ws');

let audioContext = null;
let audioLocalStream = null;
let connection = null;
let keepAliveInterval = null;

async function startRecording(sourceId, apiKey) {
  try {
    document.getElementById('status').textContent = "Capturing System Audio...";
    
    // desktopCapturer stream
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId
        }
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          minWidth: 10,
          minHeight: 10,
          maxWidth: 10,
          maxHeight: 10
        }
      }
    });

    // Drop video track immediately
    stream.getVideoTracks().forEach(t => t.stop());
    
    if (stream.getAudioTracks().length === 0) {
      ipcRenderer.send('caption-error', 'No system audio tracks found.');
      return;
    }
    
    audioLocalStream = stream;
    
    // Process audio
    audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    
    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    source.connect(processor);
    processor.connect(audioContext.destination);
    
    // Setup Deepgram via direct WebSocket
    const url = `wss://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&interim_results=true&encoding=linear16&sample_rate=${audioContext.sampleRate}&channels=1`;
    connection = new WebSocket(url, {
      headers: {
        Authorization: `Token ${apiKey}`
      }
    });

    connection.on('open', () => {
      document.getElementById('status').textContent = "Connected to Deepgram";
      keepAliveInterval = setInterval(() => {
        if (connection && connection.readyState === WebSocket.OPEN) {
          connection.send(JSON.stringify({ type: "KeepAlive" }));
        }
      }, 8000);
    });

    processor.onaudioprocess = function(e) {
      if (connection && connection.readyState === WebSocket.OPEN) {
        const left = e.inputBuffer.getChannelData(0);
        const l = left.length;
        const buf = new Int16Array(l);
        for(let i = 0; i < l; i++) {
          buf[i] = Math.max(-1, Math.min(1, left[i])) * 0x7FFF;
        }
        connection.send(buf);
      }
    };

    connection.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        const transcript = data.channel?.alternatives[0]?.transcript;
        if (transcript) {
          ipcRenderer.send('caption-result', { text: transcript, isFinal: data.is_final });
        }
      } catch (err) {}
    });

    connection.on('error', (error) => {
      console.error(error);
      ipcRenderer.send('caption-error', 'Deepgram error');
      document.getElementById('status').textContent = "Error: Deepgram WS failed.";
    });

  } catch (e) {
    console.error(e);
    ipcRenderer.send('caption-error', e.message);
    document.getElementById('status').textContent = "Error: " + e.message;
  }
}

function stopRecording() {
  document.getElementById('status').textContent = "Waiting for connection...";
  if (keepAliveInterval) clearInterval(keepAliveInterval);
  if (connection && connection.readyState === WebSocket.OPEN) connection.close();
  if (audioContext) audioContext.close();
  if (audioLocalStream) audioLocalStream.getTracks().forEach(t => t.stop());
  connection = null;
  audioContext = null;
  audioLocalStream = null;
}

ipcRenderer.on('start-capture', (event, sourceId, apiKey) => {
  stopRecording();
  startRecording(sourceId, apiKey);
});

ipcRenderer.on('stop-capture', () => {
  stopRecording();
});
