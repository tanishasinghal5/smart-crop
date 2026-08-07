// Local, browser-side ASR worker. The model is downloaded once and then cached
// by the browser; microphone audio is never sent to a speech-recognition API.
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

env.allowLocalModels = false;

const MODEL_ID = 'onnx-community/whisper-small';
let transcriber;
let transcriberPromise;

function reportProgress(progress) {
  if (progress?.status === 'progress') {
    self.postMessage({
      type: 'progress',
      progress: progress.progress,
      file: progress.file || '',
    });
  }
}

async function getTranscriber() {
  if (!transcriberPromise) {
    self.postMessage({ type: 'loading' });
    transcriberPromise = pipeline('automatic-speech-recognition', MODEL_ID, {
      dtype: 'q4',
      progress_callback: reportProgress,
    }).then((loaded) => {
      transcriber = loaded;
      return loaded;
    }).catch((error) => {
      transcriberPromise = undefined;
      throw error;
    });
  }
  return transcriber || transcriberPromise;
}

self.onmessage = async ({ data }) => {
  if (data.type === 'warmup') {
    try {
      await getTranscriber();
      self.postMessage({ type: 'ready' });
    } catch (error) {
      self.postMessage({ type: 'error', message: error?.message || 'The on-device speech model could not load.' });
    }
    return;
  }

  if (data.type !== 'transcribe') return;

  try {
    const asr = await getTranscriber();
    self.postMessage({ type: 'transcribing' });
    const result = await asr(new Float32Array(data.audio), {
      language: data.language,
      task: 'transcribe',
      return_timestamps: false,
    });
    self.postMessage({ type: 'complete', text: result?.text?.trim() || '' });
  } catch (error) {
    self.postMessage({ type: 'error', message: error?.message || 'The on-device transcription could not be completed.' });
  }
};
