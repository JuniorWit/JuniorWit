import React, { useEffect, useRef } from 'react';
import { COMPARISON_ROWS } from '../data/landingData';

export const ComparisonTableSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollToJuniorWit = () => {
      // On mobile (narrow screen with scrollable content), scroll so '실행력 좋은 주니어' is visible by default
      if (window.innerWidth < 768 && container.scrollWidth > container.clientWidth) {
        container.scrollLeft = container.scrollWidth - container.clientWidth;
      }
    };

    scrollToJuniorWit();
    const rafId = requestAnimationFrame(scrollToJuniorWit);
    const timeoutId = setTimeout(scrollToJuniorWit, 120);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section id="tier-comparison" className="w-full py-16 md:py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            기존 선택지와의 차이
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            대표님이 돌려받는 것은 사람이 아니라,<br />
            처리된 업무와 그 시간입니다.
          </p>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <div ref={scrollContainerRef} className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              {/* Header Row: Dark Navy Background */}
              <thead>
                <tr className="bg-[#0D1527] text-white text-xs sm:text-sm font-semibold tracking-wide">
                  <th className="py-4 px-4 sm:px-6 w-[20%] sm:w-[16%] sticky left-0 z-20 bg-[#0D1527] shadow-[2px_0_6px_rgba(0,0,0,0.18)]">
                    구분
                  </th>
                  <th className="py-4 px-4 sm:px-5 w-[20%] sm:w-[21%]">정규직 채용</th>
                  <th className="py-4 px-4 sm:px-5 w-[20%] sm:w-[21%]">외주 대행사</th>
                  <th className="py-4 px-4 sm:px-5 w-[20%] sm:w-[21%]">시니어 자문 구독</th>
                  <th className="py-4 px-5 sm:px-6 w-[20%] sm:w-[21%] text-white font-bold bg-[#14203B]">
                    실행력 좋은 주니어
                  </th>
                </tr>
              </thead>

              {/* Body Rows */}
              <tbody className="divide-y divide-slate-100 text-xs sm:text-[13.5px]">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr
                    key={index}
                    className={`transition-colors hover:bg-slate-50/70 ${
                      index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    {/* Category (Sticky on Mobile) */}
                    <td
                      className={`py-4 px-4 sm:px-6 font-bold text-slate-900 sticky left-0 z-10 shadow-[2px_0_6px_rgba(0,0,0,0.04)] ${
                        index % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'
                      }`}
                    >
                      {row.category}
                    </td>

                    {/* Full Time */}
                    <td className="py-4 px-4 sm:px-5 text-slate-600">
                      {row.fullTime}
                    </td>

                    {/* Agency */}
                    <td className="py-4 px-4 sm:px-5 text-slate-600">
                      {row.agency}
                    </td>

                    {/* Senior Advisory */}
                    <td className="py-4 px-4 sm:px-5 text-slate-600">
                      {row.seniorAdvisory}
                    </td>

                    {/* JuniorWit (Highlighted in Red) */}
                    <td className="py-4 px-5 sm:px-6 font-bold text-[#B53737] bg-rose-50/40">
                      {row.juniorWit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
