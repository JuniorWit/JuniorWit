import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { downloadBrochurePDF } from '../utils/downloadPdf';

interface NavbarProps {
  onDownloadBrochure?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownloadBrochure }) => {
  const [downloading, setDownloading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadBrochurePDF();
      if (onDownloadBrochure) onDownloadBrochure();
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a id="brand-logo-link" href="#" className="flex items-center gap-2 group">
          <div className="flex items-center gap-1">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-sans">
              JuniorW<span className="text-[#B93B3B]">it</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B93B3B] mb-2.5 sm:mb-3 ml-0.5 group-hover:scale-125 transition-transform" />
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide bg-rose-50 text-[#B93B3B] border border-rose-200 select-none">
            BETA
          </span>
        </a>

        {/* Direct Brochure Download Action - Hidden on mobile, visible on sm+ */}
        <button
          type="button"
          id="nav-brochure-download-btn"
          onClick={handleClick}
          disabled={downloading}
          className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B93B3B] hover:bg-[#9c2d2d] active:scale-[0.98] text-white text-sm font-medium transition-all shadow-sm cursor-pointer disabled:opacity-75"
        >
          {downloading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>다운로드 중...</span>
            </>
          ) : (
            <>
              <span>서비스 소개서 다운로드</span>
              <Download className="w-4 h-4 stroke-[2.2]" />
            </>
          )}
        </button>
      </div>
    </header>
  );
};
