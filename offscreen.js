let recognition = null;
let isRecognizing = false;
let mediaStream = null;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = function() {
    isRecognizing = true;
    console.log("Speech recognition started.");
  };

  recognition.onresult = function(event) {
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }
    
    if (finalTranscript.trim().length > 0) {
      chrome.runtime.sendMessage({ 
        action: 'caption_result', 
        text: finalTranscript.trim() + ' ' 
      });
    }
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    isRecognizing = false;
    chrome.runtime.sendMessage({
      action: 'offscreen_error',
      error: event.error
    });
  };

  recognition.onend = function() {
    isRecognizing = false;
    console.log("Speech recognition ended.");
  };
} else {
  console.error("Speech Recognition API not supported.");
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'offscreen_start_recognition') {
    if (recognition && !isRecognizing) {
      try {
        // Vital step: Grab media stream within offscreen document first
        // to wake up the microphone and satisfy Chrome's security for webkitSpeechRecognition
        if (!mediaStream) {
          mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        recognition.start();
      } catch (e) {
        console.error("Failed to start recognition:", e);
        chrome.runtime.sendMessage({
          action: 'offscreen_error',
          error: 'not-allowed'
        });
      }
    }
  } else if (message.action === 'offscreen_stop_recognition') {
    if (recognition && isRecognizing) {
      recognition.stop();
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
      }
    }
  }
});
