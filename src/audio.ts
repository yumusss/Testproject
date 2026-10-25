// Tiny Web Audio synth: no sound files needed.
const PENTATONIC = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];

let ctx: AudioContext | null = null;
let muted = false;

function getContext(): AudioContext | null {
  if (muted) return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.2
) {
  const audio = getContext();
  if (!audio) return;
  const t = audio.currentTime + start;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(volume, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

/** A note whose pitch follows the horizontal position (0..1), so the garden plays like a xylophone. */
export function playPlant(xFraction: number) {
  const index = Math.min(
    PENTATONIC.length - 1,
    Math.max(0, Math.floor(xFraction * PENTATONIC.length))
  );
  tone(PENTATONIC[index], 0, 0.6, 'triangle', 0.25);
  tone(PENTATONIC[index] * 2, 0.05, 0.4, 'sine', 0.08);
}

export function playFlutter() {
  [880, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.06, 0.18, 'sine', 0.12));
}

export function playMagic() {
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
    tone(f, i * 0.09, 0.5, 'triangle', 0.15)
  );
}

export function playCelebrate() {
  [523.25, 523.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.14, 0.35, 'square', 0.06));
}

export function playPop() {
  tone(220, 0, 0.15, 'sine', 0.2);
  tone(110, 0.05, 0.2, 'sine', 0.15);
}
