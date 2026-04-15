const WebSocket = require('ws');

const apiKey = 'a4bf7549cbd5a229610e9bb328818f373d05d443';

// Test 1: v2 endpoint with flux params
const url1 = 'wss://api.deepgram.com/v2/listen?model=flux-general-en&eot_threshold=0.7&eot_timeout_ms=5000&smart_format=true';
const ws1 = new WebSocket(url1, ['token', apiKey]);

ws1.on('open', () => console.log('v2 ws1 OPEN'));
ws1.on('error', (e) => console.log('v2 ws1 ERROR', e.message));
ws1.on('close', (c,r) => console.log('v2 ws1 CLOSE', c, r));

// Test 2: v1 endpoint with generic params
const url2 = 'wss://api.deepgram.com/v1/listen?model=nova-2';
const ws2 = new WebSocket(url2, ['token', apiKey]);

ws2.on('open', () => console.log('v1 ws2 OPEN'));
ws2.on('error', (e) => console.log('v1 ws2 ERROR', e.message));
ws2.on('close', (c,r) => console.log('v1 ws2 CLOSE', c, r));
