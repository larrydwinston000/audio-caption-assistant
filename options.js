const statusEl = document.getElementById('status');
const saveKeyBtn = document.getElementById('saveKeyBtn');
const apiKeyInput = document.getElementById('apiKey');

// Load saved key
chrome.storage.local.get(['deepgramApiKey'], (result) => {
  if (result.deepgramApiKey) {
    apiKeyInput.value = result.deepgramApiKey;
  }
});

saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    statusEl.textContent = "❌ Please enter a valid API Key.";
    statusEl.style.color = '#d23f31';
    return;
  }

  chrome.storage.local.set({ deepgramApiKey: key }, () => {
    statusEl.textContent = "✅ Deepgram API Key saved!";
    statusEl.style.color = '#0f9d58';
    setTimeout(() => { statusEl.textContent = ''; }, 3000);
  });
});


