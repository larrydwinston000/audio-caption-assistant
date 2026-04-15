class AudioProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input && input.length > 0) {
      const numChannels = input.length;
      const numSamples = input[0].length;
      const int16Buffer = new Int16Array(numSamples);

      for (let i = 0; i < numSamples; i++) {
        // Sum and average all channels so merged streams are both audible
        let sum = 0;
        for (let c = 0; c < numChannels; c++) {
          sum += input[c][i];
        }
        const avg = sum / numChannels;
        const clamped = Math.max(-1, Math.min(1, avg));
        int16Buffer[i] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
      }

      this.port.postMessage(int16Buffer.buffer, [int16Buffer.buffer]);
    }
    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);
