
class SoundService {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  toggle(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    if (!this.isEnabled) return;
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
    
    gain.gain.setValueAtTime(volume, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start();
    osc.stop(this.ctx!.currentTime + duration);
  }

  playPop() {
    this.playTone(800, 'sine', 0.1, 0.1);
  }

  playClick() {
    this.playTone(150, 'square', 0.05, 0.05);
  }

  playChime() {
    this.playTone(880, 'sine', 0.15, 0.1);
    setTimeout(() => this.playTone(1109, 'sine', 0.2, 0.08), 50);
  }

  playSuccess() {
    const tones = [523, 659, 783, 1046];
    tones.forEach((t, i) => {
      setTimeout(() => this.playTone(t, 'sine', 0.3, 0.05), i * 100);
    });
  }

  playShutter() {
    if (!this.isEnabled) return;
    this.init();
    const bufferSize = this.ctx!.sampleRate * 0.1;
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx!.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx!.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.1);
    noise.connect(gain);
    gain.connect(this.ctx!.destination);
    noise.start();
  }
}

export const soundService = new SoundService();
