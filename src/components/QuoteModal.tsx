import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Check, Send, Building2, User, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChecklistTask } from '../types';
import { sendQuoteInquiry } from '../services/leadService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTasks: ChecklistTask[];
  totalSavedHours: number;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  selectedTasks,
  totalSavedHours,
}) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    await sendQuoteInquiry({
      email,
      companyName,
      contactName,
      selectedTasks,
      totalHours: totalSavedHours,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#B93B3B', '#1F2A44', '#fda4af', '#cbd5e1'],
      });
    } catch {
      // silent
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setCompanyName('');
    setContactName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[11px] font-bold text-[#B93B3B] uppercase tracking-wider">
              Custom Backoffice Plan
            </span>
            <h3 className="text-xl font-bold text-[#1F2A44] mt-0.5">
              이 조합으로 정확한 견적받기
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#B93B3B] flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h4 className="text-2xl font-bold text-[#1F2A44] mb-2">
                견적 상담 접수가 완료되었습니다!
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4 max-w-sm mx-auto">
                선택하신 <span className="font-bold text-[#B93B3B]">{selectedTasks.length}가지 업무 (월 {totalSavedHours}시간)</span> 내역과 
                담당자 정보가 운영팀으로 안전하게 전달되었습니다.
              </p>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-500 mb-6 text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">신청 이메일:</span>
                  <span className="font-semibold text-slate-800">{email}</span>
                </div>
                {companyName && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">회사명:</span>
                    <span className="font-semibold text-slate-800">{companyName}</span>
                  </div>
                )}
                {contactName && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">담당자 이름:</span>
                    <span className="font-semibold text-slate-800">{contactName}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-400">전담팀 회신:</span>
                  <span className="text-[#B93B3B] font-semibold">순차적으로 맞춤 견적서 회신 예정</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3.5 px-6 rounded-xl bg-[#1F2A44] hover:bg-[#15203b] text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Tasks Overview Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-700">
                    선택한 업무 조합 ({selectedTasks.length}개)
                  </span>
                  <span className="text-xs font-semibold text-[#B93B3B] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    월 {totalSavedHours}시간 절감 추정
                  </span>
                </div>

                {selectedTasks.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                    {selectedTasks.map((t) => (
                      <span
                        key={t.id}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-[#B93B3B] stroke-[3]" />
                        <span>{t.name}</span>
                        <span className="text-slate-400 text-[10px]">+{t.hours}h</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    선택된 업무가 없습니다. 전체 백오피스 업무 상담으로 진행됩니다.
                  </p>
                )}
              </div>

              {/* Input Fields */}
              <div className="space-y-3.5">
                <div>
                  <label
                    htmlFor="modal-lead-email"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    이메일 주소 <span className="text-[#B93B3B]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="modal-lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="견적서를 수신할 이메일 주소 (예: ceo@company.com)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-sm text-slate-800 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="modal-lead-company"
                      className="block text-xs font-medium text-slate-600 mb-1.5"
                    >
                      회사명 <span className="text-slate-400 font-normal">(선택)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="modal-lead-company"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="예: 주니어윗"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-xs sm:text-sm text-slate-800 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-lead-name"
                      className="block text-xs font-medium text-slate-600 mb-1.5"
                    >
                      담당자 이름 <span className="text-slate-400 font-normal">(선택)</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="modal-lead-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="예: 홍길동 대표"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#B93B3B] text-xs sm:text-sm text-slate-800 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#B93B3B] hover:bg-[#9F2E2E] active:scale-[0.98] text-white font-semibold text-base transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>이 조합으로 정확한 견적받기</span>
                  </>
                )}
              </button>

              <p className="text-[11.5px] text-slate-400 text-center leading-relaxed">
                신청 즉시 전담 운영팀으로 전달되며, 기재해주신 이메일로 1영업일 이내 맞춤 견적을 보내드립니다.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
