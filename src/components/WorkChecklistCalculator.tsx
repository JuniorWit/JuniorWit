import React from 'react';
import { Check } from 'lucide-react';
import { ChecklistTask } from '../types';

interface WorkChecklistCalculatorProps {
  tasks: ChecklistTask[];
  selectedTaskIds: string[];
  onToggleTask: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onProceedToQuote: () => void;
}

export const WorkChecklistCalculator: React.FC<WorkChecklistCalculatorProps> = ({
  tasks,
  selectedTaskIds,
  onToggleTask,
  onSelectAll,
  onClearAll,
  onProceedToQuote,
}) => {
  const selectedTasks = tasks.filter((t) => selectedTaskIds.includes(t.id));
  const selectedCount = selectedTasks.length;
  const totalSavedHours = selectedTasks.reduce((acc, t) => acc + t.hours, 0);

  return (
    <section id="work-calculator" className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            대표님 캘린더에서 지워질 목록
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            필요한 업무만 체크하면 예상 절감 시간을<br className="sm:hidden" /> 바로 계산합니다. 범위는 선택한 목록까지<br />
            — 억지로 묶지 않습니다.
          </p>
        </div>

        {/* 2-Column Card Container */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Checklist of tasks */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-slate-400 tracking-wider">
                  백오피스 실행 업무 선택
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={onSelectAll}
                    className="text-slate-500 hover:text-slate-900 font-medium transition-colors"
                  >
                    전체선택
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={onClearAll}
                    className="text-slate-500 hover:text-slate-900 font-medium transition-colors"
                  >
                    초기화
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => {
                  const isChecked = selectedTaskIds.includes(task.id);
                  return (
                    <label
                      key={task.id}
                      onClick={() => onToggleTask(task.id)}
                      className={`flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer select-none transition-all ${
                        isChecked ? 'bg-rose-50/40 text-slate-900' : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {/* Checkbox Box with Brick Red accent */}
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-[#B53737] text-white shadow-xs'
                            : 'border border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Task Name */}
                      <span className={`text-sm sm:text-[14.5px] leading-snug flex-1 ${isChecked ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                        {task.name}
                      </span>

                      {/* Estimated task hours tag */}
                      <span className="text-[11px] text-slate-400 font-mono">
                        +{task.hours}h
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Calculated Hours & CTA Button */}
            <div className="lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-10 flex flex-col justify-center h-full">
              <div className="grid grid-cols-2 gap-6 text-center mb-8">
                {/* Metric 1: Selected Count */}
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-1">
                    {selectedCount}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    선택한 업무
                  </div>
                </div>

                {/* Metric 2: Estimated Saved Hours */}
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-1">
                    {totalSavedHours}<span className="text-2xl sm:text-3xl font-bold ml-0.5">h</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    월 절감 시간(추정)
                  </div>
                </div>
              </div>

              {/* Subtext info */}
              <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
                정확한 금액은 상담을 통해 견적으로 안내 드립니다.
              </p>

              {/* Action Button */}
              <button
                id="calc-quote-btn"
                onClick={onProceedToQuote}
                className="w-full py-4 px-6 rounded-xl bg-[#B53737] hover:bg-[#9c2d2d] active:scale-[0.98] text-white text-base font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
              >
                이 조합으로 정확한 견적받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
