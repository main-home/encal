// ============================================
// INDUSTRIAL CALCULATOR — Mobile-First
// ============================================

// ─── Category Data ──────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'electrical', name: '전기/전자', icon: '⚡', color: '#3b82f6',
    subcategories: [
      { id: 'power', name: '전원', calculators: [
        { id: 'ohm', name: '옴의 법칙', icon: '⚡' },
        { id: 'power-calc', name: '전력 계산', icon: '🔋' },
        { id: 'voltage-divider', name: '전압 분배기', icon: '🔌' },
        { id: 'energy', name: '전력량', icon: '📊' },
      ]},
      { id: 'circuit', name: '회로', calculators: [
        { id: 'series-parallel', name: '직/병렬 저항', icon: '🔗' },
        { id: 'rc-time', name: 'RC 시정수', icon: '⏱️' },
        { id: 'resonance', name: '공진 주파수', icon: '📡' },
        { id: 'impedance', name: '임피던스', icon: '🌀' },
      ]},
      { id: 'semiconductor', name: '반도체', calculators: [
        { id: 'led-resistor', name: 'LED 저항', icon: '💡' },
        { id: 'transistor-bias', name: 'TR 바이어스', icon: '🔬' },
        { id: 'mosfet', name: 'MOSFET', icon: '🖥️' },
      ]},
    ]
  },
  {
    id: 'design', name: '설계', icon: '📐', color: '#8b5cf6',
    subcategories: [
      { id: 'structural', name: '구조 설계', calculators: [
        { id: 'stress', name: '응력 계산', icon: '🏗️' },
        { id: 'beam-deflection', name: '보 처짐', icon: '📏' },
        { id: 'moment-inertia-area', name: '단면 2차모멘트', icon: '⬜' },
        { id: 'buckling', name: '좌굴 하중', icon: '📊' },
      ]},
      { id: 'gear-power', name: '기어/동력', calculators: [
        { id: 'gear-ratio', name: '기어비', icon: '⚙️' },
        { id: 'belt-tension', name: '벨트 장력', icon: '🔄' },
        { id: 'chain-drive', name: '체인 전동', icon: '🔗' },
      ]},
      { id: 'tolerance', name: '공차/치수', calculators: [
        { id: 'tolerance-fit', name: '끼워맞춤', icon: '📐' },
        { id: 'surface-roughness', name: '표면 거칠기', icon: '🔎' },
      ]},
    ]
  },
  {
    id: 'material', name: '소재', icon: '🧪', color: '#10b981',
    subcategories: [
      { id: 'properties', name: '물성 계산', calculators: [
        { id: 'thermal-expansion', name: '열팽창', icon: '🌡️' },
        { id: 'elastic-modulus', name: '탄성 계수', icon: '📈' },
        { id: 'density-calc', name: '밀도', icon: '⚖️' },
      ]},
      { id: 'conversion', name: '단위 변환', calculators: [
        { id: 'hardness', name: '경도 변환', icon: '💎' },
        { id: 'temperature', name: '온도 변환', icon: '🌡️' },
        { id: 'pressure-unit', name: '압력 변환', icon: '🔄' },
        { id: 'length-unit', name: '길이 변환', icon: '📏' },
      ]},
    ]
  },
  {
    id: 'fluid', name: '유체역학', icon: '🌊', color: '#06b6d4',
    subcategories: [
      { id: 'piping', name: '배관', calculators: [
        { id: 'flow-rate', name: '유량', icon: '💧' },
        { id: 'reynolds', name: '레이놀즈 수', icon: '🌀' },
        { id: 'pressure-drop', name: '압력 손실', icon: '📉' },
      ]},
      { id: 'pump', name: '펌프', calculators: [
        { id: 'pump-power', name: '펌프 동력', icon: '⚙️' },
        { id: 'npsh', name: 'NPSH', icon: '📊' },
        { id: 'cavitation', name: '캐비테이션', icon: '⚠️' },
      ]},
    ]
  },
  {
    id: 'thermo', name: '열역학', icon: '🔥', color: '#f59e0b',
    subcategories: [
      { id: 'heat-transfer', name: '열전달', calculators: [
        { id: 'conduction', name: '열전도', icon: '🧱' },
        { id: 'convection', name: '대류', icon: '🌬️' },
        { id: 'radiation', name: '복사', icon: '☀️' },
      ]},
      { id: 'exchanger', name: '열교환기', calculators: [
        { id: 'lmtd', name: 'LMTD', icon: '🔄' },
        { id: 'heat-exchanger-sizing', name: '열교환기 용량', icon: '📐' },
      ]},
    ]
  },
  {
    id: 'mechanical', name: '기계공학', icon: '🔩', color: '#ef4444',
    subcategories: [
      { id: 'dynamics', name: '동역학', calculators: [
        { id: 'torque', name: '토크', icon: '🔧' },
        { id: 'moment-of-inertia', name: '관성 모멘트', icon: '🎯' },
        { id: 'angular-velocity', name: '각속도 변환', icon: '🔄' },
      ]},
      { id: 'fastener', name: '볼트/체결', calculators: [
        { id: 'bolt-torque', name: '체결 토크', icon: '🔩' },
        { id: 'bolt-stress', name: '볼트 응력', icon: '📊' },
        { id: 'spring-calc', name: '스프링', icon: '🔗' },
      ]},
      { id: 'vibration', name: '진동', calculators: [
        { id: 'natural-freq', name: '고유진동수', icon: '📡' },
        { id: 'damping', name: '감쇠비', icon: '📉' },
      ]},
    ]
  }
];

// ─── Calculator Definitions ─────────────────────────────────────────────────

