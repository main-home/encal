window.DATA_ENGINEERING_2 = [
  {
    id: 'eng_new_materials',
    name: '신소재·재료공학',
    icon: '🌌',
    color: '#06b6d4',
    subcategories: [
      {
        id: 'nm_crystal_nano',
        name: '결정구조 및 기초 재료과학',
        calculators: [
          { id: 'nm_n1', name: '결정 구조 충진율 (APF)', icon: '⚛️', desc: '단위격자 내 BCC/FCC 충진율을 구합니다.', formula: { text: 'APF = n×(4/3)πr³ / a³', vars: [] }, modes: [{ id: 'm', label: 'BCC/FCC 대입', inputs: [{ id: 'atoms', label: '단위격자 원자 수', unit: '개' }], rLabel: '충진율', rUnit: '%', calc: function(v) { return v.atoms === 2 ? 68 : (v.atoms === 4 ? 74 : 0); } }] },
          { id: 'nm_n2', name: '데바이-셰러 결정립 크기', icon: '📐', desc: 'FWHM으로부터 나노 결정립의 평균 크기를 계산합니다.', formula: { text: 't = 0.9 × λ / (β × cosθ)', vars: [] }, modes: [{ id: 'm', label: '결정크기 계산', inputs: [{ id: 'wl', label: '파장 λ', unit: 'nm' }, { id: 'b', label: '반치폭 β', unit: 'rad' }, { id: 'th', label: '브래그각 θ', unit: '°' }], rLabel: '결정립 크기', rUnit: 'nm', calc: function(v) { var denom = v.b * Math.cos(v.th*Math.PI/180); return denom ? 0.9 * v.wl / denom : Infinity; } }] },
          { id: 'nm_n13', name: '비어-람베르트 흡광도', icon: '🔬', desc: '투과율(T)로부터 흡광도(A)를 계산합니다.', formula: { text: 'A = -log10(T)', vars: [] }, modes: [{ id: 'm', label: '흡광도 계산', inputs: [{ id: 't', label: '투과율 (T)', unit: '0~1' }], rLabel: '흡광도 (A)', rUnit: '', calc: function(v) { return v.t > 0 ? -Math.log10(v.t) : Infinity; } }] },
          { id: 'nm_n14', name: '진공 증착률 두께', icon: '🛡️', desc: '증착 속도와 시간으로부터 타겟 코팅 막 두께를 구합니다.', formula: { text: 't = Rate × Time', vars: [] }, modes: [{ id: 'm', label: '두께 계산', inputs: [{ id: 'r', label: '증착 속도', unit: 'Å/s' }, { id: 'time', label: '증착 시간', unit: 's' }], rLabel: '증착 두께', rUnit: 'nm', calc: function(v) { return (v.r * v.time) / 10; } }] },
          { id: 'nm_n21', name: '전위 밀도 (Dislocation Density)', icon: '⚛️', desc: '결정립 크기(d)로부터 결정내 전위선 총 길이 밀도를 구합니다.', formula: { text: 'ρ = 3 / d²', vars: [] }, modes: [{ id: 'm', label: '전위밀도 산출', inputs: [{ id: 'd', label: '평균 결정립 크기', unit: 'μm' }], rLabel: '전위 밀도 (ρ)', rUnit: '×10¹² m⁻²', calc: function(v) { return v.d > 0 ? 3 / (v.d * v.d) : Infinity; } }] },
          { id: 'mr_ma1', name: '엔지니어링 진응력', icon: '🔬', desc: '공칭 응력과 공칭 변형률로부터 진응력(True Stress)을 구합니다.', formula: { text: 'σ_true = σ_nom × (1 + ε_nom)', vars: [] }, modes: [{ id: 'm', label: '진응력 계산', inputs: [{ id: 's', label: '공칭 응력', unit: 'MPa' }, { id: 'e', label: '공칭 변형률', unit: '' }], rLabel: '진응력', rUnit: 'MPa', calc: function(v) { return v.s * (1 + v.e); } }] },
          { id: 'mr_ma2', name: '결정 면간 거리 (입방격자)', icon: '📐', desc: '격자 상수와 밀러 지수로부터 면간 거리(dhkl)를 계산합니다.', formula: { text: 'd = a / √(h² + k² + l²)', vars: [] }, modes: [{ id: 'm', label: '면간거리 d 계산', inputs: [{ id: 'a', label: '격자상수 (a)', unit: 'nm' }, { id: 'h', label: 'h 지수', unit: '' }, { id: 'k', label: 'k 지수', unit: '' }, { id: 'l', label: 'l 지수', unit: '' }], rLabel: '면간 거리', rUnit: 'nm', calc: function(v) { var inside = v.h*v.h + v.k*v.k + v.l*v.l; return inside > 0 ? v.a / Math.sqrt(inside) : Infinity; } }] },
          { id: 'mr_ma12', name: '지렛대 법칙 (Phase fraction)', icon: '📊', desc: '2성분계 상평형 상태도에서 합금 성분조성비로부터 고상 분율(fs)을 구합니다.', formula: { text: 'fs = (C_liquid - C0) / (C_liquid - C_solid)', vars: [] }, modes: [{ id: 'm', label: '고상분율 계산', inputs: [{ id: 'c0', label: '전체 조성 (C0)', unit: '%' }, { id: 'cl', label: '액상 조성 (CL)', unit: '%' }, { id: 'cs', label: '고상 조성 (CS)', unit: '%' }], rLabel: '고상 분율 (fs)', rUnit: '0~1', calc: function(v) { var denom = v.cl - v.cs; return denom ? (v.cl - v.c0) / denom : 0; } }] }
        ]
      },
      {
        id: 'nm_func_smart',
        name: '금속, 세라믹 및 스마트 재료',
        calculators: [
          { id: 'nm_n3', name: '압전 소자 발생 전압', icon: '⚡', desc: '압전 계수, 인가 하중 및 정전용량으로부터 전압을 계산합니다.', formula: { text: 'V = d × F / C', vars: [] }, modes: [{ id: 'm', label: '전압 계산', inputs: [{ id: 'd', label: '압전계수 (d)', unit: 'pC/N' }, { id: 'f', label: '인가하중 (F)', unit: 'N' }, { id: 'c', label: '정전용량 (C)', unit: 'nF' }], rLabel: '발생 전압', rUnit: 'V', calc: function(v) { return v.c ? (v.d * 1e-12 * v.f) / (v.c * 1e-9) : Infinity; } }] },
          { id: 'nm_n4', name: 'SMA 회복 변형률', icon: '🔄', desc: '초기 형상기억합금 길이 대비 회복 변형률을 구합니다.', formula: { text: 'ε_rec = ΔL / L0 × 100', vars: [] }, modes: [{ id: 'm', label: '회복 변형률', inputs: [{ id: 'dl', label: '회복 길이', unit: 'mm' }, { id: 'l0', label: '초기 길이', unit: 'mm' }], rLabel: '회복 변형률', rUnit: '%', calc: function(v) { return v.l0 ? (v.dl / v.l0) * 100 : 0; } }] },
          { id: 'nm_n9', name: '투자율과 자화율', icon: '🧲', desc: '자화율(χ)로부터 비투자율(μr)을 계산합니다.', formula: { text: 'μr = 1 + χ', vars: [] }, modes: [{ id: 'm', label: '비투자율 계산', inputs: [{ id: 'chi', label: '자화율 (χ)', unit: '' }], rLabel: '비투자율 (μr)', rUnit: '', calc: function(v) { return 1 + v.chi; } }] },
          { id: 'nm_n22', name: '스마트재료 변환에너지율', icon: '⚡', desc: '입력 역학적 일 대비 전기적 출력 에너지 비율을 구합니다.', formula: { text: 'Eff = E_out / W_in × 100', vars: [] }, modes: [{ id: 'm', label: '효율 계산', inputs: [{ id: 'win', label: '입력 기계적 일', unit: 'J' }, { id: 'eout', label: '출력 전기에너지', unit: 'J' }], rLabel: '변환 효율', rUnit: '%', calc: function(v) { return v.win ? (v.eout / v.win) * 100 : 0; } }] },
          { id: 'mr_ma3', name: '결정립 크기 지수', icon: '🔬', desc: 'ASTM 결정립 번호로부터 100배율 시야의 결정립 수(N)를 역산합니다.', formula: { text: 'N = 2^(G - 1)', vars: [] }, modes: [{ id: 'm', label: 'N 계산', inputs: [{ id: 'g', label: 'ASTM 결정립번호 (G)', unit: '' }], rLabel: '결정립 수 (N)', rUnit: '개/in²', calc: function(v) { return Math.pow(2, v.g - 1); } }] },
          { id: 'mr_ma4', name: '황동 구리-아연 조성비 비중', icon: '⚙️', desc: '아연 비율에 따른 황동 합금의 밀도를 산출합니다.', formula: { text: 'ρ = 8.96 × (1 - w_zn) + 7.14 × w_zn', vars: [] }, modes: [{ id: 'm', label: '황동 밀도 계산', inputs: [{ id: 'w', label: '아연(Zn) 함량 비율', unit: '0~1' }], rLabel: '합금 밀도', rUnit: 'g/cm³', calc: function(v) { return 8.96 * (1 - v.w) + 7.14 * v.w; } }] },
          { id: 'mr_ma5', name: '세라믹 열충격 저항지수', icon: '🧱', desc: '강도, 열전도도, 열팽창계수 및 탄성계수로부터 열충격 저항계수(R)를 구합니다.', formula: { text: 'R = σ × k / (E × α)', vars: [] }, modes: [{ id: 'm', label: 'R 지수 계산', inputs: [{ id: 's', label: '인장 강도', unit: 'MPa' }, { id: 'k', label: '열전도율', unit: 'W/m·K' }, { id: 'e', label: '탄성계수', unit: 'GPa' }, { id: 'a', label: '열팽창계수', unit: '×10⁻⁶/°C' }], rLabel: '열충격 계수 (R)', rUnit: 'kW/m', calc: function(v) { var denom = (v.e * 1000) * (v.a * 1e-6); return denom ? (v.s * v.k) / denom / 1000 : Infinity; } }] },
          { id: 'mr_ma13', name: '확산 깊이 (Fick 2법칙)', icon: '🔥', desc: '확산시간(t)과 확산계수(D)로부터 반무한 고체 내부 침탄 유효 깊이를 계산합니다.', formula: { text: 'x ≈ 2 × √(D × t)', vars: [] }, modes: [{ id: 'm', label: '유효확산깊이 계산', inputs: [{ id: 'd', label: '확산계수 (D)', unit: 'm²/s' }, { id: 't', label: '확산 시간 (t)', unit: 'hour' }], rLabel: '확산 깊이 (x)', rUnit: 'mm', calc: function(v) { return 2 * Math.sqrt(v.d * (v.t * 3600)) * 1000; } }] }
        ]
      },
      {
        id: 'nm_opto_elec',
        name: '광학, 전자 및 반도체 재료',
        calculators: [
          { id: 'nm_n5', name: 'N형 다수 캐리어 농도', icon: '🔬', desc: '도너 도핑 농도로부터 전자 농도(nn)를 구합니다.', formula: { text: 'nn ≈ Nd', vars: [] }, modes: [{ id: 'm', label: '전자 농도 계산', inputs: [{ id: 'nd', label: '도너 농도 (Nd)', unit: 'cm⁻³' }], rLabel: '전자농도 (nn)', rUnit: 'cm⁻³', calc: function(v) { return v.nd; } }] },
          { id: 'nm_n6', name: '스넬의 굴절 법칙', icon: '🌈', desc: '굴절률과 입사각으로부터 굴절각(θ2)을 계산합니다.', formula: { text: 'sin(θ2) = n1 × sin(θ1) / n2', vars: [] }, modes: [{ id: 'm', label: '굴절각 계산', inputs: [{ id: 'n1', label: 'n1 (입사측)', unit: '' }, { id: 'n2', label: 'n2 (굴절측)', unit: '' }, { id: 'a1', label: '입사각 θ1', unit: '°' }], rLabel: '굴절각 θ2', rUnit: '°', calc: function(v) { if (!v.n2) return Infinity; var s2 = (v.n1 * Math.sin(v.a1*Math.PI/180)) / v.n2; return s2 >= -1 && s2 <= 1 ? (Math.asin(s2)*180/Math.PI) : 0; } }] },
          { id: 'nm_n7', name: '홀 효과 캐리어 밀도', icon: '⚡', desc: '홀 계수(Rh)로부터 전하 캐리어 밀도(n)를 산출합니다.', formula: { text: 'n = 1 / (Rh × q)', vars: [] }, modes: [{ id: 'm', label: '캐리어 밀도 계산', inputs: [{ id: 'rh', label: '홀 계수 (Rh)', unit: 'cm³/C' }], rLabel: '밀도 (n)', rUnit: 'cm⁻³', calc: function(v) { var q = 1.602e-19; return v.rh ? 1 / (v.rh * q) : Infinity; } }] },
          { id: 'nm_n23', name: 'LED 외부 양자 효율 (EQE)', icon: '💡', desc: '주입 전자 수 대비 방출 광자 수의 비율을 계산합니다.', formula: { text: 'EQE = N_photons / N_electrons × 100', vars: [] }, modes: [{ id: 'm', label: 'EQE 계산', inputs: [{ id: 'np', label: '방출 광자 수', unit: '×10¹⁵ 개' }, { id: 'ne', label: '주입 전자 수', unit: '×10¹⁵ 개' }], rLabel: '양자 효율 (EQE)', rUnit: '%', calc: function(v) { return v.ne ? (v.np / v.ne) * 100 : 0; } }] },
          { id: 'mr_ma8', name: '재료 로렌츠 수 (Wiedemann-Franz)', icon: '⚡', desc: '금속의 전기전도도와 열전도도로부터 로렌츠 비를 계산합니다.', formula: { text: 'L = k / (σ × T)', vars: [] }, modes: [{ id: 'm', label: 'Lorentz 수 계산', inputs: [{ id: 'k', label: '열전도율 (k)', unit: 'W/m·K' }, { id: 's', label: '전기전도도', unit: 'MS/m' }, { id: 't', label: '절대온도 (T)', unit: 'K' }], rLabel: '로렌츠 수 (L)', rUnit: '×10⁻⁸ W·Ω/K²', calc: function(v) { var denom = (v.s * 1e6) * v.t; return denom ? (v.k / denom) * 1e8 : Infinity; } }] },
          { id: 'mr_ma9', name: '외인성 반도체 다수 캐리어', icon: '🔬', desc: 'N형 도핑 농도(Nd)와 진성 농도로부터 소수 캐리어(pn) 농도를 구합니다.', formula: { text: 'pn = ni² / Nd', vars: [] }, modes: [{ id: 'm', label: '소수캐리어 농도', inputs: [{ id: 'nd', label: 'N형 도핑농도 (Nd)', unit: 'cm⁻³' }], rLabel: '홀 농도 (pn)', rUnit: 'cm⁻³', calc: function(v) { var ni2 = 2.25e20; return v.nd ? ni2 / v.nd : Infinity; } }] }
        ]
      },
      {
        id: 'nm_struct_composite',
        name: '구조, 복합재 및 파괴/부식공학',
        calculators: [
          { id: 'nm_n10', name: '와이블 파괴 누적 확률', icon: '🧱', desc: '와이블 계수를 이용해 세라믹의 파괴 누적 확률(F)을 계산합니다.', formula: { text: 'F = 1 - exp(-(σ / σ0)^m)', vars: [] }, modes: [{ id: 'm', label: '파괴확률 계산', inputs: [{ id: 's', label: '인가 응력 (σ)', unit: 'MPa' }, { id: 's0', label: '기준 응력 (σ0)', unit: 'MPa' }, { id: 'w', label: '와이블 모듈러스 (m)', unit: '' }], rLabel: '파괴 확률 (F)', rUnit: '%', calc: function(v) { return v.s0 > 0 ? (1 - Math.exp(-Math.pow(v.s / v.s0, v.w))) * 100 : 0; } }] },
          { id: 'nm_n11', name: '마크-하우윈크 고유점도', icon: '🔗', desc: '분자량(M)으로부터 고유 점도를 산출합니다.', formula: { text: '[η] = K × M^a', vars: [] }, modes: [{ id: 'm', label: '고유점도 계산', inputs: [{ id: 'm', label: '점도평균분자량', unit: 'g/mol' }, { id: 'k', label: '상수 K', unit: '×10⁻⁴' }, { id: 'a', label: '상수 a', unit: '' }], rLabel: '고유 점도', rUnit: 'dL/g', calc: function(v) { return (v.k * 1e-4) * Math.pow(v.m, v.a); } }] },
          { id: 'nm_n12', name: '할핀-차이 전단탄성계수', icon: '📐', desc: '강화 섬유 부하 조건에서 횡방향 탄성률 근사치를 계산합니다.', formula: { text: 'Ec = Em × (1 + η×Vf) / (1 - η×Vf)', vars: [] }, modes: [{ id: 'm', label: '탄성계수 계산', inputs: [{ id: 'em', label: '기재 탄성계수', unit: 'GPa' }, { id: 'eta', label: '할핀 차이 계수 η', unit: '0~1' }, { id: 'vf', label: '섬유 체적비 (Vf)', unit: '0~1' }], rLabel: '복합재 탄성계수', rUnit: 'GPa', calc: function(v) { var num = 1 + v.eta * v.vf; var den = 1 - v.eta * v.vf; return den > 0 ? v.em * (num / den) : Infinity; } }] },
          { id: 'nm_n25', name: '복합재료 밀도 (Rule of Mixtures)', icon: '📐', desc: '섬유와 기재의 부피 분율과 밀도로부터 복합재의 평균 밀도를 계산합니다.', formula: { text: 'ρ_c = ρ_f × V_f + ρ_m × V_m', vars: [] }, modes: [{ id: 'm', label: '복합재 밀도 계산', inputs: [{ id: 'rf', label: '섬유 밀도 (ρf)', unit: 'g/cm³' }, { id: 'vf', label: '섬유 부피분율 (Vf)', unit: '0~1' }, { id: 'rm', label: '기재 밀도 (ρm)', unit: 'g/cm³' }], rLabel: '복합재료 밀도', rUnit: 'g/cm³', calc: function(v) { return v.rf * v.vf + v.rm * (1 - v.vf); } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_industrial',
    name: '산업공학',
    icon: '📊',
    color: '#8b5cf6',
    subcategories: [
      {
        id: 'ind_math_data',
        name: '수학 및 데이터',
        calculators: [
          { id: 'in_i1', name: '2x2 행렬 디터미넌트', icon: '📐', desc: 'ad - bc 행렬식을 계산합니다.', formula: { text: 'det = ad - bc', vars: [] }, modes: [{ id: 'm', label: 'det 계산', inputs: [{ id: 'a', label: 'a', unit: '' }, { id: 'b', label: 'b', unit: '' }, { id: 'c', label: 'c', unit: '' }, { id: 'd', label: 'd', unit: '' }], rLabel: '행렬식 (det)', rUnit: '', calc: function(v) { return v.a*v.d - v.b*v.c; } }] },
          { id: 'in_i2', name: '이항분포 기대값', icon: '📊', desc: '시행횟수(n)와 성공확률(p)로부터 평균 기대값(E)을 구합니다.', formula: { text: 'E = n × p', vars: [] }, modes: [{ id: 'm', label: '기대값 계산', inputs: [{ id: 'n', label: '시행 횟수 (n)', unit: '회' }, { id: 'p', label: '성공 확률 (p)', unit: '0~1' }], rLabel: '기대값 (E)', rUnit: '회', calc: function(v) { return v.n * v.p; } }] },
          { id: 'in_i17', name: '공분산에 의한 피어슨 상관계수', icon: '📊', desc: '두 변수의 공분산과 각각의 표준편차로부터 상관계수(r)를 구합니다.', formula: { text: 'r = Cov(X,Y) / (sX × sY)', vars: [] }, modes: [{ id: 'm', label: '상관계수 계산', inputs: [{ id: 'cov', label: '공분산 Cov(X,Y)', unit: '' }, { id: 'sx', label: 'X 표준편차 (sX)', unit: '' }, { id: 'sy', label: 'Y 표준편차 (sY)', unit: '' }], rLabel: '상관계수 (r)', rUnit: '', calc: function(v) { var denom = v.sx * v.sy; return denom ? v.cov / denom : 0; } }] },
          { id: 'in_i18', name: '딥러닝 활성화 함수 (Sigmoid)', icon: '🧠', desc: '입력 신호 x에 대한 시그모이드 출력 확률값(0~1)을 구합니다.', formula: { text: 'y = 1 / (1 + e^-x)', vars: [] }, modes: [{ id: 'm', label: 'Sigmoid 출력', inputs: [{ id: 'x', label: '입력 값 (x)', unit: '' }], rLabel: '출력 (y)', rUnit: '', calc: function(v) { return 1 / (1 + Math.exp(-v.x)); } }] },
          { id: 'in_i21', name: '학습 곡선 누적 시간 (Learning Curve)', icon: '📈', desc: '초기 생산 시간(T1), 생산 수량(N) 및 학습율(L) 조건에서 누적 생산 시간을 구합니다.', formula: { text: 'Tn = T1 × N^(log2(L))', vars: [] }, modes: [{ id: 'm', label: '누적시간 계산', inputs: [{ id: 't1', label: '1차 생산시간', unit: '시간' }, { id: 'n', label: '생산 수량 (N)', unit: '개' }, { id: 'lr', label: '학습율 (L)', unit: '%' }], rLabel: '누적 가공시간', rUnit: '시간', calc: function(v) { var b = Math.log(v.lr/100) / Math.log(2); return v.t1 * Math.pow(v.n, b); } }] }
        ]
      },
      {
        id: 'ind_quality_rel',
        name: '품질 및 신뢰성',
        calculators: [
          { id: 'in_i3', name: 'PPM 불량률', icon: '📉', desc: '불량 개수와 검사 수량으로부터 PPM 불량률을 계산합니다.', formula: { text: 'PPM = (d / N) × 1,000,000', vars: [] }, modes: [{ id: 'm', label: 'PPM 계산', inputs: [{ id: 'd', label: '불량 개수', unit: '개' }, { id: 'n', label: '총 검사수', unit: '개' }], rLabel: '불량률 (PPM)', rUnit: 'ppm', calc: function(v) { return v.n ? (v.d / v.n) * 1000000 : Infinity; } }] },
          { id: 'in_i4', name: 'X-bar 관리도 한계선', icon: '📊', desc: '평균 및 표준오차를 이용해 상한/하한 관리한계(UCL, LSL)를 구합니다.', formula: { text: 'UCL = μ + 3 × (s / √n)', vars: [] }, modes: [{ id: 'm', label: 'UCL 관리한계 계산', inputs: [{ id: 'u', label: '공정 평균 (μ)', unit: '' }, { id: 's', label: '표준편차 (s)', unit: '' }, { id: 'n', label: '군 크기 (n)', unit: '개' }], rLabel: '관리 상한 (UCL)', rUnit: '', calc: function(v) { return v.n > 0 ? v.u + 3 * (v.s / Math.sqrt(v.n)) : v.u; } }] },
          { id: 'in_i5', name: '지수 신뢰도 확률', icon: '📉', desc: '고장률(λ)과 운용 시간(t)으로부터 시스템 신뢰도 R(t)를 산출합니다.', formula: { text: 'R = exp(-λ × t)', vars: [] }, modes: [{ id: 'm', label: '신뢰도 계산', inputs: [{ id: 'l', label: '고장률 (λ)', unit: '/시간' }, { id: 't', label: '운용 시간 (t)', unit: '시간' }], rLabel: '신뢰도 R(t)', rUnit: '', calc: function(v) { return Math.exp(-v.l * v.t); } }] },
          { id: 'in_i22', name: '평균 고장 간격 (MTBF)', icon: '⏱️', desc: '총 가동 시간과 고장 횟수로부터 설비의 MTBF를 산출합니다.', formula: { text: 'MTBF = T_active / N_failures', vars: [] }, modes: [{ id: 'm', label: 'MTBF 계산', inputs: [{ id: 'time', label: '총 가동시간', unit: '시간' }, { id: 'fail', label: '고장 발생횟수', unit: '회' }], rLabel: '평균 고장 간격', rUnit: '시간/회', calc: function(v) { return v.fail ? v.time / v.fail : Infinity; } }] }
        ]
      },
      {
        id: 'ind_prod_process',
        name: '생산 및 공정관리',
        calculators: [
          { id: 'in_i6', name: '설비 종합 효율 (OEE)', icon: '⏱️', desc: '시간 가동률, 성능 가동률, 양품률의 곱으로 OEE를 계산합니다.', formula: { text: 'OEE = A × P × Q × 100', vars: [] }, modes: [{ id: 'm', label: 'OEE 계산', inputs: [{ id: 'a', label: '가동률 (A)', unit: '0~1' }, { id: 'p', label: '성능 (P)', unit: '0~1' }, { id: 'q', label: '양품률 (Q)', unit: '0~1' }], rLabel: '종합 효율 (OEE)', rUnit: '%', calc: function(v) { return v.a * v.p * v.q * 100; } }] },
          { id: 'in_i8', name: '공정 편성 효율 (Line Balancing)', icon: '⏱️', desc: '각 공정 시간합과 총 시간으로부터 편성 효율(E)을 구합니다.', formula: { text: 'E = Sum(Ti) / (N × T_cycle) × 100', vars: [] }, modes: [{ id: 'm', label: '편성효율 계산', inputs: [{ id: 'sum', label: '공정 작업시간 합', unit: '초' }, { id: 'n', label: '작업장 수 (N)', unit: '개' }, { id: 'c', label: '사이클타임 (C)', unit: '초' }], rLabel: '라인 효율 (E)', rUnit: '%', calc: function(v) { var denom = v.n * v.c; return denom ? (v.sum / denom) * 100 : 0; } }] },
          { id: 'in_i10', name: '표준 작업 시간', icon: '⏱️', desc: '정미시간과 여유율(Allowances)로부터 표준 시간(ST)을 구합니다.', formula: { text: 'ST = NT × (1 + Allowance)', vars: [] }, modes: [{ id: 'm', label: '표준시간 계산', inputs: [{ id: 'nt', label: '정미시간 (NT)', unit: '분' }, { id: 'a', label: '여유율 (A)', unit: '%' }], rLabel: '표준 시간 (ST)', rUnit: '분', calc: function(v) { return v.nt * (1 + v.a/100); } }] },
          { id: 'in_i19', name: 'PERT 프로젝트 기대 완료시간', icon: '⏱️', desc: '낙관, 최가능, 비관시간으로부터 평균 기대 시간(Te)을 구합니다.', formula: { text: 'Te = (o + 4m + p) / 6', vars: [] }, modes: [{ id: 'm', label: '기대시간 계산', inputs: [{ id: 'o', label: '낙관시간 (o)', unit: '일' }, { id: 'ma', label: '최가능시간 (m)', unit: '일' }, { id: 'p', label: '비관시간 (p)', unit: '일' }], rLabel: '평균 완료시간', rUnit: '일', calc: function(v) { return (v.o + 4 * v.ma + v.p) / 6; } }] }
        ]
      },
      {
        id: 'ind_logis_scm',
        name: '물류 및 SCM',
        calculators: [
          { id: 'in_i11', name: '물류 적재율', icon: '🚚', desc: '트럭 적재 용적과 화물 총용적으로부터 적재율을 산출합니다.', formula: { text: 'Rate = V_cargo / V_truck × 100', vars: [] }, modes: [{ id: 'm', label: '적재율 계산', inputs: [{ id: 'vc', label: '화물 총부피', unit: 'm³' }, { id: 'vt', label: '트럭 적재용적', unit: 'm³' }], rLabel: '용적 적재율', rUnit: '%', calc: function(v) { return v.vt ? (v.vc / v.vt) * 100 : 0; } }] },
          { id: 'in_i12', name: '재주문점 (ROP)', icon: '📦', desc: '일일 평균 수요와 조달기간, 안전재고 조건에서 ROP를 계산합니다.', formula: { text: 'ROP = d × L + ss', vars: [] }, modes: [{ id: 'm', label: 'ROP 계산', inputs: [{ id: 'd', label: '하루 평균수요 (d)', unit: '개/일' }, { id: 'l', label: '조달 기간 (L)', unit: '일' }, { id: 'ss', label: '안전 재고 (ss)', unit: '개' }], rLabel: '재주문점 (ROP)', rUnit: '개', calc: function(v) { return v.d * v.l + v.ss; } }] },
          { id: 'in_i7', name: '안전 재고량', icon: '📊', desc: '수요 표준편차와 조달기간(L)으로부터 적정 안전재고(ss)를 구합니다. (신뢰지수 Z=1.65 기준)', formula: { text: 'ss = 1.65 × s_demand × √L', vars: [] }, modes: [{ id: 'm', label: '안전재고 계산', inputs: [{ id: 's', label: '수요 표준편차', unit: '개/일' }, { id: 'l', label: '조달 기간 (L)', unit: '일' }], rLabel: '적정 안전재고', rUnit: '개', calc: function(v) { return 1.65 * v.s * Math.sqrt(v.l); } }] }
        ]
      },
      {
        id: 'ind_sys_or',
        name: '시스템 및 OR',
        calculators: [
          { id: 'in_i9', name: 'NIOSH 권장 들기제한 무게 (RWL)', icon: '🏋️', desc: '수평 및 수직 계수를 반영하여 권장 들기 제한 무게를 구합니다.', formula: { text: 'RWL = 23 × Hm × Vm (간략식)', vars: [] }, modes: [{ id: 'm', label: 'RWL 계산 (2계수 간략)', inputs: [{ id: 'hm', label: '수평 계수 (Hm)', unit: '0.25~1' }, { id: 'vm', label: '수직 계수 (Vm)', unit: '0.7~1' }], rLabel: '권장 중량 (RWL)', rUnit: 'kg', calc: function(v) { return 23 * v.hm * v.vm; } }] },
          { id: 'in_i13', name: '대기행렬 이용률 (M/M/1)', icon: '🔄', desc: '도착률(λ)과 서비스율(μ)로부터 시스템 이용률(ρ)을 구합니다.', formula: { text: 'ρ = λ / μ', vars: [] }, modes: [{ id: 'm', label: '이용률 계산', inputs: [{ id: 'l', label: '고객 도착률 (λ)', unit: '명/시간' }, { id: 'mu', label: '서비스 속도 (μ)', unit: '명/시간' }], rLabel: '시스템 이용률 (ρ)', rUnit: '', calc: function(v) { return v.mu ? v.l / v.mu : Infinity; } }] },
          { id: 'in_i14', name: '목적 함수 최대화', icon: '📐', desc: '이익 상수가 있는 2개 자원 변수의 총 이익 목적식을 구합니다.', formula: { text: 'Profit = C1×X1 + C2×X2', vars: [] }, modes: [{ id: 'm', label: '총 이익 계산', inputs: [{ id: 'c1', label: 'X1 단위이익', unit: '원' }, { id: 'x1', label: 'X1 판매량', unit: '개' }, { id: 'c2', label: 'X2 단위이익', unit: '원' }, { id: 'x2', label: 'X2 판매량', unit: '개' }], rLabel: '총 이익', rUnit: '원', calc: function(v) { return v.c1*v.x1 + v.c2*v.x2; } }] },
          { id: 'in_i15', name: 'M/M/1 평균 대기 대수', icon: '📊', desc: '이용률(ρ)로부터 대기선 내 평균 고객수(Lq)를 계산합니다.', formula: { text: 'Lq = ρ² / (1 - ρ)', vars: [] }, modes: [{ id: 'm', label: '대기 고객수 계산', inputs: [{ id: 'r', label: '이용률 (ρ)', unit: '0~0.99' }], rLabel: '평균 대기자 수', rUnit: '명', calc: function(v) { var denom = 1 - v.r; return denom > 0 ? (v.r * v.r) / denom : Infinity; } }] },
          { id: 'in_i16', name: '단일 현금 복리 미래가치', icon: '💰', desc: '현재 가치(PV), 이율, 연수로부터 복리 미래가치(FV)를 구합니다.', formula: { text: 'FV = PV × (1 + i)^n', vars: [] }, modes: [{ id: 'm', label: '미래가치 계산', inputs: [{ id: 'pv', label: '현재 가치 (PV)', unit: '원' }, { id: 'i', label: '연 이자율 (i)', unit: '%' }, { id: 'n', label: '보유 연도 (n)', unit: '년' }], rLabel: '미래 가치 (FV)', rUnit: '원', calc: function(v) { return v.pv * Math.pow(1 + (v.i/100), v.n); } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_civil',
    name: '토목공학',
    icon: '🏗️',
    color: '#d97706',
    subcategories: [
      {
        id: 'civil_math_survey',
        name: '기초수학 및 측량',
        calculators: [
          { id: 'cv_ci1', name: '이차방정식 판별식', icon: '📐', desc: 'ax² + bx + c = 0의 판별식(D)을 계산합니다.', formula: { text: 'D = b² - 4ac', vars: [] }, modes: [{ id: 'm', label: 'D 판별', inputs: [{ id: 'a', label: '계수 a', unit: '' }, { id: 'b', label: '계수 b', unit: '' }, { id: 'c', label: '계수 c', unit: '' }], rLabel: '판별식 결과', rUnit: '', calc: function(v) { return v.b*v.b - 4*v.a*v.c; } }] },
          { id: 'cv_ci12', name: '축척에 따른 좌표 보정', icon: '📏', desc: '경도/위도 좌표 기준 두 기준점 간 거리를 구합니다.', formula: { text: 'Dist = √((ΔX)² + (ΔY)²)', vars: [] }, modes: [{ id: 'm', label: '거리 산출', inputs: [{ id: 'dx', label: 'X 좌표 차이', unit: 'm' }, { id: 'dy', label: 'Y 좌표 차이', unit: 'm' }], rLabel: '거리', rUnit: 'm', calc: function(v) { return Math.sqrt(v.dx*v.dx + v.dy*v.dy); } }] },
          { id: 'cv_ci21', name: '측량 트래버스 폐합 오차', icon: '📏', desc: '트래버스 측량 측선들의 폐합 위거 오차(Δy)와 경거 오차(Δx)로부터 총 폐합 오차를 계산합니다.', formula: { text: 'Error = √((Δx)² + (Δy)²)', vars: [] }, modes: [{ id: 'm', label: '오차 계산', inputs: [{ id: 'dx', label: '경거 오차 (Δx)', unit: 'm' }, { id: 'dy', label: '위거 오차 (Δy)', unit: 'm' }], rLabel: '선형 폐합 오차', rUnit: 'm', calc: function(v) { return Math.sqrt(v.dx*v.dx + v.dy*v.dy); } }] }
        ]
      },
      {
        id: 'civil_struct_mech',
        name: '구조 및 재료역학',
        calculators: [
          { id: 'cv_ci2', name: '양단 고정 모멘트', icon: '🏗️', desc: '중앙에 하중 P가 작용하는 양단 고정보의 지점 모멘트(Ma)를 구합니다.', formula: { text: 'Ma = P × L / 8', vars: [] }, modes: [{ id: 'm', label: '모멘트 계산', inputs: [{ id: 'p', label: '하중 (P)', unit: 'kN' }, { id: 'l', label: '보 길이 (L)', unit: 'm' }], rLabel: '지점 모멘트', rUnit: 'kN·m', calc: function(v) { return (v.p * v.l) / 8; } }] },
          { id: 'cv_ci3', name: '보 단면 계수 (Rect)', icon: '📐', desc: '직사각형 단면의 굽힘 저항 단면 계수(Z)를 구합니다.', formula: { text: 'Z = b × h² / 6', vars: [] }, modes: [{ id: 'm', label: 'Z 계산', inputs: [{ id: 'b', label: '폭 (b)', unit: 'mm' }, { id: 'h', label: '높이 (h)', unit: 'mm' }], rLabel: '단면 계수 (Z)', rUnit: 'mm³', calc: function(v) { return (v.b * v.h * v.h) / 6; } }] },
          { id: 'cv_ci4', name: '보 인장 철근비', icon: '🧱', desc: '단면과 철근량으로부터 전단 배근 철근비(ρ)를 계산합니다.', formula: { text: 'ρ = As / (b × d)', vars: [] }, modes: [{ id: 'm', label: '철근비 계산', inputs: [{ id: 'as', label: '철근 총단면적 (As)', unit: 'mm²' }, { id: 'b', label: '보의 폭 (b)', unit: 'mm' }, { id: 'd', label: '유효 높이 (d)', unit: 'mm' }], rLabel: '철근비 (ρ)', rUnit: '', calc: function(v) { var denom = v.b * v.d; return denom ? v.as / denom : Infinity; } }] },
          { id: 'cv_ci5', name: '강재 허용 인장하중', icon: '🏗️', desc: '강재의 순단면적과 허용 인장응력으로부터 인장 용량을 구합니다.', formula: { text: 'P = An × σ_allow', vars: [] }, modes: [{ id: 'm', label: '허용하중 계산', inputs: [{ id: 'an', label: '순단면적 (An)', unit: 'mm²' }, { id: 'sa', label: '허용 응력', unit: 'MPa' }], rLabel: '허용 하중', rUnit: 'kN', calc: function(v) { return (v.an * v.sa) / 1000; } }] },
          { id: 'cv_ci6', name: '도로교 충격계수 (i)', icon: '🌉', desc: '지간 길이(L)로부터 주형 설계 시 사용되는 차량 하중의 충격계수(i)를 산출합니다.', formula: { text: 'i = 15 / (40 + L) (최대 0.3)', vars: [] }, modes: [{ id: 'm', label: '충격계수 계산', inputs: [{ id: 'l', label: '경간 지간장 (L)', unit: 'm' }], rLabel: '충격계수 (i)', rUnit: '', calc: function(v) { var val = 15 / (40 + v.l); return Math.min(val, 0.3); } }] },
          { id: 'cv_ci22', name: '보 단면 전단응력', icon: '📐', desc: '가해진 전단 하중(V)과 보의 단면적으로부터 직사각형 단면 평균 전단응력(τ)을 구합니다.', formula: { text: 'τ = 1.5 × V / A', vars: [] }, modes: [{ id: 'm', label: '전단응력 계산', inputs: [{ id: 'v', label: '전단 하중 (V)', unit: 'kN' }, { id: 'a', label: '단면적 (A)', unit: 'mm²' }], rLabel: '평균 전단응력', rUnit: 'MPa', calc: function(v) { return v.a ? 1.5 * (v.v * 1000) / v.a : Infinity; } }] }
        ]
      },
      {
        id: 'civil_soil_foundation',
        name: '토질 및 기초',
        calculators: [
          { id: 'cv_ci7', name: '흙의 간극비 (Void Ratio)', icon: '🧱', desc: '흙 입자 체적과 내부 간극 체적으로부터 간극비(e)를 구합니다.', formula: { text: 'e = Vv / Vs', vars: [] }, modes: [{ id: 'm', label: '간극비 계산', inputs: [{ id: 'vv', label: '간극 부피 (Vv)', unit: 'cm³' }, { id: 'vs', label: '흙입자 부피 (Vs)', unit: 'cm³' }], rLabel: '간극비 (e)', rUnit: '', calc: function(v) { return v.vs ? v.vv / v.vs : Infinity; } }] },
          { id: 'cv_ci8', name: '말뚝 지지력 (Sander 식)', icon: '🏗️', desc: '말뚝 타격 시험 결과로부터 동역학적 지지력(Ra)을 구합니다.', formula: { text: 'Ra = W × H / (6 × s)', vars: [] }, modes: [{ id: 'm', label: '허용지지력 계산', inputs: [{ id: 'w', label: '해머 중량 (W)', unit: 'kN' }, { id: 'h', label: '해머 낙하높이 (H)', unit: 'm' }, { id: 's', label: '최종 관입량 (s)', unit: 'mm' }], rLabel: '허용 지지력', rUnit: 'kN', calc: function(v) { var s_m = v.s / 1000; var denom = s_m * 6; return denom ? (v.w * v.h) / denom : Infinity; } }] },
          { id: 'cv_ci15', name: '지반 굴착 RMR 분류 가중치', icon: '🧱', desc: '압축강도, RQD 등 항목의 합산 RMR 점수를 도출합니다.', formula: { text: 'RMR = Sum(Scores)', vars: [] }, modes: [{ id: 'm', label: 'RMR 합산', inputs: [{ id: 'rqd', label: 'RQD 점수 (3~20)', unit: '' }, { id: 'jc', label: '절리 상태 점수 (0~30)', unit: '' }, { id: 'gw', label: '지하수 상태 점수 (0~15)', unit: '' }], rLabel: 'RMR 총합', rUnit: '점', calc: function(v) { return v.rqd + v.jc + v.gw; } }] },
          { id: 'cv_ci23', name: '점토 지반 1차 압밀침하량', icon: '🧱', desc: '점토층 두께(H), 초기간극비(e0) 및 압축지수(Cc)로부터 침하량을 계산합니다.', formula: { text: 'Sc = H × (Cc / (1 + e0)) × log10(P_final / P_initial)', vars: [] }, modes: [{ id: 'm', label: '침하량 계산', inputs: [{ id: 'h', label: '점토층 두께 (H)', unit: 'm' }, { id: 'cc', label: '압축 지수 (Cc)', unit: '' }, { id: 'e0', label: '초기 간극비 (e0)', unit: '' }, { id: 'pi', label: '초기 유효상부압', unit: 'kPa' }, { id: 'pf', label: '압밀 완료후 유효압', unit: 'kPa' }], rLabel: '최종 압밀침하량 (Sc)', rUnit: 'cm', calc: function(v) { if (v.pi <= 0 || (1 + v.e0) === 0) return 0; return v.h * (v.cc / (1 + v.e0)) * Math.log10(v.pf / v.pi) * 100; } }] }
        ]
      },
      {
        id: 'civil_water_river',
        name: '수리 및 하천',
        calculators: [
          { id: 'cv_ci9', name: '매닝의 평균 유속 공식', icon: '🌊', desc: '개수로 조도 계수, 경사, 경심으로부터 평균 유속(V)을 구합니다.', formula: { text: 'V = (1/n) × R^(2/3) × I^(1/2)', vars: [] }, modes: [{ id: 'm', label: '유속 계산', inputs: [{ id: 'n', label: '조도 계수 (n)', unit: '' }, { id: 'r', label: '경심 (R)', unit: 'm' }, { id: 'i', label: '수로 경사 (I)', unit: 'Decimal' }], rLabel: '평균 유속 (V)', rUnit: 'm/s', calc: function(v) { return v.n ? (1 / v.n) * Math.pow(v.r, 2/3) * Math.sqrt(v.i) : Infinity; } }] },
          { id: 'cv_ci10', name: '합리식을 이용한 우수 유출량', icon: '🌧️', desc: '유출 계수, 강우 강도, 유역 면적으로부터 첨두 유출량(Q)을 산출합니다.', formula: { text: 'Q = 1/360 × C × I × A', vars: [] }, modes: [{ id: 'm', label: '첨두 유출량', inputs: [{ id: 'c', label: '유출 계수 (C)', unit: '0~1' }, { id: 'ir', label: '강우 강도 (I)', unit: 'mm/hr' }, { id: 'a', label: '유역 면적 (A)', unit: 'ha' }], rLabel: '유출량 (Q)', rUnit: 'm³/s', calc: function(v) { return (v.c * v.ir * v.a) / 360; } }] },
          { id: 'cv_ci11', name: '하수관 유속', icon: '💧', desc: '원형 관 내부 만류 시 유속을 구합니다.', formula: { text: 'v = Q / A', vars: [] }, modes: [{ id: 'm', label: '유속 계산', inputs: [{ id: 'q', label: '유량', unit: 'm³/s' }, { id: 'd', label: '관경', unit: 'mm' }], rLabel: '유속 (v)', rUnit: 'm/s', calc: function(v) { var A = Math.PI * Math.pow(v.d / 2000, 2); return A ? v.q / A : Infinity; } }] },
          { id: 'cv_ci24', name: '다시의 법칙 지하수 침투유속', icon: '🌊', desc: '투수계수(k)와 수두구배(i)로부터 지중 지하수 유속(v)을 구합니다.', formula: { text: 'v = k × i', vars: [] }, modes: [{ id: 'm', label: '침투유속 계산', inputs: [{ id: 'k', label: '투수 계수 (k)', unit: 'cm/s' }, { id: 'hyd_grad', label: '수두 구배 (i)', unit: '' }], rLabel: '지하수 유속', rUnit: 'cm/s', calc: function(v) { return v.k * v.hyd_grad; } }] }
        ]
      },
      {
        id: 'civil_road_port',
        name: '도로 및 항만',
        calculators: [
          { id: 'cv_ci13', name: '도로 평면 완화곡선 탈선 편심', icon: '🛣️', desc: '설계 속도와 도로 반지름으로부터 평면 완화곡선 횡방향 중력 가속도를 산출합니다.', formula: { text: 'a = v² / R', vars: [] }, modes: [{ id: 'm', label: '가속도 계산', inputs: [{ id: 'v', label: '차량 속도', unit: 'm/s' }, { id: 'r', label: '곡선 반지름', unit: 'm' }], rLabel: '횡가속도', rUnit: 'm/s²', calc: function(v) { return v.r ? (v.v * v.v) / v.r : Infinity; } }] },
          { id: 'cv_ci14', name: '철도 캔트 (Cant)', icon: '🛤️', desc: '설계 속도와 곡선 반지름으로부터 철도 궤도 안쪽과 바깥쪽 높이차(캔트)를 계산합니다.', formula: { text: 'C = G × v² / (g × R)', vars: [] }, modes: [{ id: 'm', label: '캔트 높이 계산', inputs: [{ id: 'v', label: '열차 속도', unit: 'm/s' }, { id: 'r', label: '곡선 반경 (R)', unit: 'm' }, { id: 'g_gauge', label: '궤간 (G)', unit: 'mm' }], rLabel: '필요 캔트 (C)', rUnit: 'mm', calc: function(v) { var denom = 9.81 * v.r; return denom ? (v.g_gauge * v.v * v.v) / denom : Infinity; } }] },
          { id: 'cv_ci16', name: '파랑 속도 (심해파)', icon: '🌊', desc: '주기(T)로부터 이론 심해파 속도(C0)를 구합니다.', formula: { text: 'C0 = g × T / 2π', vars: [] }, modes: [{ id: 'm', label: '파속 계산', inputs: [{ id: 't', label: '파랑 주기 (T)', unit: 's' }], rLabel: '심해 파속 (C0)', rUnit: 'm/s', calc: function(v) { return (9.81 * v.t) / (2 * Math.PI); } }] },
          { id: 'cv_ci25', name: '도로 최소 정지시거', icon: '🛣️', desc: '설계 속도와 노면 종단 경사, 마찰 계수 기준 정지 제동 주행 시거(S)를 계산합니다.', formula: { text: 'S = 0.278×V×t + V² / (254 × f)', vars: [] }, modes: [{ id: 'm', label: '정지시거 계산', inputs: [{ id: 'v', label: '차량 설계속도', unit: 'km/h' }, { id: 't_react', label: '인지반응 시간', unit: 's' }, { id: 'f_fric', label: '종방향 마찰계수', unit: '' }], rLabel: '최소 필요 정지시거', rUnit: 'm', calc: function(v) { return 0.278 * v.v * v.t_react + (v.v * v.v) / (254 * v.f_fric); } }] }
        ]
      },
      {
        id: 'civil_construction_mgmt',
        name: '시공 및 건설관리',
        calculators: [
          { id: 'cv_ci17', name: '덤프트럭 일일 작업량', icon: '🚚', desc: '트럭 적재 용적과 사이클 시간으로부터 생산량을 계산합니다.', formula: { text: 'Q = (V × 60 × E) / Cm', vars: [] }, modes: [{ id: 'm', label: '작업량 계산', inputs: [{ id: 'vol', label: '트럭 용적 (V)', unit: 'm³' }, { id: 'e', label: '작업 효율 (E)', unit: '0~1' }, { id: 'cm', label: '사이클 시간 (Cm)', unit: '분' }], rLabel: '시간당 생산량', rUnit: 'm³/h', calc: function(v) { return v.cm ? (v.vol * 60 * v.e) / v.cm : Infinity; } }] },
          { id: 'cv_ci18', name: '공정 진척 차이 (SV)', icon: '📊', desc: '기성고 분석을 통해 획득가치(EV)와 계획가치(PV) 차이로부터 진척 차이(SV)를 구합니다.', formula: { text: 'SV = EV - PV', vars: [] }, modes: [{ id: 'm', label: 'SV 계산', inputs: [{ id: 'ev', label: '획득 가치 (EV)', unit: '원' }, { id: 'pv', label: '계획 가치 (PV)', unit: '원' }], rLabel: '일정 차이 (SV)', rUnit: '원', calc: function(v) { return v.ev - v.pv; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_architectural',
    name: '건축공학',
    icon: '🏢',
    color: '#059669',
    subcategories: [
      {
        id: 'arch_struct_materials',
        name: '건축구조 및 재료',
        calculators: [
          { id: 'ar_a1', name: '기둥 임계 오일러 하중', icon: '📐', desc: '오일러 공식을 이용해 기둥 좌굴 한계 하중을 계산합니다.', formula: { text: 'P = π² × EI / L²', vars: [] }, modes: [{ id: 'm', label: '임계하중 계산', inputs: [{ id: 'e', label: '탄성계수 (E)', unit: 'GPa' }, { id: 'i', label: '단면 2차모멘트 (I)', unit: 'mm⁴' }, { id: 'l', label: '기둥 길이 (L)', unit: 'mm' }], rLabel: '임계 좌굴하중', rUnit: 'N', calc: function(v) { var denom = v.l * v.l; return denom ? (Math.PI * Math.PI * (v.e * 1000) * v.i) / denom : Infinity; } }] },
          { id: 'ar_a2', name: '설계 하중 조합 (고정+활)', icon: '🏢', desc: '한국 건축 규정 계수 기준 극한 설계 하중(U)을 계산합니다.', formula: { text: 'U = 1.2 × D + 1.6 × L', vars: [] }, modes: [{ id: 'm', label: '하중 조합', inputs: [{ id: 'd', label: '고정 하중 (D)', unit: 'kN/m²' }, { id: 'l', label: '활 하중 (L)', unit: 'kN/m²' }], rLabel: '설계 하중 (U)', rUnit: 'kN/m²', calc: function(v) { return 1.2 * v.d + 1.6 * v.l; } }] },
          { id: 'ar_a3', name: '콘크리트 파괴 계수 (fr)', icon: '🧱', desc: '콘크리트 설계 강도로부터 균열 모멘트 계산용 파괴 계수(fr)를 산출합니다.', formula: { text: 'fr = 0.63 × √(fck)', vars: [] }, modes: [{ id: 'm', label: '파괴 계수 계산', inputs: [{ id: 'fck', label: '설계기준 강도 (fck)', unit: 'MPa' }], rLabel: '파괴 계수 (fr)', rUnit: 'MPa', calc: function(v) { return v.fck >= 0 ? 0.63 * Math.sqrt(v.fck) : 0; } }] },
          { id: 'ar_a4', name: 'H빔 단면적 비율 중량', icon: '🏗️', desc: 'H형강의 플랜지, 웨브 치수로 전체 단면적을 계산합니다.', formula: { text: 'A = 2×b×tf + (h - 2tf)×tw', vars: [] }, modes: [{ id: 'm', label: '단면적 계산', inputs: [{ id: 'h', label: '전체 높이 (H)', unit: 'mm' }, { id: 'b', label: '플랜지 폭 (B)', unit: 'mm' }, { id: 'tf', label: '플랜지 두께 (tf)', unit: 'mm' }, { id: 'tw', label: '웨브 두께 (tw)', unit: 'mm' }], rLabel: '단면적', rUnit: 'mm²', calc: function(v) { return 2 * v.b * v.tf + (v.h - 2 * v.tf) * v.tw; } }] },
          { id: 'ar_a5', name: '벽체 열관류율 (U-Value)', icon: '🧱', desc: '각 층의 두께와 전도도 조건에서 벽체 총 열관류율(U)을 계산합니다.', formula: { text: 'U = 1 / (Ro + R1 + R2 + Ri)', vars: [] }, modes: [{ id: 'm', label: '열관류율 계산', inputs: [{ id: 'r1', label: '벽체 내장 단열재 열저항', unit: 'm²·K/W' }, { id: 'r2', label: '외장 벽체 콘크리트 열저항', unit: 'm²·K/W' }], rLabel: '열관류율 (U)', rUnit: 'W/m²·K', calc: function(v) { var total_r = 0.11 + v.r1 + v.r2 + 0.04; return total_r ? 1 / total_r : Infinity; } }] },
          { id: 'ar_a12', name: '등가 정적 지진 전단력 (V)', icon: '🏢', desc: '건축물 전체 중량과 설계 지진가속도 계수로부터 지진 전단력을 구합니다.', formula: { text: 'V = Cs × W', vars: [] }, modes: [{ id: 'm', label: '지진 전단력 계산', inputs: [{ id: 'cs', label: '지진 응답계수 (Cs)', unit: '' }, { id: 'w', label: '건물 유효 중량 (W)', unit: 'kN' }], rLabel: '지진 전단력 (V)', rUnit: 'kN', calc: function(v) { return v.cs * v.w; } }] },
          { id: 'ar_a13', name: '설계 풍하중 계산', icon: '🌬️', desc: '동적 외력 설계 적용을 위한 가스트 영향 계수 평균 설계 기압을 산출합니다.', formula: { text: 'F = A × q × Gf', vars: [] }, modes: [{ id: 'm', label: '설계 풍하중 계산', inputs: [{ id: 'a', label: '수풍 면적', unit: 'm²' }, { id: 'q', label: '설계 속도압', unit: 'Pa' }, { id: 'gf', label: '가스트 계수 (Gf)', unit: '1.5~2.2' }], rLabel: '설계 풍하중', rUnit: 'N', calc: function(v) { return v.a * v.q * v.gf; } }] }
        ]
      },
      {
        id: 'arch_env_facility',
        name: '건축환경 및 설비',
        calculators: [
          { id: 'ar_a6', name: '소음 레벨 데시벨 합성', icon: '🔊', desc: '두 소음원(L1, L2)이 동시에 작동할 때의 합성 소음도를 구합니다.', formula: { text: 'L = 10 × log10(10^(L1/10) + 10^(L2/10))', vars: [] }, modes: [{ id: 'm', label: '소음 합성 계산', inputs: [{ id: 'l1', label: '소음원 1', unit: 'dB' }, { id: 'l2', label: '소음원 2', unit: 'dB' }], rLabel: '합성 소음 레벨', rUnit: 'dB', calc: function(v) { return 10 * Math.log10(Math.pow(10, v.l1/10) + Math.pow(10, v.l2/10)); } }] },
          { id: 'ar_a7', name: '실내 필요 환기량', icon: '🌬️', desc: '허용 이산화탄소 농도 기준실내 인원당 필요 풍량을 계산합니다.', formula: { text: 'Q = q_co2 / (Cp - C0)', vars: [] }, modes: [{ id: 'm', label: '환기량 계산', inputs: [{ id: 'n', label: '실내 거주 인원', unit: '명' }, { id: 'co2_limit', label: '허용 CO2 농도', unit: 'ppm' }], rLabel: '필요 풍량', rUnit: 'm³/h', calc: function(v) { var denom = (v.co2_limit - 400) * 1e-6; return denom > 0 ? (v.n * 0.02) / denom : Infinity; } }] },
          { id: 'ar_a8', name: '실내 현열 쾌적 온도 부하', icon: '🔥', desc: '외기 유입 환기 온도차로부터 열 손실 부하를 계산합니다.', formula: { text: 'Qs = 1.2 × Q_air × ΔT', vars: [] }, modes: [{ id: 'm', label: '난방 부하', inputs: [{ id: 'q', label: '송풍량 (Q)', unit: 'm³/h' }, { id: 'dt', label: '온도차 (ΔT)', unit: '°C' }], rLabel: '현열 부하', rUnit: 'W', calc: function(v) { return (1.2 / 3.6) * v.q * v.dt; } }] },
          { id: 'ar_a9', name: '덕트 마찰 압력 손실', icon: '🌬️', desc: '덕트 길이와 직경 유속으로부터 공조 덕트 손실을 구합니다.', formula: { text: 'dP = λ × (L/D) × (ρv²/2)', vars: [] }, modes: [{ id: 'm', label: '압력손실 계산', inputs: [{ id: 'l', label: '덕트 길이', unit: 'm' }, { id: 'd', label: '덕트 내경', unit: 'mm' }, { id: 'v', label: '송풍 속도', unit: 'm/s' }], rLabel: '압력 손실', rUnit: 'Pa', calc: function(v) { var D = v.d / 1000; return D ? (0.02 * (v.l / D) * (1.2 * v.v * v.v / 2)) : Infinity; } }] },
          { id: 'ar_a10', name: '실내 소요 등기구 수', icon: '💡', desc: '목표 조도, 실 면적, 등기구 광속으로부터 필요 등수(N)를 구합니다.', formula: { text: 'N = E × A / (F × U × M)', vars: [] }, modes: [{ id: 'm', label: '등기구 수 계산', inputs: [{ id: 'e', label: '목표 설계 조도', unit: 'lux' }, { id: 'w', label: '실 가로 크기', unit: 'm' }, { id: 'l', label: '실 세로 크기', unit: 'm' }, { id: 'f', label: '등기구 당 광속', unit: 'lm' }], rLabel: '소요 등기구 수', rUnit: '개', calc: function(v) { var denom = v.f * 0.5 * 0.8; return denom ? (v.e * (v.w * v.l)) / denom : Infinity; } }] },
          { id: 'ar_a11', name: '실내 잔향 시간 (Sabine)', icon: '🔊', desc: '실의 체적과 총 흡음력으로부터 잔향 시간(RT60)을 계산합니다.', formula: { text: 'RT60 = 0.161 × V / A', vars: [] }, modes: [{ id: 'm', label: '잔향시간 계산', inputs: [{ id: 'vol', label: '실 체적 (V)', unit: 'm³' }, { id: 'a', label: '총 흡음력 (A)', unit: 'm²' }], rLabel: '잔향 시간', rUnit: '초 (s)', calc: function(v) { return v.a ? (0.161 * v.vol) / v.a : Infinity; } }] }
        ]
      },
      {
        id: 'arch_const_bim',
        name: '시공 및 법규/BIM',
        calculators: [
          { id: 'ar_a14', name: '콘크리트 거푸집 측압', icon: '🧱', desc: '콘크리트 타설 높이 및 자중에 의한 하부 거푸집 최대 측압(P)을 계산합니다.', formula: { text: 'P = ρ × g × H', vars: [] }, modes: [{ id: 'm', label: '최대 측압 계산', inputs: [{ id: 'h', label: '타설 높이 (H)', unit: 'm' }], rLabel: '거푸집 최대측압', rUnit: 'kPa', calc: function(v) { return 23.5 * v.h; } }] },
          { id: 'ar_a15', name: '건축물 건폐율', icon: '🏢', desc: '대지면적 and 건축면적 정보로부터 건폐율을 구합니다.', formula: { text: 'Ratio = A_build / A_site × 100', vars: [] }, modes: [{ id: 'm', label: '건폐율 계산', inputs: [{ id: 'ab', label: '건축 면적', unit: 'm²' }, { id: 'as', label: '대지 면적', unit: 'm²' }], rLabel: '건폐율', rUnit: '%', calc: function(v) { return v.as ? (v.ab / v.as) * 100 : 0; } }] },
          { id: 'ar_a16', name: 'BIM 모델링 파일 크기', icon: '📏', desc: 'BIM 기하 부재 개수로부터 설계 파일 용량을 대략 예측합니다.', formula: { text: 'Size ≈ Count × 50', vars: [] }, modes: [{ id: 'm', label: '파일 용량 예측', inputs: [{ id: 'c', label: '부재 개수 (Count)', unit: '천개' }], rLabel: '예상 파일 크기', rUnit: 'MB', calc: function(v) { return v.c * 50; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_environmental',
    name: '환경공학',
    icon: '🌱',
    color: '#16a34a',
    subcategories: [
      {
        id: 'env_basics_chem',
        name: '기초 및 화학환경',
        calculators: [
          { id: 'en_ev1', name: '수소 이온 지수 (pH)', icon: '🧪', desc: '수소이온 농도로부터 수소 지수를 구합니다.', formula: { text: 'pH = -log10([H+])', vars: [] }, modes: [{ id: 'm', label: 'pH 구하기', inputs: [{ id: 'h', label: '[H+] 농도', unit: 'mol/L' }], rLabel: 'pH', rUnit: '', calc: function(v) { return v.h > 0 ? -Math.log10(v.h) : 7; } }] },
          { id: 'en_ev2', name: '미생물 비성장 속도 (Monod)', icon: '🔬', desc: '기질 농도로부터 모노드 미생물 성장 모델 비속도를 구합니다.', formula: { text: 'μ = μmax × S / (Ks + S)', vars: [] }, modes: [{ id: 'm', label: '성장속도 μ 계산', inputs: [{ id: 'm', label: '최대비성장속도 (μmax)', unit: '/hr' }, { id: 's', label: '제한기질 농도 (S)', unit: 'mg/L' }, { id: 'ks', label: '포화 정수 (Ks)', unit: 'mg/L' }], rLabel: '비성장 속도 (μ)', rUnit: '/hr', calc: function(v) { var denom = v.ks + v.s; return denom ? (v.m * v.s) / denom : 0; } }] },
          { id: 'en_ev11', name: '분광 광도계 흡광률', icon: '🔬', desc: '투과 광량과 입사 광량 비의 로그를 산출합니다.', formula: { text: 'A = log10(I0 / I)', vars: [] }, modes: [{ id: 'm', label: '흡광도 계산', inputs: [{ id: 'i0', label: '입사 광량', unit: 'lm' }, { id: 'i', label: '투과 광량', unit: 'lm' }], rLabel: '흡광도 (A)', rUnit: '', calc: function(v) { return v.i > 0 ? Math.log10(v.i0 / v.i) : Infinity; } }] },
          { id: 'en_ev12', name: '독성 위해도 지수 (HQ)', icon: '⚠️', desc: '일일 화학 노출량과 기준 노출 기준치로부터 HQ 위해 비를 계산합니다.', formula: { text: 'HQ = ADD / RfD', vars: [] }, modes: [{ id: 'm', label: '위해도 지수 계산', inputs: [{ id: 'add', label: '일일 섭취 노출량', unit: 'mg/kg·day' }, { id: 'rfd', label: '독성 기준 선량', unit: 'mg/kg·day' }], rLabel: '위해도 지수 (HQ)', rUnit: '', calc: function(v) { return v.rfd ? v.add / v.rfd : Infinity; } }] }
        ]
      },
      {
        id: 'env_water_air',
        name: '수질 및 대기',
        calculators: [
          { id: 'en_ev3', name: '활성슬러지 F/M 비', icon: '💧', desc: '폭기조의 유기물 부하율인 F/M 비를 계산합니다.', formula: { text: 'FM = Q × BOD / (V × MLSS)', vars: [] }, modes: [{ id: 'm', label: 'F/M 비 계산', inputs: [{ id: 'q', label: '유입 유량', unit: 'm³/day' }, { id: 'bod', label: '유입 BOD', unit: 'mg/L' }, { id: 'v', label: '폭기조 부피', unit: 'm³' }, { id: 'mlss', label: '폭기조 MLSS', unit: 'mg/L' }], rLabel: 'F/M 비', rUnit: 'kg-BOD/kg-MLSS·day', calc: function(v) { var denom = v.v * v.mlss; return denom ? (v.q * v.bod) / denom : Infinity; } }] },
          { id: 'en_ev4', name: '가스 세정탑 가스 제거효율', icon: '🌪️', desc: '세정전 유해 가스 농도 대비 처리 후 배출 가스 효율을 산출합니다.', formula: { text: 'η = (Cin - Cout) / Cin × 100', vars: [] }, modes: [{ id: 'm', label: '제거 효율 계산', inputs: [{ id: 'ci', label: '유입 가스농도', unit: 'ppm' }, { id: 'co', label: '배출 가스농도', unit: 'ppm' }], rLabel: '제거 효율', rUnit: '%', calc: function(v) { return v.ci ? ((v.ci - v.co) / v.ci) * 100 : 0; } }] },
          { id: 'en_ev10', name: '하수관 설계 유량', icon: '💧', desc: '계획 하수 관거의 단면 치수 기준 유량을 계산합니다.', formula: { text: 'Q = A × v', vars: [] }, modes: [{ id: 'm', label: '유량 계산', inputs: [{ id: 'a', label: '통수 단면적', unit: 'm²' }, { id: 'v', label: '평균 유속', unit: 'm/s' }], rLabel: '설계 유량', rUnit: 'm³/s', calc: function(v) { return v.a * v.v; } }] }
        ]
      },
      {
        id: 'env_waste_soil',
        name: '폐기물 및 토양',
        calculators: [
          { id: 'en_ev5', name: '폐기물 연소 수분 함량률', icon: '🗑️', desc: '습윤 시료와 건조 시료 무게비로부터 수분비를 구합니다.', formula: { text: 'W = (W_wet - W_dry) / W_wet × 100', vars: [] }, modes: [{ id: 'm', label: '수분 함량 계산', inputs: [{ id: 'ww', label: '습윤 무게', unit: 'g' }, { id: 'wd', label: '건조 무게', unit: 'g' }], rLabel: '수분 함량', rUnit: '%', calc: function(v) { return v.ww ? ((v.ww - v.wd) / v.ww) * 100 : 0; } }] },
          { id: 'en_ev6', name: '토양 통수 다공성 공극률', icon: '🌱', desc: '토양의 전체 체적 대비 공극(빈틈) 체적의 비율을 구합니다.', formula: { text: 'n = Vv / Vt × 100', vars: [] }, modes: [{ id: 'm', label: '공극률 계산', inputs: [{ id: 'vv', label: '공극 체적', unit: 'cm³' }, { id: 'vt', label: '전체 체적', unit: 'cm³' }], rLabel: '공극률 (n)', rUnit: '%', calc: function(v) { return v.vt ? (v.vv / v.vt) * 100 : 0; } }] }
        ]
      },
      {
        id: 'env_phys_thermo',
        name: '물리환경 및 열역학',
        calculators: [
          { id: 'en_ev7', name: '점소음원 거리 감쇠 레벨', icon: '🔊', desc: '역제곱 법칙에 의한 소음원 거리 기준 데시벨 감쇠량을 산출합니다.', formula: { text: 'L2 = L1 - 20 × log10(r2 / r1)', vars: [] }, modes: [{ id: 'm', label: '거리 감쇠 계산', inputs: [{ id: 'l1', label: '기존 소음도', unit: 'dB' }, { id: 'r1', label: '기존 거리', unit: 'm' }, { id: 'r2', label: '목표 측정거리', unit: 'm' }], rLabel: '최종 감쇠 소음도', rUnit: 'dB', calc: function(v) { return (v.r1 > 0 && v.r2 > 0) ? v.l1 - 20 * Math.log10(v.r2 / v.r1) : v.l1; } }] },
          { id: 'en_ev8', name: '대기 연돌(굴뚝) 가스 상승고', icon: '🌬️', desc: '굴뚝 토출 가스 온도차 및 풍속에 따른 대기 상승 높이를 대략 계산합니다.', formula: { text: 'dh = 1.5 × (v / u) × D', vars: [] }, modes: [{ id: 'm', label: '가스 상승고 계산', inputs: [{ id: 'v', label: '가스 토출속도', unit: 'm/s' }, { id: 'u', label: '풍속', unit: 'm/s' }, { id: 'd', label: '굴뚝 직경', unit: 'm' }], rLabel: '연기 상승고', rUnit: 'm', calc: function(v) { return v.u ? 1.5 * (v.v / v.u) * v.d : 0; } }] },
          { id: 'en_ev9', name: '환경 화학평형 상수 (Kp)', icon: '🔥', desc: '깁스 에너지를 이용해 가스 가역 화학 평형에 필요한 평형상수 Kp를 산출합니다.', formula: { text: 'Kp = exp(-ΔG0 / RT)', vars: [] }, modes: [{ id: 'm', label: '평형상수 Kp 계산', inputs: [{ id: 'dg', label: '표준 깁스에너지', unit: 'kJ/mol' }, { id: 't', label: '절대 온도 (T)', unit: 'K' }], rLabel: '평형 상수 (Kp)', rUnit: '', calc: function(v) { return v.t ? Math.exp(-(v.dg * 1000) / (8.314 * v.t)) : 0; } }] }
        ]
      },
      {
        id: 'env_model_eval',
        name: '모델링 및 평가',
        calculators: [
          { id: 'en_ev13', name: '하천 산소 부족량 (Streeter-Phelps)', icon: '🐟', desc: '하천 자정 작용에 따른 특정 하류 지점의 용존 산소 부족량(D)을 계산합니다.', formula: { text: 'D = K_re × L0 (간략식)', vars: [] }, modes: [{ id: 'm', label: '산소 부족 계산 (간략)', inputs: [{ id: 'k', label: '탈산소 계수', unit: '/day' }, { id: 'l0', label: '초기 유기물농도', unit: 'mg/L' }], rLabel: '산소 소비률', rUnit: 'mg/L·day', calc: function(v) { return v.k * v.l0; } }] },
          { id: 'en_ev14', name: '종합 오염 평가 가중치 합', icon: '📋', desc: '수질, 대기, 폐기물의 개별 지수와 가중치로부터 총합 점수를 구합니다.', formula: { text: 'Score = w1×S1 + w2×S2 + w3×S3', vars: [] }, modes: [{ id: 'm', label: '총점 계산', inputs: [{ id: 's1', label: '수질 지수', unit: '점' }, { id: 's2', label: '대기 지수', unit: '점' }, { id: 'w1', label: '수질 가중치', unit: '0~1' }, { id: 'w2', label: '대기 가중치', unit: '0~1' }], rLabel: '종합 위해 점수', rUnit: '점', calc: function(v) { return v.s1 * v.w1 + v.s2 * v.w2; } }] },
          { id: 'en_ev15', name: '탄소중립 온실가스 CO2 배출량', icon: '🏭', desc: '에너지 연료 연소량 및 배출 계수로부터 이산화탄소 배출 총량을 계산합니다.', formula: { text: 'CO2 = Fuel × EF', vars: [] }, modes: [{ id: 'm', label: 'CO2 배출량 계산', inputs: [{ id: 'f', label: '연료 연소 사용량', unit: 'ton' }, { id: 'ef', label: '배출 계수 (EF)', unit: 'tCO2/t' }], rLabel: '이산화탄소 배출량', rUnit: 'tCO2', calc: function(v) { return v.f * v.ef; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_bio',
    name: '생명공학',
    icon: '🧬',
    color: '#db2777',
    subcategories: [
      {
        id: 'bio_basics_biochem',
        name: '기초생물 및 생화학',
        calculators: [
          { id: 'bi_b1', name: '하디-바인베르크 대립유전자', icon: '🧬', desc: '단일 우성 유전자 빈도 p로부터 헤테로 이형접합체 빈도(2pq)를 산출합니다.', formula: { text: '2pq = 2 × p × (1 - p)', vars: [] }, modes: [{ id: 'm', label: '이형접합체 빈도', inputs: [{ id: 'p', label: '대립유전자 빈도 (p)', unit: '0~1' }], rLabel: '헤테로 빈도 (2pq)', rUnit: '', calc: function(v) { return 2 * v.p * (1 - v.p); } }] },
          { id: 'bi_b2', name: '완충 용액 pH (Henderson)', icon: '🧪', desc: '산해리상수(pKa) 및 짝염기와 약산의 몰 비로부터 완충용액 pH를 구합니다.', formula: { text: 'pH = pKa + log10([A-] / [HA])', vars: [] }, modes: [{ id: 'm', label: 'pH 계산', inputs: [{ id: 'pka', label: '산 해리상수 (pKa)', unit: '' }, { id: 'base', label: '짝염기 농도 [A-]', unit: 'M' }, { id: 'acid', label: '약산 농도 [HA]', unit: 'M' }], rLabel: '완충액 pH', rUnit: '', calc: function(v) { return v.acid > 0 && v.base > 0 ? v.pka + Math.log10(v.base / v.acid) : v.pka; } }] },
          { id: 'bi_b3', name: 'DNA 이중나선 융해 온도 (Tm)', icon: '🧬', desc: '올리고뉴클레오티드 염기 개수(AT, GC)로부터 Tm 용융해 온도를 계산합니다.', formula: { text: 'Tm = 2(A+T) + 4(G+C)', vars: [] }, modes: [{ id: 'm', label: 'Tm 계산 (간략)', inputs: [{ id: 'at', label: 'A+T 염기 개수', unit: '개' }, { id: 'gc', label: 'G+C 염기 개수', unit: '개' }], rLabel: '융해 온도 (Tm)', rUnit: '°C', calc: function(v) { return 2 * v.at + 4 * v.gc; } }] },
          { id: 'bi_b4', name: '세포 배가 시간 (Doubling Time)', icon: '🧫', desc: '배양 관찰 시간 및 세포 증식수로부터 세포 분열 주기 배가 시간을 구합니다.', formula: { text: 'Td = t × ln(2) / ln(N / N0)', vars: [] }, modes: [{ id: 'm', label: '배가시간 계산', inputs: [{ id: 't', label: '배양 시간 (t)', unit: 'hour' }, { id: 'n0', label: '초기 세포 수', unit: '개' }, { id: 'n', label: '최종 세포 수', unit: '개' }], rLabel: '배가 시간 (Td)', rUnit: '시간 (h)', calc: function(v) { if (v.n <= v.n0 || v.n0 <= 0) return Infinity; return (v.t * Math.log(2)) / Math.log(v.n / v.n0); } }] },
          { id: 'bi_b5', name: '희석 평판법 미생물 CFU 농도', icon: '🧫', desc: '희석배수와 평판 콜로니 수로부터 원액 내의 집락형성단위(CFU/mL) 농도를 계산합니다.', formula: { text: 'CFU/mL = Colonies × Dilution_Factor / Vol', vars: [] }, modes: [{ id: 'm', label: 'CFU 농도 계산', inputs: [{ id: 'col', label: '콜로니 수', unit: '개' }, { id: 'df', label: '희석 배수 (10^N)', unit: '배' }, { id: 'vol', label: '접종 부피', unit: 'mL' }], rLabel: '미생물 농도', rUnit: 'CFU/mL', calc: function(v) { return v.vol ? (v.col * v.df) / v.vol : Infinity; } }] },
          { id: 'bi_b13', name: '항원-항체 친화성 상수 (Ka)', icon: '🧬', desc: '평형 반응 결합속도와 해리속도 상수비로부터 친화도(Ka)를 구합니다.', formula: { text: 'Ka = kon / koff', vars: [] }, modes: [{ id: 'm', label: '친화성 상수 Ka', inputs: [{ id: 'kon', label: '결합상수 (kon)', unit: 'M⁻¹s⁻¹' }, { id: 'koff', label: '해리상수 (koff)', unit: 's⁻¹' }], rLabel: '친화도 (Ka)', rUnit: 'M⁻¹', calc: function(v) { return v.koff ? v.kon / v.koff : Infinity; } }] }
        ]
      },
      {
        id: 'bio_gene_protein',
        name: '유전 및 단백질',
        calculators: [
          { id: 'bi_b6', name: '재조합 플라스미드 형질전환 효율', icon: '🧬', desc: '사용 DNA 양과 생성된 콜로니 수로부터 효율을 계산합니다.', formula: { text: 'Eff = Colonies / DNA_wt', vars: [] }, modes: [{ id: 'm', label: '형질전환 효율', inputs: [{ id: 'col', label: '콜로니 수', unit: '개' }, { id: 'dna', label: '사용한 DNA 양', unit: 'ng' }], rLabel: '효율', rUnit: 'CFU/μg', calc: function(v) { return v.dna ? (v.col / (v.dna / 1000)) : Infinity; } }] },
          { id: 'bi_b7', name: '단백질 Beer-Lambert 흡광 농도', icon: '🧪', desc: '흡광도와 소쇠 계수로부터 단백질 농도(C)를 계산합니다.', formula: { text: 'C = A / (e × L)', vars: [] }, modes: [{ id: 'm', label: '농도 계산', inputs: [{ id: 'a', label: '흡광도 (A)', unit: '' }, { id: 'e', label: '소쇠 계수 (e)', unit: 'M⁻¹cm⁻¹' }, { id: 'l', label: '셀 두께', unit: 'cm' }], rLabel: '단백질 농도', rUnit: 'M', calc: function(v) { var denom = v.e * v.l; return denom ? v.a / denom : Infinity; } }] },
          { id: 'bi_b8', name: '효소 특이성 상수 (Spec. Constant)', icon: '⚛️', desc: '촉매 상수(kcat)와 미카엘리스 상수(Km) 비율인 특이성 상수를 구합니다.', formula: { text: 'K_spec = kcat / Km', vars: [] }, modes: [{ id: 'm', label: '특이성상수 계산', inputs: [{ id: 'kcat', label: 'kcat', unit: '/s' }, { id: 'km', label: 'Km', unit: 'mM' }], rLabel: '특이성 상수', rUnit: '/M·s', calc: function(v) { return v.km ? (v.kcat / (v.km / 1000)) : Infinity; } }] },
          { id: 'bi_b15', name: '유전자 회로 발현 단백질 반감기', icon: '🧬', desc: '분해 속도상수로부터 타겟 단백질 소실 반감기(t1/2)를 구합니다.', formula: { text: 't_half = ln(2) / kd', vars: [] }, modes: [{ id: 'm', label: '반감기 계산', inputs: [{ id: 'kd', label: '분해속도상수 (kd)', unit: '/hr' }], rLabel: '반감기 (t1/2)', rUnit: '시간 (h)', calc: function(v) { return v.kd > 0 ? Math.log(2) / v.kd : Infinity; } }] }
        ]
      },
      {
        id: 'bio_process_app',
        name: '바이오공정 및 응용',
        calculators: [
          { id: 'bi_b9', name: '발효 기질 소모 수율', icon: '🛢️', desc: '생성 균체량과 소비 기질량 비율로부터 수율(Yx/s)을 구합니다.', formula: { text: 'Yx/s = ΔX / ΔS', vars: [] }, modes: [{ id: 'm', label: '수율 계산', inputs: [{ id: 'dx', label: '생성된 균체량', unit: 'g/L' }, { id: 'ds', label: '소모된 기질량', unit: 'g/L' }], rLabel: '균체 수율 (Yx/s)', rUnit: 'g/g', calc: function(v) { return v.ds ? v.dx / v.ds : 0; } }] },
          { id: 'bi_b10', name: '배양기 유량 희석률 (Dilution Rate)', icon: '🔄', desc: '배양기 유입 속도와 부피 비율로부터 희석률(D)을 구합니다.', formula: { text: 'D = F / V', vars: [] }, modes: [{ id: 'm', label: '희석률 계산', inputs: [{ id: 'f', label: '공급 유량 (F)', unit: 'L/hr' }, { id: 'v', label: '배양액 부피 (V)', unit: 'L' }], rLabel: '희석률 (D)', rUnit: '/hr', calc: function(v) { return v.v ? v.f / v.v : Infinity; } }] },
          { id: 'bi_b11', name: '생체 스캐폴드 지지체 다공도', icon: '🧫', desc: '실제 무게와 고체 겉보기 진부피 밀도로부터 지지체의 공극률을 구합니다.', formula: { text: 'Poro = (1 - ρ_apparent / ρ_solid) × 100', vars: [] }, modes: [{ id: 'm', label: '다공도 계산', inputs: [{ id: 'ra', label: '겉보기 밀도', unit: 'g/cm³' }, { id: 'rs', label: '소재 고유밀도', unit: 'g/cm³' }], rLabel: '공극률 (Poro)', rUnit: '%', calc: function(v) { return v.rs ? (1 - v.ra / v.rs) * 100 : 0; } }] },
          { id: 'bi_b12', name: '줄기세포 분화 효율', icon: '🧫', desc: '전체 세포수 대비 타겟 분화 세포 비율을 계산합니다.', formula: { text: 'Eff = N_diff / N_total × 100', vars: [] }, modes: [{ id: 'm', label: '분화 효율', inputs: [{ id: 'nd', label: '분화된 세포 수', unit: '개' }, { id: 'nt', label: '전체 세포 수', unit: '개' }], rLabel: '분화 효율', rUnit: '%', calc: function(v) { return v.nt ? (v.nd / v.nt) * 100 : 0; } }] },
          { id: 'bi_b14', name: 'DNA 서열 해밍 거리', icon: '💻', desc: '두 동일 길이 DNA 문자열 서열 간 미매칭 문자 개수 비율을 계산합니다.', formula: { text: 'Dist = Mismatch / Length × 100', vars: [] }, modes: [{ id: 'm', label: '해밍 거리 계산', inputs: [{ id: 'mm', label: '불일치 염기 수', unit: '개' }, { id: 'l', label: '서열 총 길이', unit: 'bp' }], rLabel: '불일치 비율', rUnit: '%', calc: function(v) { return v.l ? (v.mm / v.l) * 100 : 0; } }] },
          { id: 'bi_b16', name: '인체 심장 1회 박출량 (SV)', icon: '❤️', desc: '심장 이완기 말 용적(EDV)과 수축기 말 용적(ESV) 차로부터 박출량을 구합니다.', formula: { text: 'SV = EDV - ESV', vars: [] }, modes: [{ id: 'm', label: '박출량 계산', inputs: [{ id: 'edv', label: '이완기 용적 (EDV)', unit: 'mL' }, { id: 'esv', label: '수축기 용적 (ESV)', unit: 'mL' }], rLabel: '1회 박출량 (SV)', rUnit: 'mL', calc: function(v) { return v.edv - v.esv; } }] }
        ]
      }
    ]
  }
];
