import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Video } from 'lucide-react';
import { VIDEO_PRESETS } from '../data/landingData';

interface HeroVideoBannerProps {
  onScrollToSubscription: () => void;
  onScrollToCalculator: () => void;
}

export const HeroVideoBanner: React.FC<HeroVideoBannerProps> = ({
  onScrollToSubscription,
  onScrollToCalculator,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [showConfig, setShowConfig] = useState(false);

  const activeVideoUrl = customVideoUrl.trim() || VIDEO_PRESETS[selectedVideoIndex].url;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeVideoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Catchphrase */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1F2A44] leading-[1.35] tracking-tight mb-6">
              <span className="text-[#B93B3B]">채용 실패</span>없이<br />
              필요한 시간만큼 유연하게<br />
              백오피스 구독 서비스
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-lg">
              월 29시간, 대표님의 시간을 되찾아 드립니다
            </p>
            <div className="flex flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                id="hero-free-trial-btn"
                onClick={onScrollToSubscription}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#B93B3B] hover:bg-[#9F2E2E] active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
              >
                3개월 무료체험
              </button>
              <button
                id="hero-scroll-btn"
                onClick={onScrollToCalculator}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-3.5 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                비용 계산기 바로가기 ↓
              </button>
            </div>
          </div>

          {/* Right: Interactive Graphic Loop Area (Visible on desktop PC only, hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center min-h-[400px] sm:min-h-[460px]">
            {/* Visual Workspace Stage */}
            <div className="relative w-full max-w-[480px] h-[380px] sm:h-[420px] rounded-3xl bg-white border border-gray-200 p-6 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Background ambient loop video */}
              <video
                ref={videoRef}
                src={activeVideoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
              />

              {/* Decorative background geometry */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-[10px] border-rose-50 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 w-36 h-36 rounded-full bg-rose-50/40 blur-md pointer-events-none"></div>
              
              {/* Floating Task Tag 1 (Top Left) */}
              <div className="absolute top-10 left-6 z-10 bg-white border border-gray-200 px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-3 animate-float-slow select-none">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#B93B3B] flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#B93B3B] uppercase tracking-wide">세일즈 서포트</p>
                  <p className="text-xs font-bold text-slate-800">전시회·박람회 현장 운영 지원 완료</p>
                </div>
              </div>

              {/* Floating Center Card: Dynamic Work Engine */}
              <div className="relative z-10 w-64 bg-white rounded-2xl p-5 shadow-xl border border-gray-200 text-center select-none">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 text-[#B93B3B] border border-gray-100 flex items-center justify-center mb-3.5 shadow-sm">
                  <svg className="w-6 h-6 text-[#B93B3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-[#1F2A44]">주니어윗 전담팀 가동</h4>
                <p className="text-[11px] text-slate-500 mt-1">월 평균 대표님 29시간 확보</p>
                <div className="mt-3.5 flex items-center justify-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#B93B3B] animate-ping"></span>
                  <span className="text-[11px] font-semibold text-[#B93B3B]">업무 실시간 수행 중</span>
                </div>
              </div>

              {/* Floating Task Tag 2 (Bottom Right) */}
              <div className="absolute bottom-10 right-6 z-10 bg-white border border-gray-200 px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-3 animate-float-reverse select-none">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#B93B3B] flex items-center justify-center text-sm font-bold shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5L19 7.5V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">행정 계약 관리</p>
                  <p className="text-xs font-bold text-slate-800">계약서·공문 리포트 완료</p>
                </div>
              </div>

              {/* Discreet video loop controls in the corner */}
              <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                <button
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause loop' : 'Play loop'}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  onClick={toggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  title="Video Source Setting"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Video className="w-3 h-3" />
                </button>
              </div>

              {/* Video source configuration modal */}
              {showConfig && (
                <div className="absolute top-10 right-3 z-30 w-64 bg-white rounded-xl p-3 shadow-xl border border-slate-200 text-xs text-slate-800 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-[11px]">루프 영상 설정</span>
                    <button
                      onClick={() => setShowConfig(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-1 mb-2">
                    {VIDEO_PRESETS.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setCustomVideoUrl('');
                          setSelectedVideoIndex(idx);
                        }}
                        className={`w-full text-left px-2 py-1 rounded text-[11px] transition-colors ${
                          selectedVideoIndex === idx && !customVideoUrl
                            ? 'bg-rose-50 text-[#B93B3B] font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    placeholder="영상 URL 직접 핫링크 (MP4)"
                    value={customVideoUrl}
                    onChange={(e) => setCustomVideoUrl(e.target.value)}
                    className="w-full px-2 py-1 border border-slate-200 rounded text-[11px] bg-slate-50 focus:bg-white focus:outline-none focus:border-[#B93B3B]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