const CALC_DEFS = {
  'ohm': {
    title: '옴의 법칙', desc: '전압(V), 전류(I), 저항(R) 관계를 계산합니다.',
    formula: { text: 'V = I × R', vars: [{ s: 'V', d: '전압(V)' }, { s: 'I', d: '전류(A)' }, { s: 'R', d: '저항(Ω)' }] },
    modes: [
      { id: 'v', label: '전압 구하기', inputs: [{ id: 'i', label: '전류', unit: 'A', hint: '암페어' }, { id: 'r', label: '저항', unit: 'Ω', hint: '옴' }], rLabel: '전압', rUnit: 'V', calc: v => v.i * v.r },
      { id: 'i', label: '전류 구하기', inputs: [{ id: 'v', label: '전압', unit: 'V', hint: '볼트' }, { id: 'r', label: '저항', unit: 'Ω', hint: '옴' }], rLabel: '전류', rUnit: 'A', calc: v => v.r ? v.v / v.r : Infinity },
      { id: 'r', label: '저항 구하기', inputs: [{ id: 'v', label: '전압', unit: 'V', hint: '볼트' }, { id: 'i', label: '전류', unit: 'A', hint: '암페어' }], rLabel: '저항', rUnit: 'Ω', calc: v => v.i ? v.v / v.i : Infinity },
    ]
  },
  'power-calc': {
    title: '전력 계산', desc: '전력(P), 전압(V), 전류(I) 관계를 계산합니다.',
    formula: { text: 'P = V × I', vars: [{ s: 'P', d: '전력(W)' }, { s: 'V', d: '전압(V)' }, { s: 'I', d: '전류(A)' }] },
    modes: [
      { id: 'p', label: '전력 구하기', inputs: [{ id: 'v', label: '전압', unit: 'V', hint: '' }, { id: 'i', label: '전류', unit: 'A', hint: '' }], rLabel: '전력', rUnit: 'W', calc: v => v.v * v.i },
      { id: 'v', label: '전압 구하기', inputs: [{ id: 'p', label: '전력', unit: 'W', hint: '' }, { id: 'i', label: '전류', unit: 'A', hint: '' }], rLabel: '전압', rUnit: 'V', calc: v => v.i ? v.p / v.i : Infinity },
      { id: 'i', label: '전류 구하기', inputs: [{ id: 'p', label: '전력', unit: 'W', hint: '' }, { id: 'v', label: '전압', unit: 'V', hint: '' }], rLabel: '전류', rUnit: 'A', calc: v => v.v ? v.p / v.v : Infinity },
    ]
  },
  'voltage-divider': {
    title: '전압 분배기', desc: '저항 분압 회로의 출력 전압을 계산합니다.',
    formula: { text: 'Vout = Vin × R2/(R1+R2)', vars: [{ s: 'Vin', d: '입력전압' }, { s: 'R1,R2', d: '저항' }] },
    modes: [
      { id: 'vout', label: '출력전압 구하기', inputs: [{ id: 'vin', label: '입력전압', unit: 'V', hint: '' }, { id: 'r1', label: 'R1', unit: 'Ω', hint: '' }, { id: 'r2', label: 'R2', unit: 'Ω', hint: '' }], rLabel: '출력전압', rUnit: 'V', calc: v => (v.r1+v.r2) ? v.vin*v.r2/(v.r1+v.r2) : 0 },
    ]
  },
  'energy': {
    title: '전력량 계산', desc: '전력과 시간에 따른 에너지를 계산합니다.',
    formula: { text: 'W = P × t', vars: [{ s: 'W', d: '전력량' }, { s: 'P', d: '전력(W)' }, { s: 't', d: '시간(h)' }] },
    modes: [
      { id: 'wh', label: 'Wh 계산', inputs: [{ id: 'p', label: '전력', unit: 'W', hint: '' }, { id: 't', label: '시간', unit: 'h', hint: '' }], rLabel: '전력량', rUnit: 'Wh', calc: v => v.p * v.t },
      { id: 'kwh', label: 'kWh 변환', inputs: [{ id: 'p', label: '전력', unit: 'W', hint: '' }, { id: 't', label: '시간', unit: 'h', hint: '' }], rLabel: '전력량', rUnit: 'kWh', calc: v => v.p * v.t / 1000 },
    ]
  },
  'series-parallel': {
    title: '직/병렬 저항', desc: '두 저항의 직렬·병렬 합성저항을 계산합니다.',
    formula: { text: '직렬: R1+R2 | 병렬: R1R2/(R1+R2)', vars: [{ s: 'R1', d: '저항1' }, { s: 'R2', d: '저항2' }] },
    modes: [
      { id: 's', label: '직렬', inputs: [{ id: 'r1', label: 'R1', unit: 'Ω', hint: '' }, { id: 'r2', label: 'R2', unit: 'Ω', hint: '' }], rLabel: '직렬 합성', rUnit: 'Ω', calc: v => v.r1+v.r2 },
      { id: 'p', label: '병렬', inputs: [{ id: 'r1', label: 'R1', unit: 'Ω', hint: '' }, { id: 'r2', label: 'R2', unit: 'Ω', hint: '' }], rLabel: '병렬 합성', rUnit: 'Ω', calc: v => (v.r1+v.r2) ? v.r1*v.r2/(v.r1+v.r2) : 0 },
    ]
  },
  'rc-time': {
    title: 'RC 시정수', desc: 'RC 회로의 시정수(τ)를 계산합니다.',
    formula: { text: 'τ = R × C', vars: [{ s: 'τ', d: '시정수(s)' }, { s: 'R', d: '저항(Ω)' }, { s: 'C', d: '커패시턴스' }] },
    modes: [
      { id: 'tau', label: '시정수 구하기', inputs: [{ id: 'r', label: '저항', unit: 'Ω', hint: '' }, { id: 'c', label: '커패시턴스', unit: 'μF', hint: '' }], rLabel: '시정수', rUnit: 'ms', calc: v => v.r * v.c / 1000 },
    ]
  },
  'resonance': {
    title: '공진 주파수', desc: 'LC 회로의 공진 주파수를 계산합니다.',
    formula: { text: 'f = 1/(2π√(LC))', vars: [{ s: 'L', d: '인덕턴스' }, { s: 'C', d: '커패시턴스' }] },
    modes: [
      { id: 'f', label: '주파수 구하기', inputs: [{ id: 'l', label: '인덕턴스', unit: 'mH', hint: '' }, { id: 'c', label: '커패시턴스', unit: 'μF', hint: '' }], rLabel: '공진주파수', rUnit: 'Hz', calc: v => { const L=v.l/1000, C=v.c/1e6; return (L>0&&C>0)?1/(2*Math.PI*Math.sqrt(L*C)):0; } },
    ]
  },
  'impedance': {
    title: '임피던스', desc: 'RLC 직렬 회로 임피던스를 계산합니다.',
    formula: { text: 'Z = √(R²+(XL-XC)²)', vars: [{ s: 'R', d: '저항' }, { s: 'XL', d: '유도리액턴스' }, { s: 'XC', d: '용량리액턴스' }] },
    modes: [
      { id: 'z', label: '임피던스 구하기', inputs: [{ id: 'r', label: 'R', unit: 'Ω', hint: '' }, { id: 'xl', label: 'XL', unit: 'Ω', hint: '' }, { id: 'xc', label: 'XC', unit: 'Ω', hint: '' }], rLabel: '임피던스', rUnit: 'Ω', calc: v => Math.sqrt(v.r**2+(v.xl-v.xc)**2) },
    ]
  },
  'led-resistor': {
    title: 'LED 저항', desc: 'LED 보호 저항 값을 계산합니다.',
    formula: { text: 'R = (Vs-Vf)/If', vars: [{ s: 'Vs', d: '전원전압' }, { s: 'Vf', d: 'LED전압' }, { s: 'If', d: 'LED전류' }] },
    modes: [
      { id: 'r', label: '저항 구하기', inputs: [{ id: 'vs', label: '전원전압', unit: 'V', hint: '' }, { id: 'vf', label: 'LED전압', unit: 'V', hint: '' }, { id: 'if_ma', label: 'LED전류', unit: 'mA', hint: '' }], rLabel: '보호저항', rUnit: 'Ω', calc: v => v.if_ma ? (v.vs-v.vf)/(v.if_ma/1000) : Infinity },
    ]
  },
  'transistor-bias': {
    title: 'TR 바이어스', desc: 'BJT 컬렉터 전류를 계산합니다.',
    formula: { text: 'Ic = β × Ib', vars: [{ s: 'β', d: '전류이득' }, { s: 'Ib', d: '베이스전류' }] },
    modes: [
      { id: 'ic', label: 'Ic 구하기', inputs: [{ id: 'beta', label: 'β', unit: '', hint: '' }, { id: 'ib', label: 'Ib', unit: 'μA', hint: '' }], rLabel: 'Ic', rUnit: 'mA', calc: v => v.beta*v.ib/1000 },
    ]
  },
  'mosfet': {
    title: 'MOSFET 손실', desc: 'RDS(on) 전도 손실을 계산합니다.',
    formula: { text: 'P = Rds × Id²', vars: [{ s: 'Rds', d: 'ON저항' }, { s: 'Id', d: '드레인전류' }] },
    modes: [
      { id: 'p', label: '전도손실 구하기', inputs: [{ id: 'rds', label: 'RDS(on)', unit: 'mΩ', hint: '' }, { id: 'id', label: 'Id', unit: 'A', hint: '' }], rLabel: '전도손실', rUnit: 'W', calc: v => (v.rds/1000)*v.id*v.id },
    ]
  },
  'stress': {
    title: '응력 계산', desc: '인장/압축 응력을 계산합니다.',
    formula: { text: 'σ = F / A', vars: [{ s: 'F', d: '하중(N)' }, { s: 'A', d: '단면적(mm²)' }] },
    modes: [
      { id: 's', label: '응력 구하기', inputs: [{ id: 'f', label: '하중', unit: 'N', hint: '' }, { id: 'a', label: '단면적', unit: 'mm²', hint: '' }], rLabel: '응력', rUnit: 'MPa', calc: v => v.a ? v.f/v.a : Infinity },
    ]
  },
  'beam-deflection': {
    title: '보 처짐', desc: '단순지지보 중앙집중하중 최대처짐을 계산합니다.',
    formula: { text: 'δ = PL³/(48EI)', vars: [{ s: 'P', d: '하중' }, { s: 'L', d: '길이' }, { s: 'E', d: '탄성계수' }] },
    modes: [
      { id: 'd', label: '처짐 구하기', inputs: [{ id: 'p', label: '하중', unit: 'N', hint: '' }, { id: 'l', label: '길이', unit: 'mm', hint: '' }, { id: 'e', label: '탄성계수', unit: 'GPa', hint: '' }, { id: 'i', label: '2차모멘트', unit: 'mm⁴', hint: '' }], rLabel: '최대처짐', rUnit: 'mm', calc: v => { const E=v.e*1000; return (48*E*v.i) ? v.p*v.l**3/(48*E*v.i) : 0; } },
    ]
  },
  'moment-inertia-area': {
    title: '단면 2차모멘트', desc: '단면 형상의 2차 모멘트를 계산합니다.',
    formula: { text: '직사각형: I=bh³/12', vars: [{ s: 'b', d: '폭' }, { s: 'h', d: '높이' }] },
    modes: [
      { id: 'rect', label: '직사각형', inputs: [{ id: 'b', label: '폭', unit: 'mm', hint: '' }, { id: 'h', label: '높이', unit: 'mm', hint: '' }], rLabel: '2차모멘트', rUnit: 'mm⁴', calc: v => v.b*v.h**3/12 },
      { id: 'circ', label: '원형', inputs: [{ id: 'd', label: '지름', unit: 'mm', hint: '' }], rLabel: '2차모멘트', rUnit: 'mm⁴', calc: v => Math.PI*v.d**4/64 },
    ]
  },
  'buckling': {
    title: '좌굴 하중', desc: '오일러 좌굴 임계하중을 계산합니다.',
    formula: { text: 'Pcr = π²EI/(KL)²', vars: [{ s: 'K', d: '유효길이계수' }, { s: 'E', d: '탄성계수' }] },
    modes: [
      { id: 'pcr', label: '임계하중 구하기', inputs: [{ id: 'e', label: '탄성계수', unit: 'GPa', hint: '' }, { id: 'i', label: '2차모멘트', unit: 'mm⁴', hint: '' }, { id: 'k', label: 'K', unit: '', hint: '양단고정=0.5' }, { id: 'l', label: '길이', unit: 'mm', hint: '' }], rLabel: '임계하중', rUnit: 'N', calc: v => { const kl=v.k*v.l; return kl ? Math.PI**2*v.e*1000*v.i/(kl**2) : 0; } },
    ]
  },
  'gear-ratio': {
    title: '기어비', desc: '기어비와 출력 회전수를 계산합니다.',
    formula: { text: 'N2 = N1×Z1/Z2', vars: [{ s: 'Z', d: '잇수' }, { s: 'N', d: '회전수' }] },
    modes: [
      { id: 'n2', label: '출력회전수', inputs: [{ id: 'z1', label: '구동잇수', unit: '개', hint: '' }, { id: 'z2', label: '피동잇수', unit: '개', hint: '' }, { id: 'n1', label: '입력RPM', unit: 'RPM', hint: '' }], rLabel: '출력회전수', rUnit: 'RPM', calc: v => v.z2 ? v.n1*v.z1/v.z2 : 0 },
    ]
  },
  'belt-tension': {
    title: '벨트 장력', desc: '벨트 전동 유효장력을 계산합니다.',
    formula: { text: 'Fe = P/v', vars: [{ s: 'P', d: '동력(W)' }, { s: 'v', d: '벨트속도' }] },
    modes: [
      { id: 'fe', label: '장력 구하기', inputs: [{ id: 'p', label: '동력', unit: 'kW', hint: '' }, { id: 'v', label: '속도', unit: 'm/s', hint: '' }], rLabel: '유효장력', rUnit: 'N', calc: v => v.v ? v.p*1000/v.v : Infinity },
    ]
  },
  'chain-drive': {
    title: '체인 전동', desc: '체인 속도를 계산합니다.',
    formula: { text: 'v = ZpN/60000', vars: [{ s: 'Z', d: '잇수' }, { s: 'p', d: '피치(mm)' }] },
    modes: [
      { id: 'v', label: '속도 구하기', inputs: [{ id: 'z', label: '잇수', unit: '개', hint: '' }, { id: 'p', label: '피치', unit: 'mm', hint: '' }, { id: 'n', label: 'RPM', unit: 'RPM', hint: '' }], rLabel: '체인속도', rUnit: 'm/s', calc: v => v.z*v.p*v.n/60000 },
    ]
  },
  'tolerance-fit': {
    title: '끼워맞춤', desc: '축/구멍 치수로 틈새·죔새를 계산합니다.',
    formula: { text: '틈새 = 구멍치수 - 축치수', vars: [{ s: '양수', d: '헐거움' }, { s: '음수', d: '억지' }] },
    modes: [
      { id: 'c', label: '최소틈새 계산', inputs: [{ id: 'hole_min', label: '구멍최소', unit: 'mm', hint: '' }, { id: 'shaft_max', label: '축최대', unit: 'mm', hint: '' }], rLabel: '최소틈새', rUnit: 'mm', calc: v => v.hole_min-v.shaft_max },
    ]
  },
  'surface-roughness': {
    title: '표면 거칠기', desc: 'Ra→Rz 근사 변환합니다.',
    formula: { text: 'Rz ≈ 4×Ra', vars: [{ s: 'Ra', d: '중심선평균' }] },
    modes: [
      { id: 'rz', label: 'Rz 구하기', inputs: [{ id: 'ra', label: 'Ra', unit: 'μm', hint: '' }], rLabel: 'Rz(근사)', rUnit: 'μm', calc: v => v.ra*4 },
    ]
  },
  'thermal-expansion': {
    title: '열팽창', desc: '온도변화에 따른 길이변화를 계산합니다.',
    formula: { text: 'ΔL = α×L×ΔT', vars: [{ s: 'α', d: '선팽창계수' }, { s: 'L', d: '길이' }] },
    modes: [
      { id: 'dl', label: '변화량 구하기', inputs: [{ id: 'alpha', label: 'α', unit: '×10⁻⁶/°C', hint: '강=12' }, { id: 'l', label: '길이', unit: 'mm', hint: '' }, { id: 'dt', label: 'ΔT', unit: '°C', hint: '' }], rLabel: '길이변화', rUnit: 'mm', calc: v => v.alpha*1e-6*v.l*v.dt },
    ]
  },
  'elastic-modulus': {
    title: '탄성 계수', desc: '영률→전단탄성계수 변환합니다.',
    formula: { text: 'G = E/(2(1+ν))', vars: [{ s: 'E', d: '영률' }, { s: 'ν', d: '포아송비' }] },
    modes: [
      { id: 'g', label: 'G 구하기', inputs: [{ id: 'e', label: 'E', unit: 'GPa', hint: '' }, { id: 'nu', label: 'ν', unit: '', hint: '강=0.3' }], rLabel: '전단탄성계수', rUnit: 'GPa', calc: v => v.e/(2*(1+v.nu)) },
    ]
  },
  'density-calc': {
    title: '밀도', desc: '질량·부피·밀도 관계를 계산합니다.',
    formula: { text: 'ρ = m/V', vars: [{ s: 'm', d: '질량(g)' }, { s: 'V', d: '부피(cm³)' }] },
    modes: [
      { id: 'rho', label: '밀도 구하기', inputs: [{ id: 'm', label: '질량', unit: 'g', hint: '' }, { id: 'v', label: '부피', unit: 'cm³', hint: '' }], rLabel: '밀도', rUnit: 'g/cm³', calc: v => v.v ? v.m/v.v : Infinity },
      { id: 'm', label: '질량 구하기', inputs: [{ id: 'rho', label: '밀도', unit: 'g/cm³', hint: '' }, { id: 'v', label: '부피', unit: 'cm³', hint: '' }], rLabel: '질량', rUnit: 'g', calc: v => v.rho*v.v },
    ]
  },
  'hardness': {
    title: '경도 변환', desc: 'HRC→HB 근사 변환합니다.',
    formula: { text: 'HB ≈ 17.6×HRC+67', vars: [{ s: 'HRC', d: '로크웰C' }] },
    modes: [
      { id: 'hb', label: 'HRC→HB', inputs: [{ id: 'hrc', label: 'HRC', unit: '', hint: '20~65' }], rLabel: 'HB(근사)', rUnit: '', calc: v => 17.6*v.hrc+67 },
    ]
  },
  'temperature': {
    title: '온도 변환', desc: '°C, °F, K 상호 변환합니다.',
    formula: { text: '°F=°C×9/5+32 | K=°C+273.15', vars: [] },
    modes: [
      { id: 'cf', label: '°C→°F', inputs: [{ id: 'c', label: '°C', unit: '°C', hint: '' }], rLabel: '화씨', rUnit: '°F', calc: v => v.c*9/5+32 },
      { id: 'fc', label: '°F→°C', inputs: [{ id: 'f', label: '°F', unit: '°F', hint: '' }], rLabel: '섭씨', rUnit: '°C', calc: v => (v.f-32)*5/9 },
      { id: 'ck', label: '°C→K', inputs: [{ id: 'c', label: '°C', unit: '°C', hint: '' }], rLabel: '켈빈', rUnit: 'K', calc: v => v.c+273.15 },
    ]
  },
  'pressure-unit': {
    title: '압력 변환', desc: 'MPa, bar, PSI 상호 변환합니다.',
    formula: { text: '1MPa = 10bar = 145PSI', vars: [] },
    modes: [
      { id: 'mp', label: 'MPa→PSI', inputs: [{ id: 'mpa', label: 'MPa', unit: 'MPa', hint: '' }], rLabel: 'PSI', rUnit: 'PSI', calc: v => v.mpa*145.038 },
      { id: 'mb', label: 'MPa→bar', inputs: [{ id: 'mpa', label: 'MPa', unit: 'MPa', hint: '' }], rLabel: 'bar', rUnit: 'bar', calc: v => v.mpa*10 },
      { id: 'pm', label: 'PSI→MPa', inputs: [{ id: 'psi', label: 'PSI', unit: 'PSI', hint: '' }], rLabel: 'MPa', rUnit: 'MPa', calc: v => v.psi/145.038 },
    ]
  },
  'length-unit': {
    title: '길이 변환', desc: 'mm, inch 상호 변환합니다.',
    formula: { text: '1inch = 25.4mm', vars: [] },
    modes: [
      { id: 'mi', label: 'mm→inch', inputs: [{ id: 'mm', label: 'mm', unit: 'mm', hint: '' }], rLabel: 'inch', rUnit: 'inch', calc: v => v.mm/25.4 },
      { id: 'im', label: 'inch→mm', inputs: [{ id: 'inch', label: 'inch', unit: 'inch', hint: '' }], rLabel: 'mm', rUnit: 'mm', calc: v => v.inch*25.4 },
    ]
  },
  'flow-rate': {
    title: '유량 계산', desc: '관 내부 유량을 계산합니다.',
    formula: { text: 'Q = (πd²/4)×v', vars: [{ s: 'd', d: '관내경' }, { s: 'v', d: '유속' }] },
    modes: [
      { id: 'q', label: '유량 구하기', inputs: [{ id: 'd', label: '내경', unit: 'mm', hint: '' }, { id: 'v', label: '유속', unit: 'm/s', hint: '' }], rLabel: '유량', rUnit: 'L/min', calc: v => { const d=v.d/1000; return Math.PI*d*d/4*v.v*60000; } },
    ]
  },
  'reynolds': {
    title: '레이놀즈 수', desc: '유동 상태(층류/난류)를 판별합니다.',
    formula: { text: 'Re = vD/ν', vars: [{ s: 'v', d: '유속' }, { s: 'D', d: '관경' }, { s: 'ν', d: '동점도' }] },
    modes: [
      { id: 're', label: 'Re 구하기', inputs: [{ id: 'v', label: '유속', unit: 'm/s', hint: '' }, { id: 'd', label: '내경', unit: 'mm', hint: '' }, { id: 'nu', label: '동점도', unit: '×10⁻⁶m²/s', hint: '물=1' }], rLabel: 'Re', rUnit: '', calc: v => { const nu=v.nu*1e-6; return nu ? v.v*(v.d/1000)/nu : 0; } },
    ]
  },
  'pressure-drop': {
    title: '압력 손실', desc: '배관 마찰손실(Darcy-Weisbach)을 계산합니다.',
    formula: { text: 'ΔP = f(L/D)(ρv²/2)', vars: [{ s: 'f', d: '마찰계수' }] },
    modes: [
      { id: 'dp', label: '압력손실 구하기', inputs: [{ id: 'f', label: '마찰계수', unit: '', hint: '0.02' }, { id: 'l', label: '길이', unit: 'm', hint: '' }, { id: 'd', label: '내경', unit: 'mm', hint: '' }, { id: 'rho', label: '밀도', unit: 'kg/m³', hint: '998' }, { id: 'v', label: '유속', unit: 'm/s', hint: '' }], rLabel: '압력손실', rUnit: 'kPa', calc: v => { const D=v.d/1000; return D ? v.f*(v.l/D)*(v.rho*v.v**2/2)/1000 : 0; } },
    ]
  },
  'pump-power': {
    title: '펌프 동력', desc: '필요 펌프동력을 계산합니다.',
    formula: { text: 'P = ρgQH/η', vars: [{ s: 'Q', d: '유량' }, { s: 'H', d: '양정' }] },
    modes: [
      { id: 'p', label: '동력 구하기', inputs: [{ id: 'rho', label: '밀도', unit: 'kg/m³', hint: '998' }, { id: 'q', label: '유량', unit: 'L/min', hint: '' }, { id: 'h', label: '양정', unit: 'm', hint: '' }, { id: 'eta', label: '효율', unit: '%', hint: '75' }], rLabel: '동력', rUnit: 'kW', calc: v => { const Q=v.q/60000, e=v.eta/100; return e ? v.rho*9.81*Q*v.h/(e*1000) : Infinity; } },
    ]
  },
  'npsh': {
    title: 'NPSH', desc: '유효흡입수두(NPSHa)를 계산합니다.',
    formula: { text: 'NPSHa = Pa/ρg+Zs-hf-Pv/ρg', vars: [] },
    modes: [
      { id: 'a', label: 'NPSHa 구하기', inputs: [{ id: 'pa', label: '대기압', unit: 'kPa', hint: '101.3' }, { id: 'zs', label: '흡입높이', unit: 'm', hint: '' }, { id: 'hf', label: '손실수두', unit: 'm', hint: '' }, { id: 'pv', label: '증기압', unit: 'kPa', hint: '' }, { id: 'rho', label: '밀도', unit: 'kg/m³', hint: '998' }], rLabel: 'NPSHa', rUnit: 'm', calc: v => v.pa*1000/(v.rho*9.81)+v.zs-v.hf-v.pv*1000/(v.rho*9.81) },
    ]
  },
  'cavitation': {
    title: '캐비테이션', desc: 'NPSHa와 NPSHr을 비교합니다.',
    formula: { text: 'NPSHa > NPSHr → 안전', vars: [] },
    modes: [
      { id: 'c', label: '여유도 계산', inputs: [{ id: 'npsha', label: 'NPSHa', unit: 'm', hint: '' }, { id: 'npshr', label: 'NPSHr', unit: 'm', hint: '' }], rLabel: '여유도', rUnit: 'm', calc: v => v.npsha-v.npshr },
    ]
  },
  'conduction': {
    title: '열전도', desc: '평판 전도 열전달량을 계산합니다.',
    formula: { text: 'Q = kA(ΔT/Δx)', vars: [{ s: 'k', d: '열전도율' }] },
    modes: [
      { id: 'q', label: '열전달량 구하기', inputs: [{ id: 'k', label: 'k', unit: 'W/m·K', hint: '강=50' }, { id: 'a', label: '면적', unit: 'm²', hint: '' }, { id: 'dt', label: 'ΔT', unit: '°C', hint: '' }, { id: 'dx', label: '두께', unit: 'mm', hint: '' }], rLabel: '열전달량', rUnit: 'W', calc: v => { const dx=v.dx/1000; return dx ? v.k*v.a*v.dt/dx : Infinity; } },
    ]
  },
  'convection': {
    title: '대류', desc: '대류 열전달량을 계산합니다.',
    formula: { text: 'Q = hAΔT', vars: [{ s: 'h', d: '열전달계수' }] },
    modes: [
      { id: 'q', label: '열전달량 구하기', inputs: [{ id: 'h', label: 'h', unit: 'W/m²·K', hint: '' }, { id: 'a', label: '면적', unit: 'm²', hint: '' }, { id: 'dt', label: 'ΔT', unit: '°C', hint: '' }], rLabel: '열전달량', rUnit: 'W', calc: v => v.h*v.a*v.dt },
    ]
  },
  'radiation': {
    title: '복사', desc: '스테판-볼츠만 법칙으로 계산합니다.',
    formula: { text: 'Q = εσA(T₁⁴-T₂⁴)', vars: [{ s: 'ε', d: '방사율' }] },
    modes: [
      { id: 'q', label: '복사열 구하기', inputs: [{ id: 'eps', label: 'ε', unit: '', hint: '0~1' }, { id: 'a', label: '면적', unit: 'm²', hint: '' }, { id: 't1', label: 'T₁', unit: '°C', hint: '' }, { id: 't2', label: 'T₂', unit: '°C', hint: '' }], rLabel: '복사열', rUnit: 'W', calc: v => { const T1=v.t1+273.15, T2=v.t2+273.15; return v.eps*5.67e-8*v.a*(T1**4-T2**4); } },
    ]
  },
  'lmtd': {
    title: 'LMTD', desc: '대수평균온도차를 계산합니다.',
    formula: { text: 'LMTD = (ΔT₁-ΔT₂)/ln(ΔT₁/ΔT₂)', vars: [] },
    modes: [
      { id: 'l', label: 'LMTD 구하기', inputs: [{ id: 'dt1', label: 'ΔT₁', unit: '°C', hint: '' }, { id: 'dt2', label: 'ΔT₂', unit: '°C', hint: '' }], rLabel: 'LMTD', rUnit: '°C', calc: v => v.dt1===v.dt2 ? v.dt1 : (v.dt1/v.dt2>0 ? (v.dt1-v.dt2)/Math.log(v.dt1/v.dt2) : 0) },
    ]
  },
  'heat-exchanger-sizing': {
    title: '열교환기 용량', desc: '필요 전열면적을 계산합니다.',
    formula: { text: 'A = Q/(U×LMTD)', vars: [{ s: 'U', d: '총괄열전달계수' }] },
    modes: [
      { id: 'a', label: '면적 구하기', inputs: [{ id: 'q', label: 'Q', unit: 'kW', hint: '' }, { id: 'u', label: 'U', unit: 'W/m²·K', hint: '' }, { id: 'lmtd', label: 'LMTD', unit: '°C', hint: '' }], rLabel: '전열면적', rUnit: 'm²', calc: v => (v.u*v.lmtd) ? v.q*1000/(v.u*v.lmtd) : Infinity },
    ]
  },
  'torque': {
    title: '토크', desc: '힘과 거리로 토크를 계산합니다.',
    formula: { text: 'T = F×r', vars: [{ s: 'F', d: '힘(N)' }, { s: 'r', d: '거리(m)' }] },
    modes: [
      { id: 't', label: 'F×r로 구하기', inputs: [{ id: 'f', label: '힘', unit: 'N', hint: '' }, { id: 'r', label: '거리', unit: 'mm', hint: '' }], rLabel: '토크', rUnit: 'N·m', calc: v => v.f*(v.r/1000) },
      { id: 'tp', label: '동력으로 구하기', inputs: [{ id: 'p', label: '동력', unit: 'kW', hint: '' }, { id: 'n', label: 'RPM', unit: 'RPM', hint: '' }], rLabel: '토크', rUnit: 'N·m', calc: v => v.n ? v.p*1000*60/(2*Math.PI*v.n) : Infinity },
    ]
  },
  'moment-of-inertia': {
    title: '관성 모멘트', desc: '회전체 관성모멘트를 계산합니다.',
    formula: { text: 'I = ½mr² (속찬원통)', vars: [{ s: 'm', d: '질량' }, { s: 'r', d: '반경' }] },
    modes: [
      { id: 'solid', label: '속찬원통', inputs: [{ id: 'm', label: '질량', unit: 'kg', hint: '' }, { id: 'r', label: '반경', unit: 'mm', hint: '' }], rLabel: '관성모멘트', rUnit: 'kg·m²', calc: v => 0.5*v.m*(v.r/1000)**2 },
      { id: 'hollow', label: '속빈원통', inputs: [{ id: 'm', label: '질량', unit: 'kg', hint: '' }, { id: 'r1', label: '외경', unit: 'mm', hint: '' }, { id: 'r2', label: '내경', unit: 'mm', hint: '' }], rLabel: '관성모멘트', rUnit: 'kg·m²', calc: v => 0.5*v.m*((v.r1/1000)**2+(v.r2/1000)**2) },
    ]
  },
  'angular-velocity': {
    title: '각속도 변환', desc: 'RPM↔rad/s 변환합니다.',
    formula: { text: 'ω = 2πN/60', vars: [] },
    modes: [
      { id: 'rr', label: 'RPM→rad/s', inputs: [{ id: 'rpm', label: 'RPM', unit: 'RPM', hint: '' }], rLabel: '각속도', rUnit: 'rad/s', calc: v => v.rpm*2*Math.PI/60 },
      { id: 'rp', label: 'rad/s→RPM', inputs: [{ id: 'w', label: 'ω', unit: 'rad/s', hint: '' }], rLabel: 'RPM', rUnit: 'RPM', calc: v => v.w*60/(2*Math.PI) },
    ]
  },
  'bolt-torque': {
    title: '체결 토크', desc: '볼트 적정 체결토크를 계산합니다.',
    formula: { text: 'T = K×d×F', vars: [{ s: 'K', d: '토크계수' }, { s: 'd', d: '호칭지름' }] },
    modes: [
      { id: 't', label: '토크 구하기', inputs: [{ id: 'k', label: 'K', unit: '', hint: '0.2' }, { id: 'd', label: '지름', unit: 'mm', hint: '' }, { id: 'f', label: '축력', unit: 'kN', hint: '' }], rLabel: '체결토크', rUnit: 'N·m', calc: v => v.k*(v.d/1000)*v.f*1000 },
    ]
  },
  'bolt-stress': {
    title: '볼트 응력', desc: '볼트 인장응력을 계산합니다.',
    formula: { text: 'σ = F/As', vars: [{ s: 'F', d: '축력' }, { s: 'As', d: '유효단면적' }] },
    modes: [
      { id: 's', label: '응력 구하기', inputs: [{ id: 'f', label: '축력', unit: 'kN', hint: '' }, { id: 'as', label: 'As', unit: 'mm²', hint: '' }], rLabel: '인장응력', rUnit: 'MPa', calc: v => v.as ? v.f*1000/v.as : Infinity },
    ]
  },
  'spring-calc': {
    title: '스프링', desc: '코일스프링 스프링상수를 계산합니다.',
    formula: { text: 'k = Gd⁴/(8D³Na)', vars: [{ s: 'G', d: '전단탄성계수' }, { s: 'd', d: '선경' }] },
    modes: [
      { id: 'k', label: '상수 구하기', inputs: [{ id: 'g', label: 'G', unit: 'GPa', hint: '79' }, { id: 'dw', label: '선경', unit: 'mm', hint: '' }, { id: 'dc', label: '코일경', unit: 'mm', hint: '' }, { id: 'na', label: '감김수', unit: '회', hint: '' }], rLabel: '스프링상수', rUnit: 'N/mm', calc: v => (8*v.dc**3*v.na) ? v.g*1000*v.dw**4/(8*v.dc**3*v.na) : 0 },
    ]
  },
  'natural-freq': {
    title: '고유진동수', desc: '1자유도 고유진동수를 계산합니다.',
    formula: { text: 'fn = (1/2π)√(k/m)', vars: [{ s: 'k', d: '강성' }, { s: 'm', d: '질량' }] },
    modes: [
      { id: 'fn', label: '진동수 구하기', inputs: [{ id: 'k', label: '강성', unit: 'N/mm', hint: '' }, { id: 'm', label: '질량', unit: 'kg', hint: '' }], rLabel: '고유진동수', rUnit: 'Hz', calc: v => v.m ? 1/(2*Math.PI)*Math.sqrt(v.k*1000/v.m) : 0 },
    ]
  },
  'damping': {
    title: '감쇠비', desc: '감쇠진동계 감쇠비를 계산합니다.',
    formula: { text: 'ζ = c/(2√(km))', vars: [{ s: 'c', d: '감쇠계수' }] },
    modes: [
      { id: 'z', label: '감쇠비 구하기', inputs: [{ id: 'c', label: 'c', unit: 'N·s/m', hint: '' }, { id: 'k', label: 'k', unit: 'N/m', hint: '' }, { id: 'm', label: 'm', unit: 'kg', hint: '' }], rLabel: '감쇠비(ζ)', rUnit: '', calc: v => { const cc=2*Math.sqrt(v.k*v.m); return cc ? v.c/cc : 0; } },
    ]
  },
};


