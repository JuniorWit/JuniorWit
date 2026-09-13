import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B53737', '#e11d48', '#fb7185', '#38bdf8'],
        });
      } catch {
        // silent
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#B53737] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>위약금 제로 · 3개월 전담팀 지원</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          3개월 무료체험 신청하기
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          초기 스타트업 대표님의 행정·운영 스트레스를 덜어드립니다. 전담 매니저가 1:1로 온보딩을 도와드립니다.
        </p>

        {submitted ? (
          <div className="text-center py-6 bg-rose-50/50 rounded-2xl border border-rose-100 p-6">
            <CheckCircle2 className="w-10 h-10 text-[#B53737] mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-900 mb-1">
              신청이 성공적으로 접수되었습니다!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              <strong>{name || '대표'}</strong> 님의 이메일({email})로 온보딩 안내 및 슬랙 채널 초대 링크를 보내드리겠습니다.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#B53737] text-white text-xs font-semibold shadow-sm"
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                대표님 성함
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B53737]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                회사명
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="(주)스타트업"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B53737]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                업무용 이메일
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ceo@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#B53737]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#B53737] hover:bg-[#9c2d2d] active:scale-[0.98] text-white text-sm font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>3개월 무료체험 시작하기</span>
              )}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>신용카드 등록 없이 체험이 시작되며, 언제든 해지 가능합니다.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
