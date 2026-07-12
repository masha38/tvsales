# [Prompt] AI 툴 적용용 마스터 디자인 및 개발 프롬프트

본 문서는 **Lovable, v0.dev, Bolt.new, Cursor, Claude Code** 등 다양한 AI 생성 도구에 즉시 입력하여 최고 품질의 결과물을 얻을 수 있도록 설계된 전문 프롬프트 묶음(Prompt Package)입니다.

---

## 1. 마스터 시스템 프롬프트 (Global System & Layout)

이 프롬프트를 AI 도구의 시스템 프롬프트(System Prompt) 또는 최초 프롬프트(Initial Prompt)로 설정하십시오.

```text
You are an expert Frontend Developer and UI/UX Designer specializing in building conversion-focused landing pages.
Your task is to build a premium, mobile-first responsive sales funnel landing page for recruiting "Healthcare Sangjo" (Healthcare + Funeral Service) partners.

Target Audience: Experienced sales professionals (aged 40-65) in South Korea (Insurance, car sales, rentals, real estate).
Goal: Maximize Lead Generation (DB collection) through a free Business PDF download form.

[Design Guidelines]
- Style: Premium, clean, corporate, modern, inspired by Apple, Toss, and Hyundai Card.
- Color Palette:
  * Primary: #0047AB (Royal Blue) for trust and professionalism.
  * Secondary: #22A652 (Healthcare Green) for healthcare/growth feel.
  * Accent: #D4AF37 (Metallic Gold) for premium success and wealth.
  * Background: #F8FAFC (Clean slate-50).
- Typography: Use Korean Google Fonts 'Pretendard' or 'Noto Sans KR'. Keep typography clean, high contrast, and slightly larger than average (suitable for 40-65 age group).
- Key Components:
  * Sticky Header with Quick Contact Button.
  * Floating CTA Button (Kakao Chat & Free PDF download scroll-to).
  * Smooth entry animations using Framer Motion (fade-in-up on scroll).
  * Rounded cards (rounded-2xl to rounded-3xl) with subtle shadow-sm/shadow-md.
  * Glassmorphism headers or callouts (backdrop-blur-md background-white/80).
- Layout: 12 detailed sections, ensuring CTAs are naturally distributed every 2-3 sections. Fully responsive (mobile-first, 360px up to 1440px desktop).

Language: All user-facing text must be in natural, professional, and persuasive Korean (Gyeong-eo-che / Polite Form).
```

---

## 2. 컴포넌트별 상세 프롬프트 (Component-Specific Prompts)

원하는 컴포넌트를 부분 개발(v0.dev 또는 Cursor로 개별 생성)할 때 아래의 프롬프트를 복사하여 붙여넣으십시오.

### 2.1. Hero Section (Section 1)
```text
Create a Hero section for the partner recruitment landing page in Next.js + Tailwind CSS.
Layout: 
- Two-column grid on desktop, single-column stacked on mobile.
- Left column:
  * Green badge: "[현직 보험회사 본부장·지점장·단장 적극 추천 투잡]" (text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold)
  * Headline: "영업은\n어떤 '상품'을 파느냐가\n모든 것을 결정합니다." (text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight)
  * Subtitle: "보험을 하면서, 보험을 더 잘할 수 있게 도와주는 최고의 부업! 매달 소개 고객이 고갈되고 계신가요? 잘 나가는 영업인들은 이미 '장례' 중심에서 '상급병원 빠른 예약 및 전문 간병인 파견'이 결합된 헬스케어 상조로 옮겨가고 있습니다." (text-slate-600 mt-4 text-base md:text-lg)
  * Buttons: 
    - Main CTA: "무료 사업설명서 받기 (PDF)" (bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 text-lg mt-6)
    - Kakao CTA: "카카오 1:1 빠른 상담" (bg-[#FEE500] text-black font-bold py-4 px-6 rounded-xl hover:bg-[#FEE500]/90 transition text-lg mt-6 flex items-center gap-2)
- Right column: 
  * Premium, high-quality image of a professional sales consultant smiling warmly with a senior client (mockup layout, clean rounded borders, glowing background).
Animations: Fade-in-up from the bottom using framer-motion.
```

### 2.2. Comparison Table Component (Section 3)
```text
Build a premium comparison table comparing "Traditional Sangjo" vs "New Healthcare Sangjo".
- Desktop layout: Side-by-side card comparisons with a clear row structure.
- Mobile layout: Swipable cards or stacked comparison view.
- Colors: 
  * Traditional Sangjo: Grayscale, muted tones (#64748B) to look less attractive.
  * Healthcare Sangjo: Glowing border (border-blue-500), subtle blue shadow, badge highlighting "선택 이유!".
- Rows to include:
  1. 사용 시점 (Traditional: 사망 후에만 사용 혹은 사고 시 경제적 보장 vs Healthcare: 가입 즉시 매달 예방/관리/케어 서비스 지원)
  2. 주요 서비스 (Traditional: 장례 의전 및 상조 용품 vs Healthcare: 전국 상급병원 빠른 예약/연결, 전문 간병인 매칭 및 지원)
  3. 고객 반응 (Traditional: 사망 및 장례에 대한 거부감 존재 vs Healthcare: 부모님 효도 선물, 일상 건강 혜택으로 자발적 가입)
  4. 영업 난이도 (Traditional: 높은 영업 피로도 및 거절감 vs Healthcare: 명확한 실생활 필요성으로 쉬운 설명)
  5. 수수료 및 조건 (Traditional: 까다로운 실적 조건 및 보증보험 가입 필수 vs Healthcare: 무보증 가입 가능, 2주 후 첫 수당 및 월 4회 주급식 정산)
- Animation: Subtle scale-up effect on the "Healthcare Sangjo" card to make it visually stand out.
```