// ─── State ──────────────────────────────────────────────────────────────────

let selectedCat = null;
let selectedSub = null;
let selectedCalc = null;
let currentModeIdx = 0;


// ─── Render Navigation ──────────────────────────────────────────────────────

function renderCatRow(filter = '') {
  const row = document.getElementById('catRow');
  row.innerHTML = '';
  const q = filter.toLowerCase().trim();

  // If filtering, show flat results
  if (q) {
    renderSearchResults(q);
    return;
  }

  CATEGORIES.forEach(cat => {
    const count = cat.subcategories.reduce((s, sub) => s + sub.calculators.length, 0);
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (selectedCat === cat.id ? ' active' : '');
    btn.style.setProperty('--btn-active-bg', `${cat.color}18`);
    btn.style.setProperty('--btn-active-border', `${cat.color}55`);
    btn.style.setProperty('--btn-active-color', cat.color);
    btn.innerHTML = `<span class="btn-icon">${cat.icon}</span> ${cat.name} <span class="btn-count">${count}</span>`;
    btn.onclick = () => selectCategory(cat.id);
    row.appendChild(btn);
  });

  renderSubRow();
  renderCalcRow();
}

function selectCategory(catId) {
  if (selectedCat === catId) {
    selectedCat = null; selectedSub = null;
  } else {
    selectedCat = catId; selectedSub = null;
  }
  renderCatRow();
}

