// Ambient background music player and sound effects
// Combines real acoustic & piano background music with Web Audio API sound effects

export interface AudioTrack {
  id: string;
  title: string;
  tag: string;
  src: string;
  icon: string;
}

export const AVAILABLE_TRACKS: AudioTrack[] = [
  {
    id: 'acoustic',
    title: 'Acoustic Serenade',
    tag: 'Soft Guitar & Piano',
    src: '/audio/acoustic-guitar.mp3',
    icon: '🎸',
  },
  {
    id: 'piano',
    title: 'Heartwarming',
    tag: 'Calming Solo Piano',
    src: '/audio/calming-piano.mp3',
    icon: '🎹',
  },
];

type AudioListener = () => void;

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgAudio: HTMLAudioElement | null = null;
  private currentTrackId: string = 'acoustic';
  private customTrack: AudioTrack | null = null;
  private listeners: Set<AudioListener> = new Set();
  private volume: number = 0.45;
  private hasSetupInteractionListener: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalAutoplay();
    }
  }

  private setupGlobalAutoplay() {
    if (this.hasSetupInteractionListener) return;
    this.hasSetupInteractionListener = true;

    const startAudioOnFirstAction = () => {
      this.startMusic().catch(() => {});
      window.removeEventListener('click', startAudioOnFirstAction);
      window.removeEventListener('touchstart', startAudioOnFirstAction);
      window.removeEventListener('keydown', startAudioOnFirstAction);
      window.removeEventListener('scroll', startAudioOnFirstAction);
      window.removeEventListener('pointerdown', startAudioOnFirstAction);
    };

    window.addEventListener('click', startAudioOnFirstAction, { once: true });
    window.addEventListener('touchstart', startAudioOnFirstAction, { once: true });
    window.addEventListener('keydown', startAudioOnFirstAction, { once: true });
    window.addEventListener('scroll', startAudioOnFirstAction, { once: true });
    window.addEventListener('pointerdown', startAudioOnFirstAction, { once: true });
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // ignore errors in listeners
      }
    });
  }

  subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private getAudioElement(): HTMLAudioElement {
    if (!this.bgAudio && typeof window !== 'undefined') {
      this.bgAudio = new Audio();
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.volume;
      this.bgAudio.preload = 'auto';
      const track = this.getCurrentTrack();
      this.bgAudio.src = track.src;

      this.bgAudio.addEventListener('ended', () => {
        if (!this.isMuted) {
          this.bgAudio?.play().catch(() => {});
        }
      });
    }
    return this.bgAudio!;
  }

  getTracks(): AudioTrack[] {
    if (this.customTrack) {
      return [...AVAILABLE_TRACKS, this.customTrack];
    }
    return AVAILABLE_TRACKS;
  }

  getCurrentTrack(): AudioTrack {
    if (this.customTrack && this.currentTrackId === this.customTrack.id) {
      return this.customTrack;
    }
    const found = AVAILABLE_TRACKS.find((t) => t.id === this.currentTrackId);
    return found || AVAILABLE_TRACKS[0];
  }

  getCurrentTrackId(): string {
    return this.currentTrackId;
  }

  getIsMuted(): boolean {
    return this.isMuted;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
    this.notify();
  }

  // Continuously play background music anytime
  startMusic(): Promise<boolean> {
    this.isMuted = false;
    this.initContext();
    const audioEl = this.getAudioElement();

    return audioEl
      .play()
      .then(() => {
        this.notify();
        return true;
      })
      .catch((err) => {
        // If initial play without gesture is rejected by browser policy,
        // it will be triggered immediately by setupGlobalAutoplay
        console.log('Background music waiting for first user gesture:', err.message);
        return false;
      });
  }

  // Toggle background soundtrack
  toggleMusic(): boolean {
    this.initContext();
    const audioEl = this.getAudioElement();

    if (this.isMuted) {
      this.isMuted = false;
      audioEl
        .play()
        .then(() => {
          this.notify();
        })
        .catch((err) => {
          console.warn('Audio playback waiting for user gesture:', err);
          this.isMuted = true;
          this.notify();
        });
    } else {
      this.isMuted = true;
      audioEl.pause();
      this.notify();
    }

    return !this.isMuted;
  }

  // Switch to a different track
  setTrack(trackId: string): void {
    const previousTrackId = this.currentTrackId;
    this.currentTrackId = trackId;
    const track = this.getCurrentTrack();
    const audioEl = this.getAudioElement();

    if (previousTrackId !== trackId) {
      const wasPlaying = !this.isMuted;
      audioEl.src = track.src;
      audioEl.currentTime = 0;
      if (wasPlaying) {
        audioEl.play().catch(() => {});
      }
      this.notify();
    }
  }

  // Load a custom user audio file
  setCustomTrack(file: File): void {
    const url = URL.createObjectURL(file);
    const custom: AudioTrack = {
      id: 'custom-' + Date.now(),
      title: file.name.replace(/\.[^/.]+$/, '').slice(0, 24),
      tag: 'Custom Upload',
      src: url,
      icon: '🎵',
    };
    this.customTrack = custom;
    this.setTrack(custom.id);
  }

  // Sound Effect: Play a soft, dreamy chime tone
  playChime(freq = 659.25) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch {
      // Audio context might fail before user interaction
    }
  }

  // Sound Effect: Soft cheerful pop
  playPop() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // ignore
    }
  }

  // Sound Effect: Sparkle / shimmer arpeggio
  playSparkle() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq);
      }, idx * 60);
    });
  }

  // Sound Effect: Celebration harmonic chords
  playCelebration() {
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq);
      }, idx * 90);
    });
  }

  // Sound Effect: Paper rustle sound for letter opening
  playRustle() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // ignore
    }
  }
}

export const audio = new AudioManager();
