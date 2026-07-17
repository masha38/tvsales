const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxj6tdTrTUA5vLrylR1SGyaiW3TFYQNacCyFZMkoeL4nU9pRJz8dQpwUQR9zkeq9KAX/exec";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Lucide 아이콘 초기화
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 메인 히어로 롤링 배너
  const heroSlider = document.getElementById("heroSlider");
  const heroSlides = Array.from(document.querySelectorAll("[data-hero-slide]"));
  const heroDots = Array.from(document.querySelectorAll("[data-hero-dot]"));
  const heroPrevButton = document.querySelector("[data-hero-prev]");
  const heroNextButton = document.querySelector("[data-hero-next]");
  const HERO_SLIDE_INTERVAL = 4500;
  let activeHeroSlide = 0;
  let heroSliderTimer = null;

  function showHeroSlide(index) {
    activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeHeroSlide;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeHeroSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
    });
  }

  function stopHeroSlider() {
    if (heroSliderTimer) {
      window.clearInterval(heroSliderTimer);
      heroSliderTimer = null;
    }
  }

  function startHeroSlider() {
    stopHeroSlider();
    if (heroSlides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    heroSliderTimer = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), HERO_SLIDE_INTERVAL);
  }

  if (heroSlider && heroSlides.length === heroDots.length && heroSlides.length > 1) {
    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showHeroSlide(index);
        startHeroSlider();
      });
    });
    heroPrevButton?.addEventListener("click", () => {
      showHeroSlide(activeHeroSlide - 1);
      startHeroSlider();
    });
    heroNextButton?.addEventListener("click", () => {
      showHeroSlide(activeHeroSlide + 1);
      startHeroSlider();
    });
    heroSlider.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showHeroSlide(activeHeroSlide + (event.key === "ArrowRight" ? 1 : -1));
        startHeroSlider();
      }
    });
    heroSlider.addEventListener("mouseenter", stopHeroSlider);
    heroSlider.addEventListener("mouseleave", startHeroSlider);
    heroSlider.addEventListener("focusin", stopHeroSlider);
    heroSlider.addEventListener("focusout", startHeroSlider);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHeroSlider();
      else startHeroSlider();
    });
    showHeroSlide(0);
    startHeroSlider();
  }

  // 2. 스크롤 애니메이션 (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // 한 번만 애니메이션 실행
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. FAQ 아코디언 토글
  const faqItems = document.querySelectorAll(".accordion-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      
      // 기존에 열려 있는 다른 FAQ 항목 모두 닫기
      faqItems.forEach(otherItem => {
        otherItem.classList.remove("active");
        otherItem.querySelector(".accordion-header")?.setAttribute("aria-expanded", "false");
      });

      // 클릭한 항목 토글
      if (!isActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  // 4. 스크롤 위치에 따른 헤더 & 플로팅 CTA/탑 버튼 제어
  const header = document.getElementById("mainHeader");
  const stickyBar = document.getElementById("stickyCtaBar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  function updateScrollUi() {
    const scrollY = window.scrollY;

    // 헤더 투명도 제어
    if (scrollY > 50) {
      header.classList.add("shadow-md", "bg-white/95");
      header.classList.remove("bg-white/80");
    } else {
      header.classList.remove("shadow-md", "bg-white/95");
      header.classList.add("bg-white/80");
    }

    // 하단 고정 CTA 바 제어 (Hero 섹션을 지나 스크롤 500px 이상 내렸을 때 노출)
    if (scrollY > 500) {
      stickyBar.classList.remove("translate-y-full");
      scrollTopBtn.classList.add("show");
      document.body.classList.add("sticky-cta-visible");
    } else {
      stickyBar.classList.add("translate-y-full");
      scrollTopBtn.classList.remove("show");
      document.body.classList.remove("sticky-cta-visible");
    }
  }

  window.addEventListener("scroll", updateScrollUi, { passive: true });
  updateScrollUi();

  // 탑 버튼 클릭 이벤트
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 5. 연락처 자동 대시(-) 추가 및 정규화
  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    if (value.length > 7) {
      e.target.value = `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7)}`;
    } else if (value.length > 3) {
      e.target.value = `${value.substring(0, 3)}-${value.substring(3)}`;
    } else {
      e.target.value = value;
    }
  });

  // 7. DB 신청 폼 제출 처리 (Lead Form Submit)
  const leadForm = document.getElementById("leadForm");
  const thankYouModal = document.getElementById("thankYouModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const privacyModal = document.getElementById("privacyModal");
  const openPrivacyModalBtn = document.getElementById("openPrivacyModalBtn");
  const closePrivacyModalBtn = document.getElementById("closePrivacyModalBtn");
  const closePrivacyModalIconBtn = document.getElementById("closePrivacyModalIconBtn");
  const formStatus = document.getElementById("formStatus");
  let privacyModalTrigger = null;
  let thankYouModalTrigger = null;

  function setFormStatus(message, type = "info", field = null) {
    formStatus.textContent = message;
    formStatus.classList.remove("hidden", "is-error", "is-success", "is-info");
    formStatus.classList.add(`is-${type}`);
    field?.focus();
  }

  function openPrivacyModal() {
    privacyModalTrigger = document.activeElement;
    privacyModal.classList.remove("hidden");
    privacyModal.classList.add("flex");
    document.body.style.overflow = "hidden";
    closePrivacyModalIconBtn.focus();
  }

  function closePrivacyModal() {
    privacyModal.classList.add("hidden");
    privacyModal.classList.remove("flex");
    document.body.style.overflow = "";
    privacyModalTrigger?.focus();
  }

  openPrivacyModalBtn.addEventListener("click", openPrivacyModal);
  closePrivacyModalBtn.addEventListener("click", closePrivacyModal);
  closePrivacyModalIconBtn.addEventListener("click", closePrivacyModal);
  privacyModal.addEventListener("click", (event) => {
    if (event.target === privacyModal) closePrivacyModal();
  });

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const jobInput = document.getElementById("job");
    const agreeInput = document.getElementById("agree");
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const job = jobInput.value;
    const agree = agreeInput.checked;

    // 상세 유효성 검사
    if (!name || name.length < 2) {
      setFormStatus("성함을 두 글자 이상 입력해 주세요.", "error", nameInput);
      return;
    }

    const phoneRegex = /^010-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      setFormStatus("휴대폰 번호를 010-XXXX-XXXX 형식으로 확인해 주세요.", "error", phoneInput);
      return;
    }

    if (!job) {
      setFormStatus("현재 또는 이전 직업군을 선택해 주세요.", "error", jobInput);
      return;
    }

    if (!agree) {
      setFormStatus("상담 신청을 위해 개인정보 수집 및 이용 동의가 필요합니다.", "error", agreeInput);
      return;
    }

    // 리드 객체 생성 (실제 운영 시 API 호출을 통해 DB 저장)
    const searchParams = new URLSearchParams(window.location.search);
    const leadData = {
      name,
      phone,
      job,
      timestamp: new Date().toISOString(),
      utm: {
        source: searchParams.get("utm_source") || "direct",
        medium: searchParams.get("utm_medium") || "none",
        campaign: searchParams.get("utm_campaign") || "none"
      }
    };
    
    // Google Sheets에 신청 정보를 저장
    const submitButton = leadForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "신청 정보를 저장하고 있습니다...";
    setFormStatus("신청 정보를 안전하게 전송하고 있습니다.", "info");

    try {
      await saveApplicant(leadData);
    } catch (error) {
      console.error("신청 데이터 저장 실패:", error);
      setFormStatus("신청 정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.", "error");
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      return;
    }

    // 설치된 경우에만 마케팅 전환 이벤트 호출
    triggerPixelEvents();

    // 모달 노출 (감사 팝업)
    thankYouModalTrigger = submitButton;
    thankYouModal.classList.remove("hidden");
    thankYouModal.classList.add("flex");
    document.body.style.overflow = "hidden";
    closeModalBtn.focus();
    
    // 폼 초기화
    leadForm.reset();
    setFormStatus("상담 신청이 정상적으로 접수되었습니다.", "success");
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  });

  async function saveApplicant(leadData) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);
    const payload = {
      name: leadData.name,
      phone: leadData.phone,
      job: leadData.job,
      agree: true,
      source: leadData.utm.source,
      medium: leadData.utm.medium,
      campaign: leadData.utm.campaign,
      page: window.location.href
    };

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  function closeThankYouModal() {
    thankYouModal.classList.add("hidden");
    thankYouModal.classList.remove("flex");
    document.body.style.overflow = "";
    thankYouModalTrigger?.focus();
  }

  closeModalBtn.addEventListener("click", closeThankYouModal);
  thankYouModal.addEventListener("click", (event) => {
    if (event.target === thankYouModal) closeThankYouModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!privacyModal.classList.contains("hidden")) closePrivacyModal();
    else if (!thankYouModal.classList.contains("hidden")) closeThankYouModal();
  });

  // 픽셀 이벤트 트리거 함수 (GA4, Facebook Pixel, Kakao Pixel 대응)
  function triggerPixelEvents() {
    // 1. GA4 이벤트
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        'value': 1.0,
        'currency': 'KRW'
      });
    }

    // 2. Meta Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Healthcare Sangjo Partner',
        status: 'completed'
      });
    }

    // 3. Kakao Pixel
    if (typeof kakaoPixel !== 'undefined') {
      kakaoPixel('CompleteRegistration');
    }
  }
});