function renderSubRow() {
  const row = document.getElementById('subRow');
  row.innerHTML = '';

  if (!selectedCat) {
    row.style.display = 'none';
    return;
  }

  const cat = CATEGORIES.find(c => c.id === selectedCat);
  if (!cat) { row.style.display = 'none'; return; }

  row.style.display = 'flex';

  cat.subcategories.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (selectedSub === sub.id ? ' active' : '');
    btn.innerHTML = `${sub.name} <span class="btn-count">${sub.calculators.length}</span>`;
    btn.onclick = () => selectSubcategory(sub.id);
    row.appendChild(btn);
  });
}

function selectSubcategory(subId) {
  if (selectedSub === subId) {
    selectedSub = null;
  } else {
    selectedSub = subId;
  }
  renderSubRow();
  renderCalcRow();
}

function renderCalcRow() {
  const row = document.getElementById('calcRow');
  row.innerHTML = '';

  if (!selectedCat || !selectedSub) {
    row.style.display = 'none';
    return;
  }

  const cat = CATEGORIES.find(c => c.id === selectedCat);
  const sub = cat?.subcategories.find(s => s.id === selectedSub);
  if (!sub) { row.style.display = 'none'; return; }

  row.style.display = 'flex';

  sub.calculators.forEach(calc => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (selectedCalc === calc.id ? ' active' : '');
    btn.innerHTML = `<span class="btn-icon">${calc.icon}</span> ${calc.name}`;
    btn.onclick = () => openCalc(calc.id, cat.name, sub.name, calc.name);
    row.appendChild(btn);
  });
}


