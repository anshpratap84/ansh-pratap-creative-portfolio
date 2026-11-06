/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer for tactile UI sound effects
// Lightweight, zero-dependency, generated purely in-browser

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

// Initialize sound state from localStorage safely
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('portfolio_sound_enabled');
    soundEnabled = saved === 'true';
  } catch {
    soundEnabled = false;
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const soundManager = {
  isEnabled(): boolean {
    return soundEnabled;
  },

  toggleSound(): boolean {
    soundEnabled = !soundEnabled;
    try {
      localStorage.setItem('portfolio_sound_enabled', String(soundEnabled));
    } catch {
      // ignore
    }
    if (soundEnabled) {
      this.playClick();
    }
    return soundEnabled;
  },

  setSound(enabled: boolean): void {
    soundEnabled = enabled;
    try {
      localStorage.setItem('portfolio_sound_enabled', String(soundEnabled));
    } catch {
      // ignore
    }
  },

  // Soft tactile tick for button clicks and tab shifts
  playClick(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Silent catch
    }
  },

  // Subtle airy chirp on element hover
  playHover(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.025);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Silent catch
    }
  },

  // Gentle low-pass whoosh for opening modal or video
  playWhoosh(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.12);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Silent catch
    }
  },

  // Pleasant harmonic chime on action success
  playSuccess(): void {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.18);
      });
    } catch {
      // Silent catch
    }
  },
};
