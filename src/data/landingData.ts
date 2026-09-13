import { ChecklistTask, StatItem, ComparisonRow, BenefitCard, FaqItem, VideoPreset } from '../types';

export const CHECKLIST_TASKS: ChecklistTask[] = [
  {
    id: 'tax_invoice',
    name: '세금계산서 발행 요청, 대금 청구, 미수금 확인',
    hours: 6,
    defaultChecked: true,
    category: 'finance',
  },
  {
    id: 'contracts_admin',
    name: '계약서·공문 등 행정 문서 관리',
    hours: 5,
    defaultChecked: true,
    category: 'admin',
  },
  {
    id: 'customer_requests',
    name: '고객 요청사항 정리 및 담당자 전달',
    hours: 7,
    defaultChecked: true,
    category: 'support',
  },
  {
    id: 'proposals_quotes',
    name: '영업자료 제안서·견적서·계약서 작성·관리',
    hours: 7,
    defaultChecked: true,
    category: 'sales',
  },
  {
    id: 'client_leads_mgmt',
    name: '잠재·기존 고객 정보 관리, 영업활동 현황 정리',
    hours: 6,
    defaultChecked: false,
    category: 'sales',
  },
  {
    id: 'inquiries_scheduling',
    name: '고객 문의 접수, 상담 일정 조율, 영업 담당자 지원',
    hours: 8,
    defaultChecked: false,
    category: 'support',
  },
  {
    id: 'demo_exhibition',
    name: '고객 제품 데모·전시회 준비 및 운영 지원',
    hours: 5,
    defaultChecked: false,
    category: 'sales',
  },
  {
    id: 'general_admin',
    name: '기타 영업활동·회사 운영에 필요한 제반 행정 지원',
    hours: 4,
    defaultChecked: false,
    category: 'admin',
  },
];

export const STAT_ITEMS: StatItem[] = [
  {
    percentage: '45.9%',
    title: '중소기업이 매번 인력 채용에 어려움을 겪는다고 응답',
    source: '잡 코리아, 2023',
  },
  {
    percentage: '38.0%',
    title: '벤처·스타트업 퇴직자가 꼽은 애로사항 1위,',
    subtitle: '"과도한 업무 범위"',
    source: '이데일리 × 리멤버앤컴퍼니, 400명 대상',
  },
  {
    percentage: '45.7%',
    title: '중소기업 조기퇴직자가 밝힌 이유,',
    subtitle: '"생각했던 업무와 달라서"',
    source: '잡코리아 (경기도 일자리재단 인용)',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    category: '맡기는 것',
    fullTime: '사람(고정비 발생)',
    agency: '프로젝트 결과물',
    seniorAdvisory: '판단과 방향 조언',
    juniorWit: '매달 반복되는 실행 업무',
  },
  {
    category: 'R&R 및 업무성격',
    fullTime: 'R&R 모호, 잡무 과중',
    agency: '계약서 과업에만 한정',
    seniorAdvisory: '자문, 조언에 한정',
    juniorWit: '명확한 R&R, 월별 유연한 조정',
  },
  {
    category: '시작까지 소요',
    fullTime: '2~3개월(채용 프로세스)',
    agency: '견적 계약 협의 필요',
    seniorAdvisory: '일정 조율 필요',
    juniorWit: '즉시 투입 가능',
  },
  {
    category: '계약 및 유연성',
    fullTime: '사실상 중단 불가',
    agency: '프로젝트 종료 후 해지',
    seniorAdvisory: '계약 기간 구속',
    juniorWit: '월 단위 자유로운 조정/해지',
  },
];

export const BENEFIT_CARDS: BenefitCard[] = [
  {
    iconName: 'clock',
    title: '필요한 시간만큼 구독',
    description: '월 10시간부터 40시간 이상까지 비즈니스 상황에 맞춰 필요한 단위로 선택합니다.',
  },
  {
    iconName: 'pause',
    title: '업무 일시 중단 가능',
    description: '성수기와 비수기 업무량 변동에 따라 언제든 일시 정지하거나 이월할 수 있습니다.',
  },
  {
    iconName: 'check',
    title: '자유로운 구독 해지',
    description: '위약금이나 복잡한 승인 절차 없이 다음 달 결제 전 클릭 한 번으로 해지 가능합니다.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '은행 계좌·인증서를 통째로 맡겨야 하나요?',
    answer:
      '절대 그렇지 않습니다. 금융 및 민감 보안 정보는 권한 분리 원칙에 따라 철저히 보호됩니다. 세금계산서 발행이나 대금 청구 기안 등 필수 업무만 승인 프로세스를 거치며, 실제 이체나 최종 결제 권한은 오직 대표님과 지정된 회사 내부 승인자에게만 유지됩니다.',
  },
  {
    id: 'faq-2',
    question: '3개월 무료체험, 정말 아무 조건이 없나요?',
    answer:
      '네, 조건 없는 순수 무료체험 혜택을 제공합니다. 가입 후 초기 3개월 동안 백오피스 기본 업무 실행 및 전담팀 배정을 무료로 경험해보실 수 있으며, 체험 기간 중 언제든지 비용 부담 없이 자유롭게 서비스를 종료하거나 정규 구독 플랜으로 전환할 수 있습니다.',
  },
  {
    id: 'faq-3',
    question: '업무 범위를 넘어서는 요청이 생기면 어떻게 되나요?',
    answer:
      '사전에 합의된 표준 백오피스 R&R 범위를 초과하거나 전문적인 법률 자문, 외부 세무 조정 등의 고난도 업무가 필요한 경우, 담당 매니저가 업무 분석 후 추가 시간 승인 또는 신뢰할 수 있는 전문 파트너사 연계를 선제적으로 안내해 드립니다.',
  },
  {
    id: 'faq-4',
    question: '해지는 어떻게 하나요?',
    answer:
      '약정이나 위약금, 유선 상담 유도 없이 주니어윗 대시보드 내 [구독 관리] 페이지에서 클릭 한 번으로 즉시 다음 달 자동 결제를 해지하실 수 있습니다. 남은 잔여 시간은 해당 월 말일까지 정상적으로 사용하실 수 있습니다.',
  },
  {
    id: 'faq-5',
    question: '담당자가 바뀌거나 부재중일 때는요?',
    answer:
      '주니어윗은 개인 1인에게 의존하는 방식이 아닌 클라우드 기반 전담팀 체계로 운영됩니다. 모든 업무 프로토콜과 인수인계 매뉴얼이 실시간으로 동기화되어 담당자 연차, 휴가, 교체 상황에서도 100% 공백 없는 연속성을 보장합니다.',
  },
];

export const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'workspace_team',
    label: '스타트업 오피스 전담팀',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', // or web video
    poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'business_desk',
    label: '스마트 업무 데스크',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-42807-large.mp4',
    poster: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'focused_execution',
    label: '집중 행정 실행',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-laptop-in-an-office-42805-large.mp4',
    poster: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  },
];
