import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

async function generateBrochurePDF() {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const regularFontBytes = fs.readFileSync('/tmp/NanumGothic-Regular.ttf');
  const boldFontBytes = fs.readFileSync('/tmp/NanumGothic-Bold.ttf');

  const regularFont = await doc.embedFont(regularFontBytes);
  const boldFont = await doc.embedFont(boldFontBytes);

  const W = 960;
  const H = 540;

  // Colors
  const bgOffWhite = rgb(0.976, 0.976, 0.973); // #FAFAF9
  const bgRed = rgb(0.85, 0.20, 0.16); // #D93329 vibrant brand red
  const textDark = rgb(0.1, 0.1, 0.1);
  const textGrey = rgb(0.38, 0.38, 0.40);
  const textLightGrey = rgb(0.55, 0.55, 0.58);
  const brandRed = rgb(0.85, 0.20, 0.16);
  const darkRedNumber = rgb(0.68, 0.12, 0.10);
  const white = rgb(1, 1, 1);
  const borderLight = rgb(0.88, 0.88, 0.90);

  function addSlide(isRedBg = false) {
    const page = doc.addPage([W, H]);
    page.drawRectangle({
      x: 0,
      y: 0,
      width: W,
      height: H,
      color: isRedBg ? bgRed : bgOffWhite,
    });
    return page;
  }

  function drawSlideHeader(page: any, chapterText: string, titleText: string) {
    // Top chapter
    page.drawText(chapterText, {
      x: 60,
      y: 485,
      size: 11,
      font: boldFont,
      color: brandRed,
    });

    // Main slide heading
    page.drawText(titleText, {
      x: 60,
      y: 425,
      size: 26,
      font: boldFont,
      color: textDark,
    });
  }

  function drawFooter(page: any, pageNum: number, sourceRight?: string) {
    page.drawText(`${pageNum} · 실행력 좋은 주니어 · 2026`, {
      x: 60,
      y: 40,
      size: 10,
      font: regularFont,
      color: textLightGrey,
    });

    if (sourceRight) {
      const width = regularFont.widthOfTextAtSize(sourceRight, 10);
      page.drawText(sourceRight, {
        x: W - 60 - width,
        y: 40,
        size: 10,
        font: regularFont,
        color: textLightGrey,
      });
    }
  }

  // ================= PAGE 1 =================
  {
    const page = addSlide(false);
    page.drawText('실행력 좋은 주니어', {
      x: 60,
      y: 480,
      size: 13,
      font: boldFont,
      color: brandRed,
    });

    page.drawLine({
      start: { x: 60, y: 455 },
      end: { x: 900, y: 455 },
      thickness: 1,
      color: borderLight,
    });

    page.drawText('판단은 대표님이,', {
      x: 60,
      y: 330,
      size: 42,
      font: boldFont,
      color: textDark,
    });
    page.drawText('실행은 저희가', {
      x: 60,
      y: 275,
      size: 42,
      font: boldFont,
      color: textDark,
    });

    page.drawText('정규직을 늘리지 않고 백오피스 실행을', {
      x: 60,
      y: 200,
      size: 16,
      font: regularFont,
      color: textGrey,
    });
    page.drawText('월 단위로 구독합니다.', {
      x: 60,
      y: 175,
      size: 16,
      font: regularFont,
      color: textGrey,
    });

    page.drawText('안소용  ·  2026', {
      x: 60,
      y: 60,
      size: 12,
      font: regularFont,
      color: textLightGrey,
    });
  }

  // ================= PAGE 2 =================
  {
    const page = addSlide(true);
    page.drawText('지금 영업 제안서는', {
      x: 60,
      y: 330,
      size: 40,
      font: boldFont,
      color: white,
    });
    page.drawText('누가 쓰고 계신가요?', {
      x: 60,
      y: 275,
      size: 40,
      font: boldFont,
      color: white,
    });

    page.drawText('문서, 견적, 리드 정리, 전시회 준비 — 이 일들의 담당자', {
      x: 60,
      y: 200,
      size: 16,
      font: regularFont,
      color: rgb(1, 0.92, 0.92),
    });
    page.drawText('이름을 떠올려 보세요.', {
      x: 60,
      y: 175,
      size: 16,
      font: regularFont,
      color: rgb(1, 0.92, 0.92),
    });
  }

  // ================= PAGE 3 =================
  {
    const page = addSlide(true);
    page.drawText('01', {
      x: 60,
      y: 320,
      size: 110,
      font: boldFont,
      color: darkRedNumber,
    });
    page.drawText('채용의 현실', {
      x: 60,
      y: 240,
      size: 32,
      font: boldFont,
      color: white,
    });
    page.drawText('사람을 더 뽑는 방식은 이미 막혀 있습니다.', {
      x: 60,
      y: 190,
      size: 16,
      font: regularFont,
      color: rgb(1, 0.92, 0.92),
    });
  }

  // ================= PAGE 4 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '01 · 채용의 현실', '채용은 선택이 아니라 투자 결정이 됐습니다');

    // 3 columns
    const cols = [
      {
        label: '채용 난이도',
        val: '45.9%',
        desc1: '중소기업이 매번 인력 채용에 어려움을',
        desc2: '겪는다고 응답했습니다.',
        src: '잡코리아, 2023',
        isRed: false,
      },
      {
        label: '구조조정',
        val: '112',
        desc1: '올해 고용을 30% 이상 줄인 투자유치',
        desc2: '스타트업의 수입니다.',
        src: '서울경제 × THE VC, 2025',
        isRed: false,
      },
      {
        label: '고용 증가율',
        val: '0.6%',
        desc1: '2026년 상반기 국내 스타트업 고용 증가율 —',
        desc2: '사실상 정체입니다.',
        src: 'THE VC, 2026',
        isRed: true,
      },
    ];

    cols.forEach((col, idx) => {
      const x = 60 + idx * 280;
      page.drawText(col.label, {
        x,
        y: 335,
        size: 14,
        font: boldFont,
        color: col.isRed ? brandRed : textDark,
      });

      page.drawText(col.val, {
        x,
        y: 260,
        size: 52,
        font: boldFont,
        color: col.isRed ? brandRed : textDark,
      });

      page.drawText(col.desc1, {
        x,
        y: 220,
        size: 12,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(col.desc2, {
        x,
        y: 200,
        size: 12,
        font: regularFont,
        color: textGrey,
      });

      page.drawText(col.src, {
        x,
        y: 165,
        size: 10,
        font: regularFont,
        color: textLightGrey,
      });
    });

    drawFooter(page, 4);
  }

  // ================= PAGE 5 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '01 · 채용의 현실', '');

    page.drawText('38.0%', {
      x: 60,
      y: 300,
      size: 104,
      font: boldFont,
      color: brandRed,
    });

    page.drawText('벤처·스타트업 퇴직자가 꼽은 애로사항 1위는', {
      x: 60,
      y: 240,
      size: 20,
      font: boldFont,
      color: textDark,
    });
    page.drawText('“과도한 업무 범위”입니다.', {
      x: 60,
      y: 210,
      size: 20,
      font: boldFont,
      color: textDark,
    });

    page.drawText('문제는 채용 한 명의 비용이 아니라, 그 한 명이 감당할 수', {
      x: 60,
      y: 155,
      size: 14,
      font: regularFont,
      color: textGrey,
    });
    page.drawText('없는 업무량입니다.', {
      x: 60,
      y: 132,
      size: 14,
      font: regularFont,
      color: textGrey,
    });

    drawFooter(page, 5, '출처: 이데일리 × 리멤버앤컴퍼니, 벤처·스타트업 퇴직자 400명 대상');
  }

  // ================= PAGE 6 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '01 · 채용의 현실', '채용난은 이탈로 되돌아옵니다');

    // 4 step cards
    const steps = [
      { title: '채용 위축', sub: '투자·비용 부담', isRed: false },
      { title: '업무 과중', sub: '한 사람이 다역', isRed: false },
      { title: '조기 이탈', sub: '업무 범위 불일치', isRed: true },
      { title: '공백 발생', sub: '인수인계 비용', isRed: false },
    ];

    const boxW = 160;
    const boxH = 72;
    const startX = 60;
    const boxY = 270;

    steps.forEach((st, idx) => {
      const bx = startX + idx * 215;

      page.drawRectangle({
        x: bx,
        y: boxY,
        width: boxW,
        height: boxH,
        color: white,
        borderColor: st.isRed ? brandRed : borderLight,
        borderWidth: st.isRed ? 1.5 : 1,
      });

      page.drawText(st.title, {
        x: bx + 18,
        y: boxY + 44,
        size: 14,
        font: boldFont,
        color: st.isRed ? brandRed : textDark,
      });

      page.drawText(st.sub, {
        x: bx + 18,
        y: boxY + 22,
        size: 11,
        font: regularFont,
        color: textLightGrey,
      });

      if (idx < 3) {
        page.drawText('▶', {
          x: bx + boxW + 20,
          y: boxY + 30,
          size: 13,
          font: regularFont,
          color: textLightGrey,
        });
      }
    });

    // Loopback arrow
    page.drawText('⮌ 다시 채용 — 같은 조건으로, 같은 결과로', {
      x: 350,
      y: 220,
      size: 12,
      font: boldFont,
      color: brandRed,
    });

    page.drawText(
      '조기퇴사자의 45.7%는 “실제 업무가 생각했던 것과 달라서” 떠났고, 국내 벤처·스타트업 정규직의 1/3은 6개월을 채우지',
      {
        x: 60,
        y: 140,
        size: 12,
        font: regularFont,
        color: textDark,
      }
    );
    page.drawText('못했습니다. 채용은 이 고리의 해결책이 아니라 시작점이었습니다.', {
      x: 60,
      y: 120,
      size: 12,
      font: regularFont,
      color: textDark,
    });

    drawFooter(page, 6, '출처: 잡코리아(경기도일자리재단 인용), 이데일리 × 리멤버앤컴퍼니');
  }

  // ================= PAGE 7 =================
  {
    const page = addSlide(true);
    page.drawText('02', {
      x: 60,
      y: 320,
      size: 110,
      font: boldFont,
      color: darkRedNumber,
    });
    page.drawText('실행력 좋은 주니어', {
      x: 60,
      y: 240,
      size: 32,
      font: boldFont,
      color: white,
    });
    page.drawText('시장은 이미 구독으로 움직이고 있습니다.', {
      x: 60,
      y: 190,
      size: 16,
      font: regularFont,
      color: rgb(1, 0.92, 0.92),
    });
    page.drawText('다만 실행력이 비어 있습니다.', {
      x: 60,
      y: 165,
      size: 16,
      font: regularFont,
      color: rgb(1, 0.92, 0.92),
    });
  }

  // ================= PAGE 8 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '기존 선택지와의 차이');

    // Comparison Table
    const tableTopY = 345;
    const colWidths = [120, 175, 175, 175, 195];
    const rowHeight = 44;

    const headers = ['구분', '정규직 채용', '외주 대행사', '시니어 자문 구독', '실행력 좋은 주니어'];
    const rows = [
      ['맡기는 것', '사람(고정비 발생)', '프로젝트 결과물', '판단과 방향 조언', '매달 반복되는 실행 업무'],
      ['R&R 및 업무성격', 'R&R 모호, 잡무 과중', '계약서 과업에만 한정', '자문, 조언에 한정', '명확한 R&R, 월별 유연한 조정'],
      ['시작까지 소요', '2~3개월(채용 프로세스)', '견적·계약 협의 필요', '일정 조율 필요', '즉시 투입 가능'],
      ['계약 및 유연성', '사실상 중단 불가', '프로젝트 종료 후 해지', '계약 기간 구속', '월 단위 자유로운 조정/해지'],
    ];

    // Draw header row
    let curX = 60;
    headers.forEach((h, i) => {
      const w = colWidths[i];
      page.drawText(h, {
        x: curX + 6,
        y: tableTopY,
        size: 11,
        font: boldFont,
        color: i === 4 ? brandRed : textGrey,
      });
      curX += w;
    });

    page.drawLine({
      start: { x: 60, y: tableTopY - 10 },
      end: { x: 900, y: tableTopY - 10 },
      thickness: 1,
      color: borderLight,
    });

    // Draw rows
    rows.forEach((row, rIdx) => {
      const rowY = tableTopY - 10 - (rIdx + 1) * rowHeight;
      curX = 60;

      row.forEach((cell, cIdx) => {
        const w = colWidths[cIdx];
        page.drawText(cell, {
          x: curX + 6,
          y: rowY + 16,
          size: 10.5,
          font: cIdx === 4 ? boldFont : regularFont,
          color: cIdx === 4 ? brandRed : textDark,
        });
        curX += w;
      });

      page.drawLine({
        start: { x: 60, y: rowY },
        end: { x: 900, y: rowY },
        thickness: 0.7,
        color: borderLight,
      });
    });

    drawFooter(page, 8, '각 서비스 공개 소개 기준 정리');
  }

  // ================= PAGE 9 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '정규직 팀의 본업 몰입도를 100%로 끌어올립니다');

    const cards = [
      {
        title: '명확한 R&R 설계',
        p1: '업무를 분리하고 명확한 R&R을',
        p2: '정의합니다. 정규직 핵심 인력이 본업에',
        p3: '100% 몰입하도록 환경을 만듭니다.',
        isRed: true,
      },
      {
        title: '전담 담당자 고정',
        p1: '매번 처음부터 새로 설명할 필요가',
        p2: '없습니다. 스타트업 맥락을 이해하는',
        p3: '전담 직원이 온보딩되어 연속성 있게 수행합니다.',
        isRed: false,
      },
      {
        title: '확실한 산출물 검증',
        p1: '투입 시간이 아닌 결과물로',
        p2: '말합니다. 영업 제안서, 정산 문서,',
        p3: '고객 리드 DB 등 즉시 활용 가능한 산출물로 남깁니다.',
        isRed: false,
      },
    ];

    const cardW = 260;
    const cardH = 200;
    const startX = 60;
    const cardY = 160;

    cards.forEach((c, idx) => {
      const cx = startX + idx * 290;

      page.drawRectangle({
        x: cx,
        y: cardY,
        width: cardW,
        height: cardH,
        color: white,
        borderColor: c.isRed ? brandRed : borderLight,
        borderWidth: c.isRed ? 1.5 : 1,
      });

      page.drawText(c.title, {
        x: cx + 24,
        y: cardY + cardH - 45,
        size: 16,
        font: boldFont,
        color: c.isRed ? brandRed : textDark,
      });

      page.drawText(c.p1, {
        x: cx + 24,
        y: cardY + cardH - 85,
        size: 11.5,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(c.p2, {
        x: cx + 24,
        y: cardY + cardH - 105,
        size: 11.5,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(c.p3, {
        x: cx + 24,
        y: cardY + cardH - 125,
        size: 11.5,
        font: regularFont,
        color: textGrey,
      });
    });

    drawFooter(page, 9);
  }

  // ================= PAGE 10 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '스타트업 성장에 맞춘 유연한 구독 티어');

    const tiers = [
      {
        badge: 'BASIC',
        name: '베이직',
        target: '백오피스 어드민',
        desc: '문서 작성, 견적 산출, 정산 보조, 내부 운영 지원 등 반복되는 백오피스 업무 전반',
        benefit: '대표님 저녁 시간 확보',
        isRed: false,
      },
      {
        badge: 'RECOMMENDED',
        name: '스탠다드',
        target: '베이직 + 리서치 서포트',
        desc: '시장 조사, 경쟁사 동향 리포트, 영업 제안서 맞춤 작성, 리드 리스트 구축 지원',
        benefit: '영업 및 사업개발 속도 향상',
        isRed: true,
      },
      {
        badge: 'PREMIUM',
        name: '프리미엄',
        target: '스탠다드 + 현장 실행',
        desc: '전시회·박람회 데모 시연 및 현장 지원, 고객 리드 수집 및 후속 세일즈 관리',
        benefit: '현장 세일즈 과업 완수',
        isRed: false,
      },
    ];

    const tW = 260;
    const tH = 200;
    const startX = 60;
    const tY = 175;

    tiers.forEach((t, idx) => {
      const tx = startX + idx * 290;

      page.drawRectangle({
        x: tx,
        y: tY,
        width: tW,
        height: tH,
        color: white,
        borderColor: t.isRed ? brandRed : borderLight,
        borderWidth: t.isRed ? 1.5 : 1,
      });

      page.drawText(t.badge, {
        x: tx + 20,
        y: tY + tH - 30,
        size: 10,
        font: boldFont,
        color: t.isRed ? brandRed : textLightGrey,
      });

      page.drawText(t.name, {
        x: tx + 20,
        y: tY + tH - 55,
        size: 18,
        font: boldFont,
        color: textDark,
      });

      page.drawText(t.target, {
        x: tx + 20,
        y: tY + tH - 78,
        size: 11,
        font: boldFont,
        color: t.isRed ? brandRed : textGrey,
      });

      // Split desc into 2 lines
      page.drawText(t.desc.slice(0, 24), {
        x: tx + 20,
        y: tY + tH - 105,
        size: 10,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(t.desc.slice(24), {
        x: tx + 20,
        y: tY + tH - 122,
        size: 10,
        font: regularFont,
        color: textGrey,
      });

      page.drawLine({
        start: { x: tx + 20, y: tY + 45 },
        end: { x: tx + tW - 20, y: tY + 45 },
        thickness: 0.8,
        color: borderLight,
      });

      page.drawText(t.benefit, {
        x: tx + 20,
        y: tY + 24,
        size: 11,
        font: boldFont,
        color: t.isRed ? brandRed : textDark,
      });
    });

    // Callout box
    page.drawRectangle({
      x: 60,
      y: 100,
      width: 840,
      height: 44,
      color: white,
      borderColor: borderLight,
      borderWidth: 1,
    });
    page.drawText('스타트업의 이번 달 목표와 상황에 따라 업무 범위와 티어는 월 단위로 자유롭게 조정(Custom) 가능합니다.', {
      x: 80,
      y: 118,
      size: 11,
      font: regularFont,
      color: textGrey,
    });

    drawFooter(page, 10);
  }

  // ================= PAGE 11 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '이 업무를 직접 해본 사람이 설계했습니다');

    const cols = [
      {
        title: '어드민 전반 운영',
        desc: '스타트업에서 문서·계약·내부 운영을 직접 맡아 처리한 경험으로 업무 범위를 설계했습니다.',
        extra: '',
        isRed: false,
      },
      {
        title: 'IT 도메인 이해',
        desc: '제품과 기술 맥락을 이해한 상태로 문서를 씁니다. 설명에 드는 시간이 줄어듭니다.',
        extra: '',
        isRed: false,
      },
      {
        title: '전시회 데모·리드',
        desc: '행사 데모 운영과 고객 리드 확보를 현장에서 수행한 트랙레코드가 있습니다.',
        extra: '* SIMTOS 2026, 2부스 규모에서 비즈니스 카드 50개 수집\n최종 딜 2개 고객사',
        isRed: true,
      },
    ];

    cols.forEach((col, idx) => {
      const cx = 60 + idx * 290;
      page.drawText(col.title, {
        x: cx,
        y: 330,
        size: 15,
        font: boldFont,
        color: col.isRed ? brandRed : textDark,
      });

      page.drawText(col.desc.slice(0, 23), {
        x: cx,
        y: 290,
        size: 11,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(col.desc.slice(23), {
        x: cx,
        y: 270,
        size: 11,
        font: regularFont,
        color: textGrey,
      });

      if (col.extra) {
        page.drawText('* SIMTOS 2026, 2부스 규모에서 비즈니스 카드 50개 수집', {
          x: cx,
          y: 220,
          size: 9.5,
          font: regularFont,
          color: textLightGrey,
        });
        page.drawText('최종 딜 2개 고객사', {
          x: cx,
          y: 205,
          size: 9.5,
          font: regularFont,
          color: textLightGrey,
        });
      }
    });

    drawFooter(page, 11);
  }

  // ================= PAGE 12 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '5일 온보딩으로 시작해, 4개월째 전환을 판단합니다');

    // Section 1: Week 0
    page.drawText('WEEK 0 · 5일 온보딩 (주 5일 기준)', {
      x: 60,
      y: 360,
      size: 11,
      font: boldFont,
      color: brandRed,
    });

    const days = [
      { d: 'DAY 1', t: '킥오프·계약', sub: 'R&R 정의와 업무 분류, NDA 체결, 우선순위 기준 합의' },
      { d: 'DAY 2', t: '권한·인프라', sub: '조회 + 승인요청 구조 접근권한 설정, 보고·긴급 채널과 템플릿 확정' },
      { d: 'DAY 3', t: 'SOP·시범 처리', sub: 'SOP 초안 작성, 저위험 업무 1~2건을 대표님 확인 하에 시범 처리' },
      { d: 'DAY 4', t: '독립 실행 개시', sub: '정기 업무 독립 처리 시작, 성공 기준과 부재 시 대응 프로세스 합의' },
      { d: 'DAY 5', t: 'Week 0 리뷰', sub: '진행 리뷰와 SOP 보정, Month 1 목표(주간 처리 건수) 합의' },
    ];

    days.forEach((day, idx) => {
      const dx = 60 + idx * 170;
      page.drawText(day.d, {
        x: dx,
        y: 330,
        size: 10,
        font: boldFont,
        color: textLightGrey,
      });
      page.drawText(day.t, {
        x: dx,
        y: 310,
        size: 12,
        font: boldFont,
        color: textDark,
      });
      page.drawText(day.sub.slice(0, 16), {
        x: dx,
        y: 285,
        size: 9,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(day.sub.slice(16, 32), {
        x: dx,
        y: 270,
        size: 9,
        font: regularFont,
        color: textGrey,
      });
      if (day.sub.length > 32) {
        page.drawText(day.sub.slice(32), {
          x: dx,
          y: 255,
          size: 9,
          font: regularFont,
          color: textGrey,
        });
      }
    });

    page.drawLine({
      start: { x: 60, y: 235 },
      end: { x: 900, y: 235 },
      thickness: 1,
      color: borderLight,
    });

    // Section 2: Month 1 to Month 4
    const months = [
      { m: 'MONTH 1', t: '실행 안착', sub: '독립 처리 확대, 주간 보고 정례화\nSOP 실전 보정', isRed: false },
      { m: 'MONTH 2', t: '실행 반복', sub: '동일 범위로 안정성 검증\n처리 속도·정확도 개선', isRed: false },
      { m: 'MONTH 3', t: '성과 리뷰', sub: '누적 산출물 리뷰\n성공 기준 대비 실적 점검', isRed: false },
      { m: 'MONTH 4', t: '전환 결정', sub: '유료 전환 여부 판단\n필요 시 업셀 논의', isRed: true },
    ];

    months.forEach((m, idx) => {
      const mx = 60 + idx * 215;
      page.drawText(m.m, {
        x: mx,
        y: 205,
        size: 11,
        font: boldFont,
        color: m.isRed ? brandRed : textGrey,
      });

      page.drawRectangle({
        x: mx,
        y: 190,
        width: 8,
        height: 8,
        color: m.isRed ? brandRed : textGrey,
      });

      page.drawText(m.t, {
        x: mx + 16,
        y: 190,
        size: 13,
        font: boldFont,
        color: textDark,
      });

      const lines = m.sub.split('\n');
      lines.forEach((l, lIdx) => {
        page.drawText(l, {
          x: mx,
          y: 165 - lIdx * 15,
          size: 9.5,
          font: regularFont,
          color: textGrey,
        });
      });
    });

    drawFooter(page, 12);
  }

  // ================= PAGE 13 =================
  {
    const page = addSlide(false);
    drawSlideHeader(page, '02 · 실행력 좋은 주니어', '스타트업과 구직자 사이의 미스매치를 메웁니다');

    const cols = [
      {
        title: '채용난에 지친 스타트업',
        p1: '정규직 한 자리를 늘리기는 어렵고 일은 계속 늘어납니다. 필요한 것은',
        p2: '사람이 아니라 처리된 업무입니다.',
        isRed: false,
      },
      {
        title: '전문성을 원하는 주니어',
        p1: '여러 스타트업의 같은 업무를 반복해 맡으며 트랙을 쌓습니다. 팀이',
        p2: '커지면 전문 트랙을 나눠 맡는 구조로 확장됩니다.',
        isRed: true,
      },
    ];

    cols.forEach((col, idx) => {
      const cx = 60 + idx * 430;
      page.drawText(col.title, {
        x: cx,
        y: 330,
        size: 16,
        font: boldFont,
        color: col.isRed ? brandRed : textDark,
      });

      page.drawLine({
        start: { x: cx, y: 310 },
        end: { x: cx + 380, y: 310 },
        thickness: 1.5,
        color: col.isRed ? brandRed : borderLight,
      });

      page.drawText(col.p1, {
        x: cx,
        y: 275,
        size: 12,
        font: regularFont,
        color: textGrey,
      });
      page.drawText(col.p2, {
        x: cx,
        y: 250,
        size: 12,
        font: regularFont,
        color: textGrey,
      });
    });

    drawFooter(page, 13);
  }

  // ================= PAGE 14 =================
  {
    const page = addSlide(false);
    page.drawText('다음 스텝', {
      x: 60,
      y: 480,
      size: 12,
      font: boldFont,
      color: brandRed,
    });

    page.drawLine({
      start: { x: 60, y: 455 },
      end: { x: 900, y: 455 },
      thickness: 1,
      color: borderLight,
    });

    page.drawText('첫 3개월,', {
      x: 60,
      y: 330,
      size: 42,
      font: boldFont,
      color: textDark,
    });
    page.drawText('구독료는 없습니다', {
      x: 60,
      y: 275,
      size: 42,
      font: boldFont,
      color: textDark,
    });

    page.drawText('이번 주 업무 한 건만 주십시오. 이후에도 월 단위 계약이라 언제든', {
      x: 60,
      y: 200,
      size: 16,
      font: regularFont,
      color: textGrey,
    });
    page.drawText('해지하실 수 있습니다.', {
      x: 60,
      y: 175,
      size: 16,
      font: regularFont,
      color: textGrey,
    });

    page.drawText('안소용  ·  010-9606-1039  ·  whiteyong2@gmail.com', {
      x: 60,
      y: 60,
      size: 13,
      font: regularFont,
      color: textLightGrey,
    });
  }

  const pdfBytes = await doc.save();
  const outPath = path.join(process.cwd(), 'public', 'JuniorWit_서비스소개서_2026.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log(`Brochure PDF generated successfully at ${outPath} (${pdfBytes.length} bytes)`);
}

generateBrochurePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