// ─── Search ─────────────────────────────────────────────────────────────────

function renderSearchResults(query) {
  const catRow = document.getElementById('catRow');
  const subRow = document.getElementById('subRow');
  const calcRow = document.getElementById('calcRow');
  subRow.style.display = 'none';
  calcRow.style.display = 'none';

  catRow.innerHTML = '';

  let results = [];
  CATEGORIES.forEach(cat => {
    cat.subcategories.forEach(sub => {
      sub.calculators.forEach(calc => {
        if (calc.name.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query) || sub.name.toLowerCase().includes(query)) {
          results.push({ ...calc, catId: cat.id, catName: cat.name, catColor: cat.color, subId: sub.id, subName: sub.name });
        }
      });
    });
  });

  if (results.length === 0) {
    catRow.innerHTML = '<div class="no-results">검색 결과가 없습니다</div>';
    return;
  }

  results.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.style.setProperty('--btn-active-bg', `${r.catColor}18`);
    btn.innerHTML = `<span class="btn-icon">${r.icon}</span> ${r.name} <span class="btn-count">${r.catName}</span>`;
    btn.onclick = () => openCalc(r.id, r.catName, r.subName, r.name);
    catRow.appendChild(btn);
  });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('searchClear');

  input.addEventListener('input', () => {
    const val = input.value.trim();
    clear.classList.toggle('show', val.length > 0);
    if (val) {
      selectedCat = null; selectedSub = null;
    }
    renderCatRow(val);
  });
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  input.value = '';
  document.getElementById('searchClear').classList.remove('show');
  renderCatRow();
  input.focus();
}


