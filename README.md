# EngCalc Pro — 산업용 엔지니어링 계산기

> 전기/전자, 설계, 소재, 유체역학, 열역학, 기계공학 분야의 전문 공학 계산 도구 모음

## 🌐 데모

GitHub Pages에서 실행: `https://<username>.github.io/industrial-calculator/`

## ✨ 주요 기능

- **6개 공학 분야**, 15개 이상 중분류, 150개 이상의 실제 작동하는 계산기
- **모바일 최적화** — 터치 친화적 버튼, 반응형 3열 그리드
- **실시간 계산** — 값 입력 즉시 결과 표시
- **검색 기능** — 계산기 이름/설명으로 실시간 검색
- **광고 지원** — Google AdSense 광고 슬롯 내장

## 📁 프로젝트 구조

```
industrial-calculator/
├── index.html              # 메인 HTML
├── css/
│   └── style.css           # 스타일 (모바일 퍼스트)
├── js/
│   ├── app.js              # 메인 앱 컨트롤러
│   ├── ui.js               # UI 렌더링
│   ├── engine.js           # 계산 엔진
│   ├── ads.js              # 광고 관리자
│   └── data/
│       ├── electrical.js   # 전기/전자 (⚡)
│       ├── design.js       # 설계 (📐)
│       ├── material.js     # 소재 (🧪)
│       ├── fluid.js        # 유체역학 (🌊)
│       ├── thermo.js       # 열역학 (🔥)
│       └── mechanical.js   # 기계공학 (🔩)
└── README.md
```

## 🚀 GitHub Pages 배포 방법

### 1. 저장소 생성 및 푸시

```bash
cd industrial-calculator
git init
git add .
git commit -m "Initial commit: EngCalc Pro"
git branch -M main
git remote add origin https://github.com/<username>/industrial-calculator.git
git push -u origin main
```

### 2. GitHub Pages 활성화

1. GitHub 저장소 → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. **Save** 클릭
5. 몇 분 후 `https://<username>.github.io/industrial-calculator/` 에서 접속 가능

## 📝 계산기 추가 방법

각 데이터 파일(`js/data/*.js`)에 아래 형식으로 계산기를 추가하세요:

```javascript
{
  id: 'unique-id',           // 전역 고유 ID
  name: '계산기 이름',         // 한국어 이름
  icon: '⚡',                // 이모지 아이콘
  desc: '설명 텍스트',         // 한국어 설명
  formula: {
    text: 'V = I × R',       // 공식 문자열
    vars: [                   // 변수 설명
      { s: 'V', d: '전압(V)' },
      { s: 'I', d: '전류(A)' }
    ]
  },
  modes: [                    // 계산 모드 (1개 이상)
    {
      id: 'mode-id',
      label: '모드 라벨',
      inputs: [               // 입력 필드 정의
        { id: 'i', label: '전류', unit: 'A', hint: '암페어' }
      ],
      rLabel: '결과 라벨',     // 결과 표시 라벨
      rUnit: 'V',             // 결과 단위
      calc: function(v) {     // 계산 함수 (v는 입력값 객체)
        return v.i * v.r;
      }
    }
  ]
}
```

## 📢 광고 설정

`js/ads.js` 파일에서:

1. `AD_CLIENT`를 본인의 Google AdSense Publisher ID로 교체
2. `AD_SLOTS`의 각 값을 AdSense 광고 단위 ID로 교체
3. `index.html` `<head>`에 AdSense 스크립트 추가:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX" crossorigin="anonymous"></script>
```

## 🛠️ 로컬 개발

정적 HTML이므로 별도의 빌드 과정 없이 바로 브라우저에서 열 수 있습니다.

```bash
# 방법 1: 직접 열기
start index.html

# 방법 2: 로컬 서버 사용 (Node.js 필요)
npx http-server . -p 8080

# 방법 3: Python 서버
python -m http.server 8080
```

## 📄 라이선스

MIT License
