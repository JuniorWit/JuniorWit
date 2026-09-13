import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="privacy-policy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="privacy-policy-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 flex-shrink-0">
          <h3 className="text-xl font-bold text-slate-900">개인정보처리방침</h3>
          <button
            id="close-privacy-policy-modal-btn"
            onClick={onClose}
            aria-label="닫기"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 my-5 space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed scrollbar-thin">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-medium leading-relaxed">
            주니어윗(이하 &apos;운영자&apos;)은 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </div>

          {/* 제1조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제1조 (수집하는 개인정보 항목 및 수집 방법)
            </h4>
            <p className="text-slate-600">운영자는 서비스 상담 및 안내를 위해 아래와 같은 개인정보를 수집합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
              <li><strong>수집 항목:</strong> 이름, 이메일 주소, 회사명(소속)</li>
              <li><strong>수집 방법:</strong> 홈페이지 내 상담·문의 신청 폼을 통한 자발적 입력</li>
            </ul>
          </div>

          {/* 제2조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제2조 (개인정보의 수집 및 이용 목적)
            </h4>
            <p className="text-slate-600">수집한 개인정보는 다음의 목적을 위해 활용됩니다. 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
              <li>서비스 상담 신청에 대한 확인 및 답변, 안내</li>
              <li>신규 서비스·이벤트 정보 등의 안내(마케팅 활용에 별도 동의한 경우에 한함)</li>
              <li>서비스 개선을 위한 통계 분석</li>
            </ul>
          </div>

          {/* 제3조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제3조 (개인정보의 보유 및 이용 기간)
            </h4>
            <p className="text-slate-600">운영자는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 아래의 경우에는 명시한 기간 동안 보존합니다.</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li><strong>상담 문의 기록:</strong> 상담 완료일로부터 1년 보관 후 파기</li>
              <li><strong>마케팅 수신 동의 정보:</strong> 이용자가 동의를 철회하거나 수신거부를 요청하는 즉시 파기</li>
              <li>
                <strong>관계 법령에 따라 보존이 필요한 경우:</strong> 해당 법령에서 정한 기간 동안 보관
                <span className="block text-slate-500 text-xs mt-0.5">
                  (예: 전자상거래 등에서의 소비자보호에 관한 법률에 따른 계약 또는 청약철회 등에 관한 기록 5년, 소비자의 불만 또는 분쟁처리에 관한 기록 3년 등 — 실제 해당 사항이 있을 경우에만 명시)
                </span>
              </li>
            </ul>
          </div>

          {/* 제4조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제4조 (개인정보의 제3자 제공)
            </h4>
            <p className="text-slate-600">
              운영자는 이용자의 개인정보를 제2조에서 명시한 목적 범위 내에서만 처리하며, 이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.
            </p>
          </div>

          {/* 제5조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제5조 (개인정보처리의 위탁)
            </h4>
            <p className="text-slate-600">
              운영자는 개인정보 처리업무를 외부 업체에 위탁하지 않으며, 수집한 개인정보는 운영자가 직접 처리합니다. 향후 위탁이 발생하는 경우 위탁받는 자와 위탁업무 내용을 본 방침에 명시하고 이용자에게 고지하겠습니다.
            </p>
          </div>

          {/* 제6조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제6조 (개인정보의 파기 절차 및 방법)
            </h4>
            <ul className="space-y-1.5 pl-2 text-slate-700">
              <li>
                <strong>• 파기절차:</strong> 이용자가 입력한 정보는 상담 이메일(영업팀 메일함)로 접수되며, 별도의 데이터베이스(DB)로 옮겨 저장하지 않습니다. 제3조에서 정한 보유기간이 경과하거나 이용자가 파기를 요청하는 경우, 해당 이메일 및 첨부된 개인정보를 지체 없이 삭제합니다.
              </li>
              <li>
                <strong>• 파기방법:</strong> 전자적 파일(이메일) 형태로 보관된 개인정보는 복구 및 재생이 불가능한 방법으로 영구 삭제합니다.
              </li>
            </ul>
          </div>

          {/* 제7조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제7조 (정보주체의 권리·의무 및 행사방법)
            </h4>
            <p className="text-slate-600">이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="text-slate-600 mt-1">권리 행사는 운영자에게 서면, 이메일 등을 통하여 하실 수 있으며, 운영자는 이에 대해 지체 없이 조치하겠습니다.</p>
          </div>

          {/* 제8조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제8조 (개인정보의 안전성 확보조치)
            </h4>
            <p className="text-slate-600">운영자는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
              <li>개인정보 취급 담당자의 최소화 및 교육</li>
              <li>개인정보에 대한 접근 제한(접근 권한의 부여, 변경, 말소 등)</li>
              <li>개인정보를 저장하는 데이터베이스 시스템에 대한 접근권한 관리</li>
            </ul>
          </div>

          {/* 제9조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제9조 (개인정보 보호책임자)
            </h4>
            <p className="text-slate-600">운영자는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-slate-800 font-medium">
              <p>• 성명: 안소용</p>
              <p>• 연락처(이메일): juniorwitus@outlook.com</p>
              <p>• 연락처(전화): 01096061039</p>
            </div>
          </div>

          {/* 제10조 */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-1.5 h-4 bg-[#B93B3B] rounded-full inline-block" />
              제10조 (개인정보처리방침의 변경)
            </h4>
            <p className="text-slate-600">
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
            <div className="pt-2 text-slate-500 font-medium">
              공고일자: 2026-09-03 &nbsp;|&nbsp; 시행일자: 2026-09-03
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex-shrink-0">
          <button
            id="close-privacy-policy-confirm-btn"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-sm font-semibold transition-all cursor-pointer shadow-sm"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
