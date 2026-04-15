let toast = null;
let micIframe = null;

function showToast(message, isError = false) {
  if (!toast) {
    toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.color = 'white';
    toast.style.fontFamily = 'sans-serif';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '999999';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.style.backgroundColor = isError ? '#d23f31' : '#0f9d58';
  toast.textContent = message;
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
}

function injectMicIframe() {
  if (!micIframe) {
    micIframe = document.createElement('iframe');
    micIframe.src = chrome.runtime.getURL('mic.html');
    micIframe.allow = "microphone; display-capture; camera";
    micIframe.style.display = 'none';
    document.body.appendChild(micIframe);
  }
}

let appWs = null;
let lastInterimLength = 0;

function insertText(payload) {
  const el = document.activeElement;
  if (!el) return;

  const text = payload.text;
  if (!text) return;

  const isFinal = payload.isFinal;
  const textToInsert = isFinal ? text + ' ' : text;

  if (el.isContentEditable) {
    if (lastInterimLength > 0) {
      for (let i = 0; i < lastInterimLength; i++) {
        document.execCommand('delete', false, null);
      }
    }
    document.execCommand('insertText', false, textToInsert);
    lastInterimLength = isFinal ? 0 : textToInsert.length;
  } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    const start = el.selectionStart;
    const end = el.selectionEnd;
    
    const replaceStart = Math.max(0, start - lastInterimLength);
    
    el.value = el.value.substring(0, replaceStart) + textToInsert + el.value.substring(end);
    el.selectionStart = el.selectionEnd = replaceStart + textToInsert.length;
    
    lastInterimLength = isFinal ? 0 : textToInsert.length;

    const eventObj = new Event('input', { bubbles: true });
    el.dispatchEvent(eventObj);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const activeObj = document.activeElement;
    if (activeObj && (activeObj.tagName === 'INPUT' || activeObj.tagName === 'TEXTAREA' || activeObj.isContentEditable)) {
      chrome.storage.local.get(['deepgramApiKey'], (result) => {
        if (!result.deepgramApiKey) {
          showToast('Deepgram API Key not set. Click extension icon to setup.', true);
          return;
        }

        if (appWs) {
          appWs.close();
        }

        appWs = new WebSocket('ws://localhost:8999');
        appWs.onopen = () => {
          lastInterimLength = 0;
          showToast('Live captions started (System Audio via Electron App)');
          appWs.send(JSON.stringify({ type: 'START_CAPTIONS', apiKey: result.deepgramApiKey }));
        };
        appWs.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'CAPTIONS_RESULT') {
              insertText(data.payload);
            } else if (data.type === 'CAPTIONS_ERROR') {
              showToast('System Audio Error: ' + data.error, true);
            }
          } catch (err) { }
        };
        appWs.onerror = () => {
          showToast('Could not connect to Electron app! Make sure it is running.', true);
        };
      });
    } else {
      showToast('Please click inside a text input field first.', true);
    }
  } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
    e.preventDefault();
    if (appWs && appWs.readyState === WebSocket.OPEN) {
      appWs.send(JSON.stringify({ type: 'STOP_CAPTIONS' }));
      appWs.close();
      appWs = null;
      showToast('Live captions stopped');
    }
  }
});
