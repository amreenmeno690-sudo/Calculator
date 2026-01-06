
import React, { useRef, useEffect, useState } from 'react';
import { soundService } from '../services/soundService';

const LabScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [detectedCount, setDetectedCount] = useState(0);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' }, 
          audio: false 
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    };
    setupCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const startScan = () => {
    soundService.playShutter();
    setIsScanning(true);
    setHasResult(false);
    
    // Simulate scan duration
    setTimeout(() => {
      setIsScanning(false);
      setHasResult(true);
      setDetectedCount(Math.floor(Math.random() * 5) + 1);
      soundService.playSuccess();
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-fade-in overflow-hidden relative">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Skin Lab</h2>
        <p className="text-slate-400 font-medium">AI Pimple Detection</p>
      </div>

      <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-white/10 glass-panel shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-60"
        />
        
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="laser-line absolute w-full z-20"></div>
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
          </div>
        )}

        {hasResult && !isScanning && (
          <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="glass-panel p-8 rounded-[2.5rem] text-center border-primary/30 border-2 animate-confetti">
              <span className="material-symbols-outlined text-6xl text-primary mb-4">check_circle</span>
              <h3 className="text-2xl font-bold mb-1">Analysis Complete</h3>
              <p className="text-slate-400 mb-6">We detected <span className="text-white font-bold">{detectedCount}</span> areas of interest.</p>
              <button 
                onClick={() => setHasResult(false)}
                className="px-8 py-3 bg-primary rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Retake
              </button>
            </div>
          </div>
        )}

        {/* Framing Overlay */}
        <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none">
          <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-white/40"></div>
          <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-white/40"></div>
          <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-white/40"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-white/40"></div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={startScan}
          disabled={isScanning}
          className={`size-20 rounded-full flex items-center justify-center glass-button shadow-xl ${isScanning ? 'opacity-50 grayscale' : 'hover:scale-110 active:scale-90 border-primary/40'}`}
        >
          <div className="size-16 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/5">
            <span className="material-symbols-outlined text-4xl text-white">camera</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LabScreen;
