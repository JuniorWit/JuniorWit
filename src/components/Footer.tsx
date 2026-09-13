import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { downloadBrochurePDF } from '../utils/downloadPdf';

interface FooterProps {
  onDownloadBrochure?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDownloadBrochure, onOpenPrivacyPolicy }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
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
    <footer className="w-full bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Row: Brand & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  JuniorW<span className="text-[#B93B3B]">it</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B93B3B] mb-3 ml-0.5" />
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-rose-50 text-[#B93B3B] border border-rose-200 select-none">
                BETA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              대표님의 실행 시간을 찾아드리는 백오피스 구독 서비스
            </p>
          </div>

          <button
            type="button"
            id="footer-brochure-download-btn"
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#B93B3B] hover:bg-[#9c2d2d] active:scale-[0.98] text-white text-sm font-medium transition-all shadow-sm cursor-pointer disabled:opacity-75"
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

        {/* Bottom Row: Copyright & Policy Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 JuniorWit All rights reserved.</p>

          <div>
            <button
              id="footer-privacy-policy-btn"
              onClick={onOpenPrivacyPolicy}
              className="text-slate-500 hover:text-slate-800 transition-colors font-medium underline underline-offset-4 cursor-pointer"
            >
              개인정보처리방침
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
