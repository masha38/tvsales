document.addEventListener("DOMContentLoaded", () => {
  // 1. Lucide 아이콘 초기화
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
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
      });

      // 클릭한 항목 토글
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 4. 스크롤 위치에 따른 헤더 & 플로팅 CTA/탑 버튼 제어
  const header = document.getElementById("mainHeader");
  const stickyBar = document.getElementById("stickyCtaBar");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
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
    } else {
      stickyBar.classList.add("translate-y-full");
      scrollTopBtn.classList.remove("show");
    }
  });

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

  // 6. 실시간 마감 카운트다운 타이머 (긴박감 유도)
  // 오늘 밤 23시 59분 59초 기준 매일 리셋되는 타임아웃 계산
  function updateTimer() {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    let diff = target - now;
    if (diff < 0) {
      // 이미 지났다면 다음날 자정으로 타겟 설정
      target.setDate(target.getDate() + 1);
      diff = target - now;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // DOM 요소 업데이트 (index.html 내의 ID 매핑)
    const hoursEl = document.getElementById("timer-hours");
    const minsEl = document.getElementById("timer-mins");
    const secsEl = document.getElementById("timer-secs");

    if (hoursEl && minsEl && secsEl) {
      hoursEl.textContent = String(hours).padStart(2, "0");
      minsEl.textContent = String(minutes).padStart(2, "0");
      secsEl.textContent = String(seconds).padStart(2, "0");
    }
  }

  // 1초마다 타이머 실행
  setInterval(updateTimer, 1000);
  updateTimer(); // 첫 실행

  // 7. DB 신청 폼 제출 처리 (Lead Form Submit)
  const leadForm = document.getElementById("leadForm");
  const thankYouModal = document.getElementById("thankYouModal");
  const closeModalBtn = document.getElementById("closeModalBtn");

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = phoneInput.value.trim();
    const job = document.getElementById("job").value;
    const agree = document.getElementById("agree").checked;

    // 상세 유효성 검사
    if (!name || name.length < 2) {
      alert("올바른 성함을 입력해주세요 (2자 이상).");
      return;
    }

    const phoneRegex = /^010-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
      alert("올바른 휴대폰 번호 형식(010-XXXX-XXXX)을 확인해주세요.");
      return;
    }

    if (!job) {
      alert("현재 또는 이전 직업군을 선택해주세요.");
      return;
    }

    if (!agree) {
      alert("개인정보 수집 및 이용 동의는 필수사항입니다.");
      return;
    }

    // 리드 객체 생성 (실제 운영 시 API 호출을 통해 DB 저장)
    const leadData = {
      name,
      phone,
      job,
      timestamp: new Date().toISOString(),
      utm: {
        source: new URLSearchParams(window.location.search).get("utm_source") || "direct",
        medium: new URLSearchParams(window.location.search).get("utm_medium") || "none",
        campaign: new URLSearchParams(window.location.search).get("utm_campaign") || "none"
      }
    };

    console.log("DB 수집 완료: ", leadData);
    
    // 로컬 스토리지에 저장하여 중복 제출 확인용 활용
    localStorage.setItem("healthcare_lead_submitted", "true");

    // 마케팅 추적 픽셀 가상 이벤트 호출 (콘솔 로깅 및 모의 실행)
    triggerPixelEvents(leadData);

    // 모달 노출 (감사 팝업)
    thankYouModal.classList.remove("hidden");
    thankYouModal.classList.add("flex");
    
    // 폼 초기화
    leadForm.reset();
  });

  // 모달 닫기
  closeModalBtn.addEventListener("click", () => {
    thankYouModal.classList.add("hidden");
    thankYouModal.classList.remove("flex");
  });

  // 픽셀 이벤트 트리거 함수 (GA4, Facebook Pixel, Kakao Pixel 대응)
  function triggerPixelEvents(data) {
    // 1. GA4 이벤트
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        'value': 1.0,
        'currency': 'KRW',
        'lead_name': data.name,
        'lead_job': data.job
      });
      console.log("GA4 generate_lead event sent");
    }

    // 2. Meta Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Healthcare Sangjo Partner',
        status: 'completed'
      });
      console.log("Meta Pixel Lead event sent");
    }

    // 3. Kakao Pixel
    if (typeof kakaoPixel !== 'undefined') {
      kakaoPixel('CompleteRegistration');
      console.log("Kakao Pixel CompleteRegistration sent");
    }
  }

  // 8. 카카오 싱크 및 간편가입 모의 연동
  const kakaoQuickBtn = document.getElementById("kakaoQuickBtn");
  if (kakaoQuickBtn) {
    kakaoQuickBtn.addEventListener("click", () => {
      // 카카오 싱크 간편 동의 UI 모의 구현
      const mockConfirm = confirm("카카오 계정으로 간편 로그인하여 1초 만에 무료 자료를 다운로드하시겠습니까?\n\n(제공 항목: 이름, 연락처)");
      if (mockConfirm) {
        // 샘플 데이터 삽입 및 즉시 전환
        document.getElementById("name").value = "김카카오";
        document.getElementById("phone").value = "010-9876-5432";
        document.getElementById("job").value = "보험설계사";
        document.getElementById("agree").checked = true;
        
        // 폼 스크롤 이동
        const target = document.getElementById("formSection");
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
