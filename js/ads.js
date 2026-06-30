// ============================================
// Ads Manager
// ============================================
// Google AdSense 또는 기타 광고 네트워크 코드를 이 파일에서 관리합니다.
//
// 사용법:
// 1. Google AdSense 승인 후, 아래 AD_CLIENT를 본인 계정으로 교체
// 2. 각 슬롯의 AD_SLOTS 값을 AdSense에서 생성한 광고 단위 ID로 교체
// 3. index.html <head>에 AdSense 스크립트 추가:
//    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossorigin="anonymous"></script>

window.AdsManager = {
  // ── 설정 ──
  AD_CLIENT: 'ca-pub-XXXXXXXXXXXXXXXX', // 본인의 AdSense Publisher ID
  AD_SLOTS: {
    top:    'XXXXXXXXXX',  // 상단 배너 광고 단위 ID
    inline: 'XXXXXXXXXX',  // 계산기 하단 인라인 광고 단위 ID
    bottom: 'XXXXXXXXXX',  // 하단 배너 광고 단위 ID
  },

  initialized: false,

  // ── 초기화 ──
  init: function() {
    if (this.initialized) return;
    this.initialized = true;

    // AdSense가 로드되어 있으면 광고 삽입
    if (this.AD_CLIENT !== 'ca-pub-XXXXXXXXXXXXXXXX') {
      this.loadAllSlots();
    }
  },

  // ── 모든 슬롯에 광고 삽입 ──
  loadAllSlots: function() {
    document.querySelectorAll('.ad-slot').forEach(slot => {
      this.loadSlot(slot);
    });
  },

  // ── 개별 슬롯 로드 ──
  loadSlot: function(slotEl) {
    const position = slotEl.dataset.adPosition;
    const slotId = this.AD_SLOTS[position];
    if (!slotId || slotId === 'XXXXXXXXXX') return;

    // 기존 placeholder 제거
    const placeholder = slotEl.querySelector('.ad-placeholder');
    if (placeholder) placeholder.remove();

    // AdSense ins 태그 생성
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.dataset.adClient = this.AD_CLIENT;
    ins.dataset.adSlot = slotId;
    ins.dataset.adFormat = 'auto';
    ins.dataset.fullWidthResponsive = 'true';
    slotEl.appendChild(ins);

    // 광고 요청
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      slotEl.classList.add('loaded');
    } catch (e) {
      console.warn('Ad load failed:', e);
    }
  },

  // ── 광고 리프레시 (페이지 전환 시) ──
  refresh: function() {
    // SPA에서 페이지 전환 시 인라인 광고 리프레시
    const inlineSlot = document.querySelector('[data-ad-position="inline"]');
    if (inlineSlot && this.AD_CLIENT !== 'ca-pub-XXXXXXXXXXXXXXXX') {
      this.loadSlot(inlineSlot);
    }
  }
};
