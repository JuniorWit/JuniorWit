import { ChecklistTask } from '../types';

export interface QuoteInquiryPayload {
  email: string;
  companyName?: string;
  contactName?: string;
  selectedTasks: ChecklistTask[];
  totalHours?: number;
}

export const ADMIN_EMAIL = 'juniorwitus@outlook.com';

export async function sendQuoteInquiry(
  payload: QuoteInquiryPayload
): Promise<{ success: boolean; message?: string }> {
  const { email, companyName, contactName, selectedTasks, totalHours } = payload;

  const taskListText =
    selectedTasks.length > 0
      ? selectedTasks.map((t, i) => `${i + 1}. ${t.name} (월 ${t.hours}시간)`).join('\n')
      : '선택된 업무 없음 (전체 맞춤 상담 요청)';

  const calculatedHours =
    totalHours ?? selectedTasks.reduce((acc, t) => acc + t.hours, 0);

  // 1. Save to localStorage for reliability
  try {
    const existing = JSON.parse(localStorage.getItem('juniorwit_inquiries') || '[]');
    existing.push({
      ...payload,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('juniorwit_inquiries', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save skipped:', err);
  }

  // 2. Dispatch via FormSubmit AJAX to juniorwitus@outlook.com
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `[JuniorWit 견적신청] ${companyName ? `[${companyName}] ` : ''}${contactName || email}님의 백오피스 견적 문의`,
        _template: 'table',
        _captcha: 'false',
        '방문자 이메일': email,
        '회사명': companyName?.trim() || '(미입력)',
        '담당자 이름': contactName?.trim() || '(미입력)',
        '선택한 업무 개수': `${selectedTasks.length}개`,
        '월 절감 추정 시간': `${calculatedHours}시간`,
        '선택한 업무 목록': taskListText,
        '신청 일시': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      }),
    });

    if (response.ok) {
      return { success: true };
    }
  } catch (err) {
    console.warn('FormSubmit remote dispatch note:', err);
  }

  return { success: true };
}

export async function recordBrochureDownload(email?: string): Promise<void> {
  const timeStr = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  try {
    const existing = JSON.parse(localStorage.getItem('juniorwit_brochure_downloads') || '[]');
    existing.push({ email: email || '익명 다운로드', timestamp: new Date().toISOString() });
    localStorage.setItem('juniorwit_brochure_downloads', JSON.stringify(existing));
  } catch {
    // silent
  }

  if (email && email.includes('@')) {
    try {
      await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[JuniorWit 소개서다운로드] ${email}님의 서비스소개서 PDF 다운로드`,
          _template: 'table',
          _captcha: 'false',
          '신청자 이메일': email,
          '문서명': 'JuniorWit (실행력 좋은 주니어) 서비스 소개서 2026.pdf',
          '다운로드 일시': timeStr,
        }),
      });
    } catch {
      // silent
    }
  }
}
