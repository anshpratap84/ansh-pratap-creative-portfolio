import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Film, CheckCircle2, Play, Volume2, VolumeX, Download, RotateCcw, AlertCircle, Sparkles, Sliders } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4',
  title = 'Stop Cyberbullying Awareness Video',
  subtitle = 'iStudio Video Editing Internship Final Project (50–60s)',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Available stream options (optimized for web playback)
  const streamOptions = [
    {
      id: 'web',
      label: 'HD Stream',
      tag: '8.4 MB · Fast Buffer',
      src: '/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4',
    },
  ];

  // Default to web-optimized stream for instant, stutter-free playback
  const [selectedQuality, setSelectedQuality] = useState<'web' | 'hd'>('web');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted to guarantee browser autoplay works
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(57.5);

  const activeSrc = videoSrc || '/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4';

  // Master clean close handler to stop playback, exit fullscreen, and unlock scroll
  const handleCleanClose = useCallback(() => {
    // 1. Exit fullscreen mode cleanly if user entered native fullscreen
    if (document.fullscreenElement) {
      try {
        document.exitFullscreen().catch(() => {});
      } catch (_) {}
    }

    // 2. Pause video immediately and mute to avoid audio crackle or pipeline stutter
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.muted = true;
      } catch (_) {}
    }

    // 3. Immediately restore scrolling to document and body
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // 4. Blur any active element to return keyboard scroll control to window
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 5. Trigger parent close state
    onClose();
  }, [onClose]);

  // Unmount safety guard: ensure document scroll is always restored
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Modal lifecycle & keyboard navigation
  useEffect(() => {
    if (!isOpen) {
      // Guarantee scroll is restored whenever modal is inactive
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    // Lock page scroll while modal is actively open
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCleanClose();
      }
      if (e.key === ' ' && videoRef.current) {
        const target = e.target as HTMLElement | null;
        const isInteractive = target && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName);
        if (!isInteractive) {
          e.preventDefault();
          togglePlay();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    setHasError(false);
    setErrorMessage('');
    setIsLoading(true);

    // Attempt gentle muted autoplay once mounted
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch(() => {
              // Autoplay blocked by browser policy; user can tap play button
              setIsPlaying(false);
              setIsLoading(false);
            });
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);

      // ALWAYS restore body and html overflow during cleanup
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';

      // Gracefully pause video to eliminate hardware decoding glitch
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (_) {}
      }
    };
  }, [isOpen, handleCleanClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.warn('Playback error or gesture needed:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const unmuteAndPlay = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    setIsMuted(false);
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    const error = videoElement.error;
    console.error('Video error event:', error);

    // If abort, ignore
    if (error && error.code === 1) return;

    // If currently on HD, automatically fallback to Web stream first
    if (selectedQuality === 'hd') {
      console.warn('HD stream encountered issue, auto-falling back to 720p Web stream...');
      setSelectedQuality('web');
      setHasError(false);
      setIsLoading(true);
      return;
    }

    let message = 'Unable to decode video format in current browser.';
    if (error) {
      switch (error.code) {
        case 2:
          message = 'Network error while buffering the video stream.';
          break;
        case 3:
          message = 'Video decoding error occurred during playback.';
          break;
        case 4:
          message = 'The video format or codec is not supported by your browser.';
          break;
      }
    }
    setHasError(true);
    setErrorMessage(message);
    setIsLoading(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage('');
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const switchQuality = (quality: 'web' | 'hd') => {
    if (quality === selectedQuality) return;
    const prevTime = videoRef.current ? videoRef.current.currentTime : 0;
    setSelectedQuality(quality);
    setHasError(false);
    setIsLoading(true);

    // Restore time after new stream loads
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.currentTime = prevTime;
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="video-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCleanClose();
          }}
        >
          <motion.div
            key="video-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#1B1E26] border border-[#262A34] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-[#262A34] bg-[#111318] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#C6F36B]/10 border border-[#C6F36B]/30 flex items-center justify-center text-[#C6F36B]">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#F3F1EA] font-display">
                    {title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#9296A2] font-mono">{subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Stream Quality Selector */}
                <div className="flex items-center bg-[#1B1E26] border border-[#262A34] rounded-lg p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => switchQuality('web')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      selectedQuality === 'web'
                        ? 'bg-[#C6F36B] text-[#111318] font-bold shadow-sm'
                        : 'text-[#9296A2] hover:text-[#FFFFFF]'
                    }`}
                    title="720p Web Stream (Fast buffer, 8.4MB)"
                  >
                    720p Fast
                  </button>
                  <button
                    type="button"
                    onClick={() => switchQuality('hd')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      selectedQuality === 'hd'
                        ? 'bg-[#C6F36B] text-[#111318] font-bold shadow-sm'
                        : 'text-[#9296A2] hover:text-[#FFFFFF]'
                    }`}
                    title="1080p Original Quality (56MB)"
                  >
                    1080p HD
                  </button>
                </div>

                {/* Download Video */}
                <a
                  href="/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4"
                  download="Stop_Cyberbullying_Ansh_Pratap.mp4"
                  className="p-2 text-[#9296A2] hover:text-[#C6F36B] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  title="Download Genuine Video File"
                >
                  <Download className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCleanClose}
                  className="p-2 text-[#9296A2] hover:text-[#F3F1EA] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player Display Container */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              {hasError ? (
                <div className="p-8 text-center flex flex-col items-center max-w-md">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base text-[#F3F1EA] font-bold font-display mb-1.5">
                    Playback Issue Encountered
                  </h4>
                  <p className="text-xs text-[#9296A2] mb-5 leading-relaxed">
                    {errorMessage || 'Browser could not initialize the video stream.'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#111318] bg-[#C6F36B] hover:bg-[#d5faa0] rounded-lg transition-all cursor-pointer shadow-md"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Again</span>
                    </button>
                    <button
                      onClick={() => switchQuality('web')}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#F3F1EA] bg-[#262A34] hover:bg-[#323642] rounded-lg transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C6F36B]" />
                      <span>Use 720p Fast Stream</span>
                    </button>
                    <a
                      href="/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4"
                      download="Stop_Cyberbullying_Ansh_Pratap.mp4"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#9296A2] hover:text-[#FFFFFF] bg-white/5 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Video</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* HTML5 Video Element with Full Inline Controls & Autoplay Support */}
                  <video
                    key={activeSrc}
                    ref={videoRef}
                    src={activeSrc}
                    controls
                    playsInline
                    autoPlay
                    muted={isMuted}
                    preload="auto"
                    onPlay={() => {
                      setIsPlaying(true);
                      setIsLoading(false);
                    }}
                    onPause={() => setIsPlaying(false)}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                    onCanPlay={() => setIsLoading(false)}
                    onLoadedData={() => setIsLoading(false)}
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setCurrentTime(videoRef.current.currentTime);
                        if (videoRef.current.duration) {
                          setDuration(videoRef.current.duration);
                        }
                      }
                    }}
                    onError={handleVideoError}
                    className="w-full h-full object-contain"
                  >
                    <source src={activeSrc} type="video/mp4" />
                    Your browser does not support HTML5 video playback.
                  </video>

                  {/* Big Center Play Button (shown only when paused, ready, and not in error) */}
                  {!isPlaying && !isLoading && !hasError && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C6F36B] text-[#111318] flex items-center justify-center shadow-[0_0_30px_rgba(198,243,107,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer z-10"
                      aria-label="Play video"
                    >
                      <Play className="w-7 h-7 fill-current translate-x-0.5 text-[#111318]" />
                    </button>
                  )}

                  {/* Floating "Tap to Unmute" Button (Displays when playing in muted autoplay mode) */}
                  {isMuted && isPlaying && (
                    <button
                      onClick={unmuteAndPlay}
                      className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#111318]/90 hover:bg-[#111318] border border-[#C6F36B]/60 text-white text-xs font-medium backdrop-blur-md transition-all cursor-pointer shadow-[0_0_20px_rgba(198,243,107,0.25)] hover:scale-105"
                    >
                      <VolumeX className="w-4 h-4 text-[#C6F36B] animate-pulse" />
                      <span className="text-[#F3F1EA]">Tap to Unmute Audio</span>
                    </button>
                  )}

                  {/* Buffering Indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none z-10">
                      <div className="flex flex-col items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full border-2 border-[#C6F36B] border-t-transparent animate-spin" />
                        <span className="text-xs font-mono text-[#F3F1EA]">Loading Video Stream...</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer / Context */}
            <div className="px-5 py-3.5 bg-[#111318] border-t border-[#262A34] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9296A2]">
              <div className="flex items-center gap-2 text-[#C6F36B] font-mono font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified iStudio Internship Final Project · Duration: ~57s</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-[#9296A2] font-mono">
                <span className="hidden sm:inline">Active Stream: {selectedQuality === 'web' ? '720p (8.4MB)' : '1080p Master (56MB)'}</span>
                <span>Adobe Premiere Pro & CapCut · Timeline Editing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
