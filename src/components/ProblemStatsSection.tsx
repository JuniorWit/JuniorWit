import React from 'react';

export const ProblemStatsSection: React.FC = () => {
  return (
    <section id="problems" className="py-20 bg-slate-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2A44] tracking-tight">
            스타트업 초기 대표님의<br className="sm:hidden" /> <span className="text-[#B93B3B]">채용 문제</span>를 해결합니다.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Problem Card 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-72 text-center">
            <div className="my-auto">
              <span className="text-5xl sm:text-6xl font-black text-[#B93B3B] tracking-tight">45.9%</span>
              <p className="mt-4 font-bold text-[#1F2A44] leading-snug text-base sm:text-lg">
                중소기업이 매번 인력 채용에<br />어려움을 겪는다고 응답
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4 text-xs text-slate-400">
              잡코리아, 2023
            </div>
          </div>

          {/* Problem Card 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-72 text-center">
            <div className="my-auto">
              <span className="text-5xl sm:text-6xl font-black text-[#B93B3B] tracking-tight">38.0%</span>
              <p className="mt-4 font-bold text-[#1F2A44] leading-snug text-base sm:text-lg">
                벤처·스타트업 퇴직자가 꼽은<br />애로사항 1위, <span className="text-[#B93B3B]">"과도한 업무 범위"</span>
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4 text-xs text-slate-400">
              이데일리 × 리멤버앤컴퍼니, 400명 대상
            </div>
          </div>

          {/* Problem Card 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-72 text-center">
            <div className="my-auto">
              <span className="text-5xl sm:text-6xl font-black text-[#B93B3B] tracking-tight">45.7%</span>
              <p className="mt-4 font-bold text-[#1F2A44] leading-snug text-base sm:text-lg">
                중소기업 조기퇴직자가 밝힌 이유,<br /><span className="text-[#B93B3B]">"생각했던 업무와 달라서"</span>
              </p>
            </div>
            <div className="border-t border-gray-100 pt-4 text-xs text-slate-400">
              잡코리아 (경기도일자리재단 인용)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

