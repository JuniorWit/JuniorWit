import React from 'react';

export const BenefitsSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A44] tracking-tight">
            시간제로 유연하게 구독하고, 해지하세요
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#B93B3B] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1F2A44] mb-2">필요한 시간만큼 구독</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              월 10시간부터 40시간 이상까지 비즈니스 상황에 맞춰 필요한 단위로 선택합니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#B93B3B] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1F2A44] mb-2">업무 일시 중단 가능</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              성수기와 비수기 업무량 변동에 따라 언제든 일시 정지하거나 이월할 수 있습니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#B93B3B] flex items-center justify-center mb-5">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1F2A44] mb-2">자유로운 구독 해지</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              위약금이나 복잡한 승인 절차 없이 다음 달 결제 전 클릭 한 번으로 해지 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