### 2.3. Zero-Risk Benefits Grid (Section 7)
```text
Build a clean, high-impact grid component displaying the "5無 Policy (No exam, No clawback, No attendance, No mandatory training, No SGI guarantee)" for sales partners.
- Design: flat, modern card styles inspired by Toss App.
- Layout: 3x2 grid on desktop, 2x3 stacked on mobile.
- Inside cards: Bold icon on top (using lucide-react), bold title (e.g., "[시험 NO!]"), followed by a light text description.
- Cards to include:
  1. 시험 NO!: "어려운 자격시험이나 코드 라이선스 취득 불필요"
  2. 환수 NO!: "계약 취소로 인한 당월 수당 환수 우려 0%"
  3. 출근 NO!: "조회 및 귀소 강요 없는 100% 자율 재택 활동"
  4. 교육 NO!: "길고 지루한 의무 수습 연수 기간 없음"
  5. 서울보증 NO!: "귀찮고 한도를 깎아먹는 보증보험 증권 끊을 필요 없음"
  6. 시간 자유: "본업 스케줄과 100% 호환되는 유연한 시간 관리"
- Animations: Staggered slide-in from bottom using Framer Motion.
```

### 2.4. Lead Magnet Form (Section 9)
```text
Design a conversion-focused lead generation form for capturing potential partner DBs.
- Form Title: "[한정 수량] 현직 영업인만 아는 헬스케어 상조 영업 자료 무료 신청"
- Fields:
  1. Name: input type text, placeholder "성함을 입력해주세요"
  2. Phone: input type tel, placeholder "휴대폰 번호 (- 없이 입력)"
  3. Current Job: select option (보험설계사, 자동차/렌탈 영업, 부동산/금융, 은퇴준비/프리랜서, 기타)
  4. Region: select option (서울, 경기/인천, 충청, 경상, 전라, 강원/제주)
- Consent checkbox: "개인정보 수집 및 제3자 제공에 동의합니다 (필수)"
- Button: "지금 바로 무료 자료 받기 (PDF)" (Full width button, glowing royal blue color gradient #0047AB to #0056D2, pulsating hover effect).
- Visual asset next to form: 3D book mockup titled "헬스케어 상조 실전 영업 자료" (luxury dark navy cover with gold text).
```

### 2.5. Insurance Leaders Testimonials (Section 8)
```text
Create a premium testimonial section highlighting recommendations from insurance agency directors.
- Headline: "현직 보험회사 본부장·지점장·단장이 먼저 극찬한 부업"
- Layout: 3-column horizontal cards on desktop, vertical list on mobile.
- Card items:
  * ㅇㅇ 보험 본부장: "이건 정말 보험인에게 필요한 최고의 부업입니다. 고객 만족도도 높고, 수당 구조가 확실합니다!"
  * ㅇㅇ 보험 지점장: "보험 영업을 하면서 자연스럽게 고객에게 상급병원 진료와 간병인 혜택을 챙겨줄 수 있어 강력 추천합니다."
  * ㅇㅇ 보험 단장: "시간 투자 대비 수익성(주급 수당)이 정말 좋고, 지속 가능한 시스템이라 자신 있게 추천합니다."
- Styles: Simple card UI with light grey backgrounds, clean typography, large quotes, gold star decorations, and executive avatars.
```

### 2.6. FAQ Accordion (Section 11)
```text
Build an interactive FAQ Accordion component in React.
- Use framer-motion for smooth height expand/collapse animations.
- Icon transitions: Rotate arrow icon 180 degrees when expanded.
- Colors: Background slate-50, border-slate-200. Expanded state should have border-blue-500.
- Questions (Include at least 4 key questions):
  1. 정말 초기 비용이나 가입비가 없나요? (Answer: 네, 어떠한 초기 자본도 요구하지 않습니다. 무자본 창업 모델입니다.)
  2. 타사 상조나 보험 영업과 병행 가능한가요? (Answer: 네, 파트너 대부분이 기존 영업을 유지하며 세컨드 아이템으로 높은 시너지를 냅니다.)
  3. 헬스케어 혜택은 가입 즉시 쓸 수 있나요? (Answer: 네, 고객 가입이 완료되는 시점부터 병원 예약 대행 및 실시간 상담이 바로 제공됩니다.)
  4. 수수료 지급일은 어떻게 되나요? (Answer: 업계 최초 2주 후 첫 수당 신속 지급 및 매월 4회(주급식) 정산되어 지급됩니다.)
```

---

## 3. Framer Motion 인터랙션 설정 템플릿

웹 개발 툴이나 코드 생성 시 스크롤 페이드인을 일관성 있게 구현하기 위해 아래 코드를 준수하도록 지시하십시오.

```javascript
// 스크롤 시 부드러운 Fade In Up 효과 정의
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// 순차적으로 나타나는 자식 요소 효과 (Staggered Children)
export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true, margin: "-100px" }
};
```
AI 도구에 위 템플릿을 사용하여 모든 카드 및 섹션에 모던한 모션 그래픽 효과를 부여하라고 명령하세요.