// ─── Open Calculator ────────────────────────────────────────────────────────

function openCalc(calcId, catName, subName, calcName) {
  const def = CALC_DEFS[calcId];
  if (!def) return;

  selectedCalc = calcId;
  currentModeIdx = 0;

  document.getElementById('welcomeView').style.display = 'none';
  const view = document.getElementById('calcView');
  view.classList.add('active');

  // Breadcrumb
  document.getElementById('breadcrumb').innerHTML =
    `${catName} <span class="sep">›</span> ${subName} <span class="sep">›</span> <span class="current">${calcName}</span>`;

  document.getElementById('calcTitle').textContent = def.title;
  document.getElementById('calcDesc').textContent = def.desc;

  // Formula
  const fb = document.getElementById('formulaBox');
  fb.innerHTML = `
    <div class="formula-label">공식</div>
    <div class="formula-text">${def.formula.text}</div>
    ${def.formula.vars.length ? `<div class="formula-vars">${def.formula.vars.map(v => `<span><strong>${v.s}</strong> = ${v.d}</span>`).join('')}</div>` : ''}
  `;

  renderMode(def);
  renderCalcRow();

  // Scroll to calc
  view.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderMode(def) {
  const mode = def.modes[currentModeIdx];

  // Mode tabs
  const tabsWrap = document.getElementById('modeTabsWrap');
  if (def.modes.length > 1) {
    let html = '<div class="mode-tabs">';
    def.modes.forEach((m, i) => {
      html += `<button class="mode-tab${i === currentModeIdx ? ' active' : ''}" onclick="switchMode(${i})">${m.label}</button>`;
    });
    html += '</div>';
    tabsWrap.innerHTML = html;
  } else {
    tabsWrap.innerHTML = '';
  }

  // Inputs
  const inputsWrap = document.getElementById('inputsWrap');
  let html = '';
  mode.inputs.forEach(inp => {
    html += `
      <div class="input-group">
        <label>${inp.label} ${inp.hint ? `<span class="hint">${inp.hint}</span>` : ''}</label>
        <div class="input-wrap">
          <input type="number" id="inp_${inp.id}" placeholder="0" step="any" inputmode="decimal" oninput="doCalc()">
          <span class="input-unit">${inp.unit}</span>
        </div>
      </div>
    `;
  });
  inputsWrap.innerHTML = html;

  // Result labels
  document.getElementById('resultLabel').textContent = mode.rLabel;
  document.getElementById('resultValue').textContent = '0';
  document.getElementById('resultUnit').textContent = ' ' + mode.rUnit;
}

function switchMode(idx) {
  currentModeIdx = idx;
  renderMode(CALC_DEFS[selectedCalc]);
}

function doCalc() {
  const def = CALC_DEFS[selectedCalc];
  const mode = def.modes[currentModeIdx];
  const vals = {};
  let allOk = true;

  mode.inputs.forEach(inp => {
    const el = document.getElementById('inp_' + inp.id);
    const v = parseFloat(el.value);
    if (isNaN(v)) allOk = false;
    vals[inp.id] = isNaN(v) ? 0 : v;
  });

  const el = document.getElementById('resultValue');
  if (!allOk) { el.textContent = '0'; return; }

  el.textContent = fmt(mode.calc(vals));
}

function fmt(v) {
  if (isNaN(v) || !isFinite(v)) return '∞';
  if (v === 0) return '0';
  if (Math.abs(v) >= 1e8) return v.toExponential(3);
  if (Math.abs(v) < 0.0001) return v.toExponential(3);
  return parseFloat(v.toPrecision(6)).toString();
}

function resetInputs() {
  const def = CALC_DEFS[selectedCalc];
  const mode = def.modes[currentModeIdx];
  mode.inputs.forEach(inp => {
    document.getElementById('inp_' + inp.id).value = '';
  });
  document.getElementById('resultValue').textContent = '0';
}

function goHome() {
  selectedCat = null; selectedSub = null; selectedCalc = null;
  document.getElementById('welcomeView').style.display = 'flex';
  document.getElementById('calcView').classList.remove('active');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').classList.remove('show');
  renderCatRow();
}


// ─── Stats ──────────────────────────────────────────────────────────────────

function countTotal() {
  let t = 0;
  CATEGORIES.forEach(c => c.subcategories.forEach(s => t += s.calculators.length));
  document.getElementById('statTotal').textContent = t;
}


// ─── Init ───────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderCatRow();
  initSearch();
  countTotal();
});
