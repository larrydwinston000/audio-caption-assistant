# Live Caption Inputter Setup Guide

This Chrome extension automatically inputs dictated live captions (from your microphone or system audio) into any active text field.

## Prerequisites

- **Node.js**: Installed on your machine.
- **Deepgram API Key**: Sign up at [Deepgram](https://console.deepgram.com/) to get a free API Key.

## Installation on a New Device

1. **Clone/Copy the Project**:
   Copy the `caption-extension` folder to your new device.

2. **Install Dependencies**:
   Open a terminal in the project directory and run:
   ```bash
   npm install
   ```

3. **Build the Extension**:
   Generate the `mic.js` bundle by running:
   ```bash
   npm run build
   ```

4. **Load into Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the `caption-extension` folder.

## Configuration

1. **Open Setup**:
   - Click the extension icon (puzzle piece) and find **Live Caption Inputter**.
   - Click **Open Setup**.

2. **API Key**:
   - Paste your **Deepgram API Key** into the field.
   - Click **Save API Key**.

3. **Permissions**:
   - Click **Grant Microphone Access**. This allows the extension to listen to your voice.

4. **Capture Mode**:
   - Select your preferred mode:
     - **Both (Mic + Device Audio)**: Captures your voice AND your computer's sound.
     - **Microphone Only**: Captures only your voice.
     - **Device Audio Only**: Captures only your computer's sound.
   - Click **Save Capture Mode**.

## How to Use

1. **Click into a text field**: (Input, Textarea, or ContentEditable div).
2. **Start Captioning**: Press `Ctrl + K`.
   - *Note: If using Device Audio, a Chrome popup will ask you to share a screen/tab. You MUST check the "**Share system audio**" box for it to work.*
3. **Stop Captioning**: Press `Ctrl + L`.

## Troubleshooting

- **No captions appear?**
  - Check the Console (Right-click target page -> Inspect -> Console) for "Speech Error".
  - Ensure your API Key is valid and has remaining credit.
  - If using Device Audio, verify you checked the "Share system audio" box in the Chrome picker.
- **Connection closed?**
  - The extension includes an auto-reconnect feature if the WebSocket drops.
