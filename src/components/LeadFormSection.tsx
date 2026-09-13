import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChecklistTask } from '../types';
import { sendQuoteInquiry } from '../services/leadService';

interface LeadFormSectionProps {
  selectedTasks: ChecklistTask[];
  selectedCount: number;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  selectedTasks,
  selectedCount,
}) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    await sendQuoteInquiry({
      email,
      companyName,
      contactName,
      selectedTasks,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#B93B3B', '#1F2A44', '#fda4af', '#cbd5e1'],
      });
    } catch {
      // silent
    }
  };

  return (
    <section id="subscription-section" className="py-20 bg-slate-50 border-b border-gray-100 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
          {/* Graphic/Image Area (Left side) */}
          <div className="md:col-span-6 bg-slate-50/50 border-b md:border-b-0 md:border-r border-gray-200 min-h-[320px] flex flex-col items-center justify-center relative p-8 text-center">
            <div className="max-w-[320px] flex flex-col items-center">
              {/* Beta Badge above Head Copy */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B93B3B]/10 border border-[#B93B3B]/20 text-[#B93B3B] text-[11px] font-bold tracking-wider mb-3.5 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B93B3B] animate-pulse" />
                <span>BETA SERVICE</span>
              </div>

              <p className="text-lg sm:text-xl font-bold text-[#1F2A44] leading-snug">
                우리 기업 전용 맞춤 플랜,<br />1:1 무료 컨설팅 신청하기
              </p>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2.5 leading-relaxed">
                현재 베타 운영 중으로, 신청 순서에 따라 순차적으로 밀착 상담을 도와드리고 있습니다.
              </p>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-[#B93B3B] flex items-center justify-center mx-auto mb-4 border border-rose-100">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h4 className="text-xl font-bold text-[#1F2A44] mb-2">
                  견적 상담 요청이 접수되었습니다!
                </h4>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {selectedCount > 0 ? (
                    <>
                      선택하신 <span className="font-bold text-[#B93B3B]">{selectedCount}가지 업무</span> 내역과 함께{' '}
                    </>
                  ) : (
                    '백오피스 맞춤 '
                  )}
                  운영팀으로 안전하게 전달되었습니다. 남겨주신 <strong>{email}</strong> 주소로 신속하게 안내해 드리겠습니다.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                    setCompanyName('');
                    setContactName('');
                    setShowDetails(false);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  다른 이메일로 다시 접수하기
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#1F2A44] mb-2">
                  백오피스 전담팀 시간제 구독하기
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  {selectedCount > 0
                    ? `선택하신 ${selectedCount}가지 업무 맞춤 견적 상담받기`
                    : '전담팀 시간제 맞춤 견적 상담받기'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="sr-only" htmlFor="lead-email-input">
                      Your email address
                    </label>
                    <input
                      id="lead-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-sm text-slate-800 transition-colors"
                    />
                  </div>

                  {/* Toggle button for company and name */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowDetails(!showDetails)}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer py-1 select-none"
                    >
                      {showDetails ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          <span>회사명·담당자명 입력 접기</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          <span>회사명·담당자명 추가 입력 (선택)</span>
                        </>
                      )}
                    </button>

                    {showDetails && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2 pt-0.5">
                        <div>
                          <label className="sr-only" htmlFor="lead-company-input">
                            회사명
                          </label>
                          <input
                            id="lead-company-input"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="회사명 (선택)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-xs sm:text-sm text-slate-800 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="lead-name-input">
                            담당자 이름
                          </label>
                          <input
                            id="lead-name-input"
                            type="text"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="담당자 이름 (선택)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-xs sm:text-sm text-slate-800 transition-colors"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    id="lead-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#B93B3B] hover:bg-[#9F2E2E] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>견적 상담받기</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

