import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Play,
  Volume2,
  Music,
  Sparkles,
  Sliders,
  Radio,
  Layers,
  ArrowRight,
  CheckCircle2,
  Share2,
  Compass,
  Headphones,
  Zap,
  Flame,
  Coffee,
  Truck,
  Scissors,
  Bus,
  Wrench,
  ShoppingBag,
  Dumbbell,
  Tractor,
  Car,
  Heart,
  Moon,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ZindagiCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZindagiCaseStudyModal: React.FC<ZindagiCaseStudyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const liveUrl = 'https://zindagi-ki-dhun.vercel.app';

  const playlistWorlds = [
    {
      num: '01',
      hindi: 'डीलक्स सैलून',
      english: 'Deluxe Salon',
      icon: Scissors,
      tag: 'Nostalgic scissors rhythm & radio classics',
      desc: 'The cozy neighborhood salon buzz with retro melodies, scissor clicks, and warm morning chatter.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '02',
      hindi: 'ट्रक वाला',
      english: 'Truck Wala',
      icon: Truck,
      tag: 'Highway bass, dhaba stops & midnight headlights',
      desc: 'Endless highway tarmac, glowing cabin decals, and high-octane folk anthems powering cross-country voyages.',
      accent: 'border-[#B83C2F]/40 bg-[#211614]',
    },
    {
      num: '03',
      hindi: 'बस वाला',
      english: 'Bus Wala',
      icon: Bus,
      tag: 'State transport horn & window-seat views',
      desc: 'Swaying ghat roads, breeze through open windows, and unforgettable regional travel ballads.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '04',
      hindi: 'राजू मिस्त्री',
      english: 'Raju Mistri',
      icon: Wrench,
      tag: 'Workshop clank, grease & transistor tunes',
      desc: 'The metallic cadence of spanners and engine tuning, backed by loud 90s cassette beats.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '05',
      hindi: 'ठेले वाली धुन',
      english: 'Thele Wali Dhun',
      icon: ShoppingBag,
      tag: 'Street market cries, evening rush & vendor radios',
      desc: 'The sensory rush of vibrant fruit stalls, evening crowds, and spontaneous street-side song broadcasts.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '06',
      hindi: 'जिम वाला',
      english: 'Gym Wala',
      icon: Dumbbell,
      tag: 'Iron weights, desi stamina & pump tracks',
      desc: 'Heavy iron clatter, raw adrenaline, and driving basslines powering intense workout repetitions.',
      accent: 'border-[#B83C2F]/40 bg-[#211614]',
    },
    {
      num: '07',
      hindi: 'ट्रैक्टर वाला',
      english: 'Tractor Wala',
      icon: Tractor,
      tag: 'Golden mustard fields, village dusk & heavy sub-bass',
      desc: 'Thumping subwoofers mounted on tractors rolling through fertile rural fields at sunset.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '08',
      hindi: 'ऑटो वाला',
      english: 'Auto Wala',
      icon: Car,
      tag: 'Meter down, city traffic weaves & stereo speakers',
      desc: 'Neon-lit three-wheelers cutting through city traffic with booming custom sound systems.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '09',
      hindi: 'चाय वाली धुन',
      english: 'Chai Wali Dhun',
      icon: Coffee,
      tag: 'Steaming cutting chai, morning mist & acoustic warmth',
      desc: 'First sips of ginger tea at the roadside stall at dawn, newspaper rustles, and soulful melodies.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
    {
      num: '10',
      hindi: 'बारात वाली धुन',
      english: 'Baraat Wali Dhun',
      icon: Flame,
      tag: 'Brass band horns, dhol beats & street dance',
      desc: 'Electric celebratory energy of Indian street weddings, roaring dhols, and joyful collective euphoria.',
      accent: 'border-[#B83C2F]/40 bg-[#211614]',
    },
    {
      num: '11',
      hindi: 'रात का सफर',
      english: 'Raat Ka Safar',
      icon: Moon,
      tag: 'Silent stars, yellow streetlights & deep lo-fi calm',
      desc: 'Empty 2:00 AM roads, cool breeze, contemplative silence, and deep introspective melodies.',
      accent: 'border-[#D99A35]/30 bg-[#1D1B16]',
    },
  ];

  const keyFeatures = [
    {
      num: '01',
      title: 'Cinematic Dynamic Backgrounds',
      desc: 'Environment backgrounds that smoothly transition according to the active playlist without interrupting playback.',
      icon: Layers,
    },
    {
      num: '02',
      title: 'Centralized Audio Engine',
      desc: 'A robust audio architecture managing track progression, playback state, queue orchestration, and cross-route persistence.',
      icon: Radio,
    },
    {
      num: '03',
      title: 'Live Waveform Visualizer',
      desc: 'Real-time audio visualization hooked into the browser Web Audio API AnalyserNode, dancing to frequency peaks.',
      icon: Volume2,
    },
    {
      num: '04',
      title: 'Persistent Music Player',
      desc: 'Floating mini-player on lower viewports expanding into an immersive, lyrics-ready full listening room.',
      icon: Headphones,
    },
    {
      num: '05',
      title: 'Mood-Based Music Discovery',
      desc: 'Browse emotional landscapes: Sukoon (Peace), Full Energy, Workout, Party, Purani Yaadein, and Baarish Aur Yaadein.',
      icon: Compass,
    },
    {
      num: '06',
      title: 'Custom Playlist Builder (Apni Dhun Banao)',
      desc: 'Allows listeners to curate, rename, customize, and save personal musical journeys backed by local storage.',
      icon: Sparkles,
    },
    {
      num: '07',
      title: 'Search & Personal Library',
      desc: 'Instant keyword search across tracks, artists, and lifestyle worlds with instant favoriting and history tracking.',
      icon: Music,
    },
  ];

  const techStack = [
    { name: 'React 19 & TypeScript', role: 'Component architecture, state safety & performance' },
    { name: 'Web Audio API', role: 'Audio waveform analysis & real-time visualizer canvas' },
    { name: 'HTML5 Audio Engine', role: 'Seamless streaming, track buffering & queue orchestration' },
    { name: 'Tailwind CSS', role: 'Custom antique cream & saffron cultural palette styling' },
    { name: 'Framer Motion', role: 'Cinematic background cross-fades & layout transitions' },
    { name: 'LocalStorage Architecture', role: 'Persistent user playlists, favorite tracks & volume memory' },
    { name: 'Lucide Creative Icons', role: 'Crisp tactile iconography for audio & navigation' },
    { name: 'Devanagari Typography', role: 'Authentic Indian bilingual typography & visual hierarchy' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 cursor-pointer"
        />

        {/* Modal Scroll Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 w-full h-full max-w-6xl max-h-[94vh] mx-4 sm:mx-6 my-auto rounded-3xl bg-[#10110F] text-[#F2E7D2] border border-[#D99A35]/30 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Sticky Top Header Bar */}
          <div className="px-6 py-4 border-b border-[#D99A35]/20 bg-[#171713]/95 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#D99A35]/15 border border-[#D99A35]/40 flex items-center justify-center text-[#D99A35]">
                <Music className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-[#F2E7D2] font-display">
                    ज़िंदगी की धुन
                  </span>
                  <span className="text-xs font-mono text-[#D99A35] uppercase tracking-wider font-semibold">
                    ZINDAGI KI DHUN
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#F2E7D2]/60 hidden sm:block">
                  Featured Case Study · Music Discovery & Streaming Platform
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D99A35] hover:bg-[#e6a945] text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-950" />
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                aria-label="Close Case Study"
                className="p-2.5 rounded-xl bg-[#171713] hover:bg-[#22231E] border border-[#D99A35]/30 text-[#F2E7D2] hover:text-[#D99A35] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Case Study Body */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-14 py-8 space-y-16 selection:bg-[#D99A35]/30 selection:text-[#F2E7D2]">
            {/* SECTION A — CINEMATIC PROJECT HERO */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D99A35]/30 bg-[#171713] shadow-2xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-04_at_12.53.48_PM_b5a859a7.png"
                  alt="Zindagi Ki Dhun Homepage — Indian Highway & Truck Showcase"
                  className="w-full h-full object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/40 to-transparent" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#D99A35] text-stone-950 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                    LIVE PRODUCTION PLATFORM
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#F2E7D2] font-mono text-xs">
                    INDIAN CULTURAL SOUNDSCAPES
                  </span>
                </div>
              </div>

              {/* Hero Title & Pitch */}
              <div className="p-6 sm:p-10 -mt-16 sm:-mt-24 relative z-10 bg-gradient-to-b from-transparent via-[#10110F]/90 to-[#10110F]">
                <div className="text-xs font-mono text-[#D99A35] tracking-widest uppercase mb-2 font-bold">
                  EK SAFAR · EK DHUN · DESI LIFE
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F2E7D2] font-display mb-3">
                  ज़िंदगी की धुन <span className="text-[#D99A35] font-sans text-2xl sm:text-4xl">· Zindagi Ki Dhun</span>
                </h1>
                <p className="text-lg sm:text-2xl font-serif italic text-[#D99A35] mb-4">
                  "Har Zindagi Ki Apni Dhun."
                </p>
                <p className="text-sm sm:text-base text-[#F2E7D2]/80 max-w-3xl leading-relaxed mb-8 font-normal">
                  A cinematic Indian lifestyle-inspired music discovery and streaming platform that celebrates everyday Indian life through music. From neighbourhood salons and decorated Indian trucks travelling along highways to roadside chai stalls, busy markets, wedding processions and midnight journeys, the platform transforms familiar Indian environments into individual musical experiences.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D99A35] hover:bg-[#e6a945] text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-4 h-4 text-stone-950" />
                  </a>

                  <a
                    href="https://github.com/anshpratap84"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#171713] hover:bg-[#22231E] border border-[#D99A35]/30 text-[#F2E7D2] font-mono text-xs font-semibold transition-all"
                  >
                    <span>Developer GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D99A35]" />
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION B — THE IDEA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-2xl bg-[#171713] border border-[#D99A35]/20">
              <div className="lg:col-span-5">
                <div className="text-xs font-mono uppercase tracking-widest text-[#D99A35] mb-2 font-bold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>THE CORE CONCEPT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#F2E7D2] font-display mb-3 leading-snug">
                  Music Is Everywhere. Every Life Has Its Own Dhun.
                </h2>
                <div className="w-16 h-1 bg-[#D99A35] rounded-full mb-6" />
                <p className="text-xs sm:text-sm text-[#F2E7D2]/80 leading-relaxed font-serif italic text-base">
                  "Every person has a story. Every journey has a soundtrack. Every life has its own dhun."
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4 text-sm text-[#F2E7D2]/85 leading-relaxed">
                <p>
                  India has music everywhere. A barber plays songs while cutting someone's hair. A truck driver travels hundreds of kilometres with music playing through the night. A chai seller starts the morning with old Bollywood songs.
                </p>
                <p>
                  Mainstream music apps organize music into sterile global genres—pop, rock, indie. But in India, music is deeply bound to <strong>physical atmosphere and everyday labor</strong>: the rattle of state transport buses, the grease and clatter of motorcycle repair workshops, the thumping speakers on rural tractors, and the chaotic euphoria of wedding processions.
                </p>
                <p className="text-[#D99A35] font-medium">
                  Zindagi Ki Dhun celebrates these everyday moments and transforms them into 11 curated, culturally rich musical worlds.
                </p>
              </div>
            </div>

            {/* SECTION C — THE 11 PLAYLIST WORLDS */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#D99A35]/20">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#D99A35] mb-1 font-bold">
                    ORIGINAL INDIAN SOUNDSCAPES
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#F2E7D2] font-display">
                    The 11 Curated Playlist Worlds.
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#F2E7D2]/60">
                  11 Worlds · Distinctive Cultural Atmospheres
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlistWorlds.map((world, idx) => {
                  const Icon = world.icon;
                  return (
                    <div
                      key={world.num}
                      className={`p-5 rounded-2xl border ${world.accent} hover:border-[#D99A35] transition-all duration-300 flex flex-col justify-between group shadow-md hover:-translate-y-1`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono text-[#D99A35] font-bold">
                            WORLD {world.num}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-[#D99A35]/15 border border-[#D99A35]/30 flex items-center justify-center text-[#D99A35] group-hover:scale-110 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="mb-1">
                          <h4 className="text-lg font-bold text-[#F2E7D2] font-display">
                            {world.hindi}
                          </h4>
                          <span className="text-xs font-mono text-[#D99A35]">
                            {world.english}
                          </span>
                        </div>

                        <div className="text-[11px] font-mono text-[#F2E7D2]/60 mb-3 italic">
                          {world.tag}
                        </div>

                        <p className="text-xs text-[#F2E7D2]/75 leading-relaxed">
                          {world.desc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#D99A35]/15 flex items-center justify-between text-[11px] font-mono text-[#D99A35]">
                        <span>Curated Soundscape</span>
                        <Play className="w-3 h-3 fill-current opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION D — KEY PRODUCT & ENGINEERING FEATURES */}
            <div>
              <div className="mb-8 pb-4 border-b border-[#D99A35]/20">
                <div className="text-xs font-mono uppercase tracking-widest text-[#D99A35] mb-1 font-bold">
                  PRODUCT CAPABILITIES
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#F2E7D2] font-display">
                  Key Engineering & Audio Features.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {keyFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.num}
                      className="p-6 rounded-2xl bg-[#171713] border border-[#D99A35]/20 hover:border-[#D99A35]/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-mono text-[#D99A35] font-bold">
                            FEATURE {feat.num}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-[#D99A35]/15 flex items-center justify-center text-[#D99A35]">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <h4 className="text-base font-bold text-[#F2E7D2] font-display mb-2">
                          {feat.title}
                        </h4>

                        <p className="text-xs text-[#F2E7D2]/75 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION E — TECHNOLOGY STACK */}
            <div className="p-8 rounded-2xl bg-[#171713] border border-[#D99A35]/20">
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-widest text-[#D99A35] mb-1 font-bold">
                  IMPLEMENTATION ARCHITECTURE
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F2E7D2] font-display">
                  Verified Technology Stack.
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#10110F] border border-[#D99A35]/20 flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold text-[#D99A35] font-mono mb-1">
                      {tech.name}
                    </div>
                    <div className="text-[11px] text-[#F2E7D2]/70 leading-relaxed">
                      {tech.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION F — DESIGN & DEVELOPMENT CHALLENGE */}
            <div className="p-8 rounded-2xl bg-[#171713] border border-[#D99A35]/20 space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#D99A35] mb-1 font-bold">
                  ENGINEERING DIARY
                </div>
                <h3 className="text-2xl font-black text-[#F2E7D2] font-display">
                  More Than a Music Player: Design & Development Challenges.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#F2E7D2]/80 leading-relaxed">
                <div className="p-5 rounded-xl bg-[#10110F] border border-[#D99A35]/15 space-y-2">
                  <div className="text-xs font-bold text-[#D99A35] font-mono">
                    CHALLENGE 01 · UNINTERRUPTED AUDIO STREAMING
                  </div>
                  <p>
                    In typical web applications, switching between playlist routes unmounts the current view. Zindagi Ki Dhun uses a decoupled centralized audio engine running above the viewport layout so dynamic background transitions occur seamlessly without cutting off active tracks.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#10110F] border border-[#D99A35]/15 space-y-2">
                  <div className="text-xs font-bold text-[#D99A35] font-mono">
                    CHALLENGE 02 · REAL-TIME WAVEFORM SYNCHRONIZATION
                  </div>
                  <p>
                    Connecting the browser's Web Audio API to media elements requires careful lifecycle management across autoplay restrictions and user gestures. An AnalyserNode pipeline extracts real-time frequency data and renders animated equalizer bars that physically respond to the track's rhythm.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#10110F] border border-[#D99A35]/15 space-y-2">
                  <div className="text-xs font-bold text-[#D99A35] font-mono">
                    CHALLENGE 03 · AUTHENTIC CULTURAL ART DIRECTION
                  </div>
                  <p>
                    Avoiding generic Western music streaming tropes by developing a distinctive antique cream and saffron visual identity. Combining Devanagari typography with photography of highway trucks, dhabas, and city streets created an emotionally resonant experience for Indian listeners.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#10110F] border border-[#D99A35]/15 space-y-2">
                  <div className="text-xs font-bold text-[#D99A35] font-mono">
                    CHALLENGE 04 · PERSISTENT LOCAL STORAGE STATE
                  </div>
                  <p>
                    Enabled users to build their own custom playlists ("Apni Dhun Banao"), save favorites, and remember their playback volume and active track state across browser refreshes without requiring heavy external databases.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION G — FINAL CALL TO ACTION */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#211614] via-[#171713] to-[#1D1B16] border border-[#D99A35]/40 text-center flex flex-col items-center">
              <div className="text-sm font-mono text-[#D99A35] tracking-widest uppercase mb-3 font-bold">
                ZINDAGI KI DHUN · OFFICIAL RELEASE
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-[#F2E7D2] font-display mb-3 leading-snug">
                हर सफर की अपनी कहानी है।<br />
                <span className="text-[#D99A35]">हर कहानी की अपनी धुन।</span>
              </h3>
              <p className="text-sm sm:text-base text-[#F2E7D2]/80 max-w-xl mx-auto mb-8 font-normal">
                Experience everyday Indian life through music. Explore 11 curated soundscapes and create your own soundtrack.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D99A35] hover:bg-[#e6a945] text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl active:scale-95"
                >
                  <span>Explore Live Project</span>
                  <ExternalLink className="w-4 h-4 text-stone-950" />
                </a>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#10110F] hover:bg-[#1D1B16] border border-[#D99A35]/40 text-[#F2E7D2] font-mono text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Back to Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
