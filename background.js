let creating;

async function setupOffscreenDocument(path) {
  // Check all windows configured to check if the offscreen document exists
  const offscreenUrl = chrome.runtime.getURL(path);
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    return;
  }

  // Create the offscreen document if not already in the process of creating
  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: ['USER_MEDIA'],
      justification: 'To transcribe live audio to text in the background'
    });
    await creating;
    creating = null;
  }
}

let currentActiveTabId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'get_tab_stream_id') {
    const tabId = sender.tab ? sender.tab.id : null;
    if (tabId) {
      chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
        sendResponse({ streamId });
      });
      return true;
    } else {
      sendResponse({ streamId: null });
    }
  } else if (message.action === 'start_captions') {
    currentActiveTabId = sender.tab ? sender.tab.id : null;
    console.log("Starting captions for tab:", currentActiveTabId);
    
    setupOffscreenDocument('offscreen.html').then(() => {
      chrome.runtime.sendMessage({ action: 'offscreen_start_recognition' });
    });
  } else if (message.action === 'stop_captions') {
    chrome.runtime.sendMessage({ action: 'offscreen_stop_recognition' });
  } else if (message.action === 'caption_result') {
    // Forward the recognized text to the active tab
    if (currentActiveTabId) {
      chrome.tabs.sendMessage(currentActiveTabId, { 
        action: 'insert_text', 
        text: message.text 
      });
    }
  } else if (message.action === 'offscreen_error') {
    console.error("Offscreen error:", message.error);
    if (message.error === 'not-allowed') {
      // Need permission
      if (currentActiveTabId) {
        chrome.tabs.sendMessage(currentActiveTabId, {
          action: 'notify_error',
          error: 'Please click the extension icon to grant microphone permission first.'
        });
      }
    }
  }
});
