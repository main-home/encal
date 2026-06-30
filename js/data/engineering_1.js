window.DATA_ENGINEERING_1 = [
  {
    id: 'eng_mech',
    name: '기계공학',
    icon: '⚙️',
    color: '#ef4444',
    subcategories: [
      {
        id: 'mech_math_control',
        name: '공업수학 및 제어',
        calculators: [
          { id: 'mc_m1', name: '1계 선형 상미분방정식', icon: '📐', desc: 'dy/dx + Py = Q의 해를 구합니다.', formula: { text: 'y = Q/P + (y₀ - Q/P)×e^(-Px)', vars: [] }, modes: [{ id: 'm', label: '상수 P, Q 기준', inputs: [{ id: 'p', label: 'P', unit: '' }, { id: 'q', label: 'Q', unit: '' }, { id: 'y0', label: '초기값 (y₀)', unit: '' }, { id: 'x', label: 'x', unit: '' }], rLabel: 'y', rUnit: '', calc: function(v) { return v.p ? (v.q/v.p) + (v.y0 - v.q/v.p)*Math.exp(-v.p*v.x) : v.q*v.x + v.y0; } }] },
          { id: 'mc_m11', name: '2차 제어 오버슈트', icon: '📈', desc: '제어계 감쇠비로부터 오버슈트를 구합니다.', formula: { text: 'Mp = exp(-πζ/√(1-ζ²)) × 100', vars: [] }, modes: [{ id: 'm', label: 'Mp 계산', inputs: [{ id: 'z', label: '감쇠비', unit: '' }], rLabel: 'Mp', rUnit: '%', calc: function(v) { if(v.z >= 1) return 0; var denom = Math.sqrt(1 - v.z*v.z); return denom ? Math.exp(-Math.PI*v.z/denom)*100 : 0; } }] },
          { id: 'mc_m15', name: 'ADC 변환 분해능', icon: '🔌', desc: '전압 범위와 비트 수로부터 단위 전압당 분해능을 구합니다.', formula: { text: 'Res = V_ref / 2^n', vars: [] }, modes: [{ id: 'm', label: '분해능 계산', inputs: [{ id: 'v', label: '기준전압', unit: 'V' }, { id: 'n', label: '비트수', unit: 'bit' }], rLabel: '분해능', rUnit: 'mV', calc: function(v) { return (v.v / Math.pow(2, v.n)) * 1000; } }] },
          { id: 'mc_m21', name: '지수함수 라플라스 변환', icon: '📐', desc: 'f(t) = e^(at)의 라플라스 변환 F(s)를 계산합니다.', formula: { text: 'F(s) = 1 / (s - a)', vars: [] }, modes: [{ id: 'm', label: 'F(s) 계산', inputs: [{ id: 's', label: '변수 s', unit: '' }, { id: 'a', label: '상수 a', unit: '' }], rLabel: 'F(s)', rUnit: '', calc: function(v) { return v.s !== v.a ? 1 / (v.s - v.a) : Infinity; } }] },
          { id: 'mc_m22', name: 'PID 제어 비례항', icon: '📈', desc: '오차값(e)과 비례이득(Kp)으로부터 제어출력을 구합니다.', formula: { text: 'u(t) = Kp × e(t)', vars: [] }, modes: [{ id: 'm', label: '출력 계산', inputs: [{ id: 'kp', label: '비례이득 (Kp)', unit: '' }, { id: 'e', label: '오차 (e)', unit: '' }], rLabel: '제어출력 (u)', rUnit: '', calc: function(v) { return v.kp * v.e; } }] }
        ]
      },
      {
        id: 'mech_solid_vibe',
        name: '고체 및 진동역학',
        calculators: [
          { id: 'mc_m2', name: '라미의 정리', icon: '📐', desc: '세 힘의 평형 관계를 계산합니다.', formula: { text: 'F2 = F1 × sin(θ2) / sin(θ1)', vars: [] }, modes: [{ id: 'm', label: 'F2 계산', inputs: [{ id: 'f1', label: 'F1', unit: 'N' }, { id: 'a1', label: 'θ1', unit: '°' }, { id: 'a2', label: 'θ2', unit: '°' }], rLabel: 'F2', rUnit: 'N', calc: function(v) { return (v.f1 * Math.sin(v.a2*Math.PI/180)) / Math.sin(v.a1*Math.PI/180); } }] },
          { id: 'mc_m3', name: '자유낙하 속도', icon: '🏃', desc: '시간에 따른 자유낙하 속도를 구합니다.', formula: { text: 'v = g × t', vars: [] }, modes: [{ id: 'm', label: '속도 계산', inputs: [{ id: 't', label: '시간', unit: 's' }], rLabel: '속도 (v)', rUnit: 'm/s', calc: function(v) { return 9.81 * v.t; } }] },
          { id: 'mc_m4', name: '직사각형 굽힘응력', icon: '📐', desc: '모멘트와 단면계수로부터 응력을 구합니다.', formula: { text: 'σ = M / Z', vars: [] }, modes: [{ id: 'm', label: '응력 계산', inputs: [{ id: 'm', label: '모멘트', unit: 'N·m' }, { id: 'z', label: '단면계수 (Z)', unit: 'cm³' }], rLabel: '굽힘응력', rUnit: 'MPa', calc: function(v) { return v.z ? v.m / v.z : Infinity; } }] },
          { id: 'mc_m10', name: '고유진동수', icon: '📡', desc: '강성과 질량으로부터 고유진동수를 구합니다.', formula: { text: 'fn = √(k/m) / 2π', vars: [] }, modes: [{ id: 'm', label: 'fn 계산', inputs: [{ id: 'k', label: '강성', unit: 'N/mm' }, { id: 'm', label: '질량', unit: 'kg' }], rLabel: 'fn', rUnit: 'Hz', calc: function(v) { return v.m ? (1/(2*Math.PI)) * Math.sqrt(v.k*1000/v.m) : Infinity; } }] },
          { id: 'mc_m23', name: '탄성 변형 에너지', icon: '⚡', desc: '응력, 변형률 및 부피로부터 재료에 저장된 탄성 변형 에너지를 구합니다.', formula: { text: 'U = ½ × σ × ε × V', vars: [] }, modes: [{ id: 'm', label: '에너지 계산', inputs: [{ id: 's', label: '응력 (σ)', unit: 'MPa' }, { id: 'e', label: '변형률 (ε)', unit: '' }, { id: 'vol', label: '부피 (V)', unit: 'cm³' }], rLabel: '변형 에너지 (U)', rUnit: 'J', calc: function(v) { return 0.5 * v.s * v.e * (v.vol / 1000); } }] },
          { id: 'mc_m24', name: '비틀림 전단 응력', icon: '🔄', desc: '토크(T), 반경(r) 및 극단면 2차모멘트(Ip)로부터 비틀림 전단응력을 구합니다.', formula: { text: 'τ = T × r / Ip', vars: [] }, modes: [{ id: 'm', label: '전단응력 계산', inputs: [{ id: 't', label: '토크 (T)', unit: 'N·m' }, { id: 'r', label: '축 반경 (r)', unit: 'mm' }, { id: 'ip', label: '극단면 모멘트', unit: 'mm⁴' }], rLabel: '전단 응력 (τ)', rUnit: 'MPa', calc: function(v) { return v.ip ? (v.t * 1000 * v.r) / v.ip : Infinity; } }] }
        ]
      },
      {
        id: 'mech_thermal_fluid',
        name: '열·유체 및 에너지',
        calculators: [
          { id: 'mc_m7', name: '연속 방정식', icon: '🌊', desc: '면적 변화에 따른 속도 변화를 구합니다.', formula: { text: 'v2 = v1 × A1 / A2', vars: [] }, modes: [{ id: 'm', label: 'v2 계산', inputs: [{ id: 'v1', label: 'v1', unit: 'm/s' }, { id: 'a1', label: 'A1', unit: 'mm²' }, { id: 'a2', label: 'A2', unit: 'mm²' }], rLabel: 'v2', rUnit: 'm/s', calc: function(v) { return v.a2 ? v.v1 * v.a1 / v.a2 : Infinity; } }] },
          { id: 'mc_m8', name: '카르노 효율', icon: '🔥', desc: '온도 한계값에서 카르노 효율을 구합니다.', formula: { text: 'η = 1 - T_low / T_high', vars: [] }, modes: [{ id: 'm', label: '효율 계산', inputs: [{ id: 'th', label: '고온', unit: '°C' }, { id: 'tl', label: '저온', unit: '°C' }], rLabel: '효율', rUnit: '%', calc: function(v) { var h = v.th+273.15; var l = v.tl+273.15; return h ? (1 - l/h)*100 : 0; } }] },
          { id: 'mc_m9', name: '열전도량', icon: '🧱', desc: '열전도 면적 및 두께에 따른 열전달율을 구합니다.', formula: { text: 'Q = k × A × ΔT / L', vars: [] }, modes: [{ id: 'm', label: '전도 열량', inputs: [{ id: 'k', label: '전도율', unit: 'W/m·K' }, { id: 'a', label: '면적', unit: 'm²' }, { id: 'dt', label: '온도차', unit: '°C' }, { id: 'l', label: '두께', unit: 'mm' }], rLabel: 'Q', rUnit: 'W', calc: function(v) { return v.l ? (v.k * v.a * v.dt) / (v.l/1000) : Infinity; } }] },
          { id: 'mc_m18', name: '난방 성적계수', icon: '❄️', desc: 'COP_heat = COP_cool + 1 관계를 구합니다.', formula: { text: 'COP_h = COP_c + 1', vars: [] }, modes: [{ id: 'm', label: '난방 COP 계산', inputs: [{ id: 'c', label: '냉방 COP', unit: '' }], rLabel: '난방 COP', rUnit: '', calc: function(v) { return v.c + 1; } }] },
          { id: 'mc_m19', name: '태양전지 변환효율', icon: '☀️', desc: '출력과 입사 태양 에너지로부터 변환효율을 구합니다.', formula: { text: 'η = P_max / (Pin × A) × 100', vars: [] }, modes: [{ id: 'm', label: '효율 계산', inputs: [{ id: 'p', label: '최대출력', unit: 'W' }, { id: 'i', label: '입사강도', unit: 'W/m²' }, { id: 'a', label: '모듈면적', unit: 'm²' }], rLabel: '변환효율', rUnit: '%', calc: function(v) { var denom = v.i * v.a; return denom ? (v.p / denom) * 100 : 0; } }] },
          { id: 'mc_m25', name: '이상기체 상태방정식 압력', icon: '🌬️', desc: '몰 수, 온도, 부피로부터 압력(P)을 계산합니다.', formula: { text: 'P = n × R × T / V', vars: [] }, modes: [{ id: 'm', label: '압력 계산', inputs: [{ id: 'n', label: '몰 수 (n)', unit: 'mol' }, { id: 'temp', label: '온도 (T)', unit: 'K' }, { id: 'vol', label: '부피 (V)', unit: 'L' }], rLabel: '기체 압력 (P)', rUnit: 'kPa', calc: function(v) { return v.vol ? (v.n * 8.314 * v.temp) / v.vol : Infinity; } }] },
          { id: 'mc_m26', name: '베르누이 동압력', icon: '🌊', desc: '유체 밀도와 속도로부터 동압(Dynamic Pressure)을 구합니다.', formula: { text: 'q = ½ × ρ × v²', vars: [] }, modes: [{ id: 'm', label: '동압 계산', inputs: [{ id: 'rho', label: '유체 밀도 (ρ)', unit: 'kg/m³' }, { id: 'vel', label: '유속 (v)', unit: 'm/s' }], rLabel: '동압 (q)', rUnit: 'Pa', calc: function(v) { return 0.5 * v.rho * v.vel * v.vel; } }] }
        ]
      },
      {
        id: 'mech_design_cam',
        name: '기계설계 및 CAM',
        calculators: [
          { id: 'mc_m5', name: '축 허용 토크', icon: '🔄', desc: '지름과 허용 전단응력으로부터 최대 허용 토크를 구합니다.', formula: { text: 'T = π×d³×τ / 16', vars: [] }, modes: [{ id: 'm', label: '토크 계산', inputs: [{ id: 'd', label: '축지름', unit: 'mm' }, { id: 't', label: '허용전단응력', unit: 'MPa' }], rLabel: '허용토크', rUnit: 'N·m', calc: function(v) { return (Math.PI * Math.pow(v.d, 3) * v.t) / 16000; } }] },
          { id: 'mc_m6', name: '3D 프린팅 시간', icon: '⏱️', desc: '체적과 토출 속도로부터 시간을 구합니다.', formula: { text: 't = V / Q', vars: [] }, modes: [{ id: 'm', label: '시간 계산', inputs: [{ id: 'v', label: '모델체적', unit: 'cm³' }, { id: 'q', label: '토출속도', unit: 'mm³/s' }], rLabel: '시간', rUnit: '분', calc: function(v) { return v.q ? (v.v*1000/v.q)/60 : Infinity; } }] },
          { id: 'mc_m12', name: '스퍼기어 허용 하중', icon: '⚙️', desc: '허용 굽힘응력과 잇수로부터 기어의 허용 전달력을 산출합니다.', formula: { text: 'Ft = σ × b × m × Y', vars: [] }, modes: [{ id: 'm', label: '허용하중 계산', inputs: [{ id: 's', label: '허용응력', unit: 'MPa' }, { id: 'b', label: '이폭', unit: 'mm' }, { id: 'm', label: '모듈', unit: 'mm' }, { id: 'y', label: '치형계수(Y)', unit: '' }], rLabel: '허용하중', rUnit: 'N', calc: function(v) { return v.s * v.b * v.m * v.y; } }] },
          { id: 'mc_m20', name: '베어링 마찰계수', icon: '🍯', desc: '허시 다이어그램 기준 마찰계수 관계를 구합니다.', formula: { text: 'f ≈ K × Zn/P', vars: [] }, modes: [{ id: 'm', label: '마찰계수 계산', inputs: [{ id: 'z', label: '윤활유 점도', unit: 'cP' }, { id: 'n', label: '회전 속도', unit: 'RPM' }, { id: 'p', label: '베어링 압력', unit: 'MPa' }], rLabel: '마찰 계수 (f)', rUnit: '×10⁻³', calc: function(v) { return v.p ? (v.z * v.n) / (v.p * 1000) * 0.38 : 0; } }] },
          { id: 'mc_m27', name: '사각나사 리드 스크루 효율', icon: '🔩', desc: '나사 리드각(α)과 마찰각(ρ)으로부터 회전 운동 전동 효율을 구합니다.', formula: { text: 'Eff = tan(α) / tan(α + ρ) × 100', vars: [] }, modes: [{ id: 'm', label: '효율 계산', inputs: [{ id: 'a', label: '리드각 (α)', unit: '°' }, { id: 'r', label: '마찰각 (ρ)', unit: '°' }], rLabel: '전동 효율', rUnit: '%', calc: function(v) { var denom = Math.tan((v.a + v.r) * Math.PI / 180); return denom ? (Math.tan(v.a * Math.PI / 180) / denom) * 100 : 0; } }] }
        ]
      },
      {
        id: 'mech_prod_mfg',
        name: '생산 및 제조공학',
        calculators: [
          { id: 'mc_m13', name: '생산 리드 타임', icon: '⏱️', desc: '준비시간과 가공시간의 합을 구합니다.', formula: { text: 'LT = Setup + Run × Q', vars: [] }, modes: [{ id: 'm', label: '리드타임 계산', inputs: [{ id: 's', label: '준비시간', unit: '분' }, { id: 'r', label: '개당 가공시간', unit: '분' }, { id: 'q', label: '생산수량', unit: '개' }], rLabel: '리드타임', rUnit: '분', calc: function(v) { return v.s + v.r * v.q; } }] },
          { id: 'mc_m14', name: '선반 절삭력', icon: '⚙️', desc: '비절삭저항과 절삭면적으로부터 절삭력을 구합니다.', formula: { text: 'Fc = ks × A', vars: [] }, modes: [{ id: 'm', label: '절삭력 계산', inputs: [{ id: 'ks', label: '비절삭저항', unit: 'N/mm²' }, { id: 'a', label: '절삭면적', unit: 'mm²' }], rLabel: '절삭력', rUnit: 'N', calc: function(v) { return v.ks * v.a; } }] },
          { id: 'mc_m29', name: '테일러 공구 수명 방정식', icon: '⏱️', desc: '속도와 지수 상수 조건에서 절삭공구 수명(T)을 계산합니다.', formula: { text: 'T = (C / V)^(1/n)', vars: [] }, modes: [{ id: 'm', label: '수명 계산', inputs: [{ id: 'v', label: '절삭 속도 (V)', unit: 'm/min' }, { id: 'c', label: '공구상수 (C)', unit: '' }, { id: 'n', label: '지수 (n)', unit: '0.1~0.5' }], rLabel: '공구 수명 (T)', rUnit: 'min', calc: function(v) { return (v.v && v.n) ? Math.pow(v.c / v.v, 1/v.n) : Infinity; } }] }
        ]
      },
      {
        id: 'mech_sys_app',
        name: '시스템 및 응용',
        calculators: [
          { id: 'mc_m16', name: '2축 로봇 도달 범위', icon: '🤖', desc: '두 링크의 길이를 더해 최대 길이를 구합니다.', formula: { text: 'R = L1 + L2', vars: [] }, modes: [{ id: 'm', label: '최대 도달거리', inputs: [{ id: 'l1', label: '링크1 길이', unit: 'mm' }, { id: 'l2', label: '링크2 길이', unit: 'mm' }], rLabel: '도달범위', rUnit: 'mm', calc: function(v) { return v.l1 + v.l2; } }] },
          { id: 'mc_m17', name: '엔진 배기량', icon: '🚗', desc: '실린더 보어와 행정(스트로크)으로부터 전체 배기량을 구합니다.', formula: { text: 'Disp = π/4 × d² × S × N', vars: [] }, modes: [{ id: 'm', label: '배기량 계산', inputs: [{ id: 'd', label: '실린더보어', unit: 'mm' }, { id: 's', label: '스트로크', unit: 'mm' }, { id: 'n', label: '기통수', unit: '기통' }], rLabel: '배기량', rUnit: 'cc', calc: function(v) { return (Math.PI/4) * v.d * v.d * v.s * v.n / 1000; } }] },
          { id: 'mc_m32', name: '자동차 제동 거리', icon: '🚗', desc: '차량 속도와 노면 마찰계수 조건에서 제동 제어 거리를 구합니다.', formula: { text: 'd = v² / (2 × g × μ)', vars: [] }, modes: [{ id: 'm', label: '제동거리 산출', inputs: [{ id: 'v', label: '차량 속도', unit: 'km/h' }, { id: 'mu', label: '마찰 계수 (μ)', unit: '' }], rLabel: '제동 거리', rUnit: 'm', calc: function(v) { var v_ms = v.v / 3.6; var denom = 2 * 9.81 * v.mu; return denom ? (v_ms * v_ms) / denom : Infinity; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_elec',
    name: '전기공학',
    icon: '⚡',
    color: '#3b82f6',
    subcategories: [
      {
        id: 'elec_basics_circuit',
        name: '기초 및 회로이론',
        calculators: [
          { id: 'el_e1', name: '커패시터 에너지', icon: '🔌', desc: '용량과 전압으로부터 축적 에너지를 구합니다.', formula: { text: 'E = ½ × C × V²', vars: [] }, modes: [{ id: 'm', label: '에너지 계산', inputs: [{ id: 'c', label: '정전용량', unit: 'μF' }, { id: 'v', label: '전압', unit: 'V' }], rLabel: '에너지 (E)', rUnit: 'J', calc: function(v) { return 0.5 * (v.c / 1000000) * v.v * v.v; } }] },
          { id: 'el_e2', name: '평행판 정전용량', icon: '⚡', desc: '유전율, 면적, 간격으로부터 커패시턴스를 구합니다.', formula: { text: 'C = ε0 × εr × A / d', vars: [] }, modes: [{ id: 'm', label: '용량 계산', inputs: [{ id: 'er', label: '비유전율', unit: '' }, { id: 'a', label: '전극면적', unit: 'm²' }, { id: 'd', label: '전극간격', unit: 'mm' }], rLabel: '정전용량 (C)', rUnit: 'nF', calc: function(v) { return v.d ? (8.854e-12 * v.er * v.a) / (v.d/1000) * 1e9 : Infinity; } }] },
          { id: 'el_e14', name: '배율기 저항', icon: '🔌', desc: '전압계 측정 범위 확대를 위한 배율기 저항(Rm)을 구합니다.', formula: { text: 'Rm = Rv × (m - 1)', vars: [] }, modes: [{ id: 'm', label: '배율기저항 계산', inputs: [{ id: 'rv', label: '전압계 내부저항', unit: 'kΩ' }, { id: 'm', label: '배율 (m)', unit: '배' }], rLabel: '배율기저항', rUnit: 'kΩ', calc: function(v) { return v.rv * (v.m - 1); } }] }
        ]
      },
      {
        id: 'elec_machine_facility',
        name: '전기기기 및 설비',
        calculators: [
          { id: 'el_e3', name: '변압기 무부하 전류', icon: '🌀', desc: '철손전류와 자화전류로부터 무부하전류를 구합니다.', formula: { text: 'I0 = √(Ii² + Im²)', vars: [] }, modes: [{ id: 'm', label: '전류 계산', inputs: [{ id: 'ii', label: '철손전류', unit: 'A' }, { id: 'im', label: '자화전류', unit: 'A' }], rLabel: '무부하전류', rUnit: 'A', calc: function(v) { return Math.sqrt(v.ii*v.ii + v.im*v.im); } }] },
          { id: 'el_e10', name: '허용 전류', icon: '🔌', desc: '전선 단면적에 대한 기준 허용 전류를 추정합니다.', formula: { text: 'I = 8.5 × A^0.62', vars: [] }, modes: [{ id: 'm', label: '단상 허용전류', inputs: [{ id: 'a', label: '구리 단면적', unit: 'mm²' }], rLabel: '허용전류', rUnit: 'A', calc: function(v) { return 8.5 * Math.pow(v.a, 0.62); } }] },
          { id: 'el_e11', name: '구전극 방전 전압', icon: '⚡', desc: '대칭 구전극 반경 and 간격으로부터 불평등 전계 방전 전압을 추정합니다.', formula: { text: 'Vs = 27.2 × d', vars: [] }, modes: [{ id: 'm', label: '방전 전압 계산', inputs: [{ id: 'd', label: '구 전극 간격', unit: 'cm' }], rLabel: '방전 전압', rUnit: 'kV', calc: function(v) { return 27.2 * v.d; } }] },
          { id: 'el_e12', name: '소자 저항 계산', icon: '🌀', desc: '재료 고유 저항률로부터 소자 저항을 구합니다.', formula: { text: 'R = ρ × L / A', vars: [] }, modes: [{ id: 'm', label: '소자 저항 계산', inputs: [{ id: 'rho', label: '고유 저항률', unit: 'μΩ·m' }, { id: 'l', label: '재료 길이', unit: 'm' }, { id: 'a', label: '단면적', unit: 'mm²' }], rLabel: '저항', rUnit: 'Ω', calc: function(v) { return v.a ? (v.rho * 1e-6 * v.l) / (v.a * 1e-6) : Infinity; } }] },
          { id: 'el_e15', name: '접촉 전압 제한', icon: '⚠️', desc: '인체 안전 허용 접촉 전압을 계산합니다.', formula: { text: 'Vc = I_body × R_body', vars: [] }, modes: [{ id: 'm', label: '안전 접촉전압', inputs: [{ id: 'i', label: '안전 인체전류', unit: 'mA' }, { id: 'r', label: '인체 저항', unit: 'Ω' }], rLabel: '허용 접촉전압', rUnit: 'V', calc: function(v) { return (v.i / 1000) * v.r; } }] }
        ]
      },
      {
        id: 'elec_power_energy',
        name: '전력 및 에너지',
        calculators: [
          { id: 'el_e4', name: '단상 수전단 유효전력', icon: '📈', desc: '수전단 전압, 전류 및 역률을 곱해 유효전력을 구합니다.', formula: { text: 'P = V × I × cos(θ)', vars: [] }, modes: [{ id: 'm', label: '유효전력', inputs: [{ id: 'v', label: '수전전압', unit: 'V' }, { id: 'i', label: '수전전류', unit: 'A' }, { id: 'pf', label: '역률 (cosθ)', unit: '0~1' }], rLabel: '유효전력', rUnit: 'kW', calc: function(v) { return (v.v * v.i * v.pf) / 1000; } }] },
          { id: 'el_e5', name: '송전효율', icon: '🔌', desc: '수전전력과 송전전력의 비율로부터 효율을 구합니다.', formula: { text: 'Eff = Pr / Ps × 100', vars: [] }, modes: [{ id: 'm', label: '송전효율 계산', inputs: [{ id: 'pr', label: '수전전력', unit: 'kW' }, { id: 'ps', label: '송전전력', unit: 'kW' }], rLabel: '송전효율', rUnit: '%', calc: function(v) { return v.ps ? (v.pr / v.ps) * 100 : 0; } }] },
          { id: 'el_e6', name: '가스터빈 효율', icon: '🔥', desc: '출력과 공급 연료 열량으로부터 발전 효율을 구합니다.', formula: { text: 'η = P_gen / Q_fuel × 100', vars: [] }, modes: [{ id: 'm', label: '가스터빈 효율', inputs: [{ id: 'p', label: '발전출력', unit: 'MW' }, { id: 'q', label: '연료공급열량', unit: 'MW' }], rLabel: '가스터빈효율', rUnit: '%', calc: function(v) { return v.q ? (v.p / v.q) * 100 : 0; } }] },
          { id: 'el_e13', name: '태양전지 충진율', icon: '☀️', desc: '태양전지의 최대전력출력과 개방전압/단락전류 곱의 비를 구합니다.', formula: { text: 'FF = P_max / (Voc × Isc)', vars: [] }, modes: [{ id: 'm', label: '충진율(FF) 계산', inputs: [{ id: 'pm', label: '최대출력 (Pm)', unit: 'W' }, { id: 'voc', label: '개방전압 (Voc)', unit: 'V' }, { id: 'isc', label: '단락전류 (Isc)', unit: 'A' }], rLabel: '충진율 (FF)', rUnit: '', calc: function(v) { var denom = v.voc * v.isc; return denom ? v.pm / denom : 0; } }] }
        ]
      },
      {
        id: 'elec_control_auto',
        name: '제어 및 자동화',
        calculators: [
          { id: 'el_e7', name: '비례 제어기 이득', icon: '📈', desc: '오차값과 Kp 이득을 곱해 출력값을 계산합니다.', formula: { text: 'u = Kp × e', vars: [] }, modes: [{ id: 'm', label: '제어출력 계산', inputs: [{ id: 'kp', label: 'Kp 이득', unit: '' }, { id: 'e', label: '오차 e', unit: '' }], rLabel: '제어출력 (u)', rUnit: '', calc: function(v) { return v.kp * v.e; } }] },
          { id: 'el_e8', name: '감쇠계 진동 정착 시간', icon: '🔄', desc: '시정수(τ) 기준 2% 오차 이내 정착 시간(ts)을 구합니다.', formula: { text: 'ts ≈ 4 × τ', vars: [] }, modes: [{ id: 'm', label: '정착시간 계산', inputs: [{ id: 'tau', label: '시정수 (τ)', unit: 's' }], rLabel: '정착시간 (ts)', rUnit: 's', calc: function(v) { return 4 * v.tau; } }] },
          { id: 'el_e9', name: 'Buck 전압 리플', icon: '⚡', desc: '주파수, 인덕터, 커패시터 조건에서 출력 리플률을 산출합니다.', formula: { text: 'Vr = V_out × (1-D) / (8 × L × C × f²)', vars: [] }, modes: [{ id: 'm', label: '리플율 계산', inputs: [{ id: 'vo', label: '출력 전압', unit: 'V' }, { id: 'd', label: '듀티 (D)', unit: '0~1' }, { id: 'l', label: '인덕터', unit: 'μH' }, { id: 'c', label: '커패시터', unit: 'μF' }, { id: 'f', label: '스위칭 주파수', unit: 'kHz' }], rLabel: '리플 전압', rUnit: 'mV', calc: function(v) { var L = v.l * 1e-6; var C = v.c * 1e-6; var F = v.f * 1000; var denom = 8 * L * C * F * F; return denom ? ((v.vo * (1 - v.d)) / denom) * 1000 : Infinity; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_electronics',
    name: '전자공학',
    icon: '📟',
    color: '#6366f1',
    subcategories: [
      {
        id: 'elec_circ_analog',
        name: '회로 및 아날로그',
        calculators: [
          { id: 'ec_elc1', name: 'OP-AMP 반전 증폭기', icon: '📈', desc: '반전 회로 저항비 전압이득을 구합니다.', formula: { text: 'Av = - Rf / Rin', vars: [] }, modes: [{ id: 'm', label: '이득 계산', inputs: [{ id: 'rf', label: 'Rf 저항', unit: 'kΩ' }, { id: 'ri', label: 'Rin 저항', unit: 'kΩ' }], rLabel: '전압 이득 (Av)', rUnit: '배', calc: function(v) { return v.ri ? -(v.rf / v.ri) : Infinity; } }] },
          { id: 'ec_elc3', name: '비반전 버퍼 출력', icon: '📈', desc: '아날로그 전압 버퍼의 출력 기전력을 구합니다.', formula: { text: 'Vout = Vin', vars: [] }, modes: [{ id: 'm', label: '전압 출력', inputs: [{ id: 'v', label: '입력 전압 (Vin)', unit: 'V' }], rLabel: '출력 전압 (Vout)', rUnit: 'V', calc: function(v) { return v.v; } }] },
          { id: 'ec_elc12', name: '반사 손실 (Return Loss)', icon: '📡', desc: '전압반사계수로부터 반사 손실(RL)을 계산합니다.', formula: { text: 'RL = -20log10(|Γ|)', vars: [] }, modes: [{ id: 'm', label: '반사손실 계산', inputs: [{ id: 'g', label: '반사계수 절대값 |Γ|', unit: '0~1' }], rLabel: '반사 손실', rUnit: 'dB', calc: function(v) { return v.g > 0 ? -20 * Math.log10(v.g) : Infinity; } }] },
          { id: 'ec_elc13', name: '광섬유 개구수 (NA)', icon: '☀️', desc: '코어와 클래드 굴절률차로부터 광섬유 개구수(NA)를 구합니다.', formula: { text: 'NA = √(n1² - n2²)', vars: [] }, modes: [{ id: 'm', label: '개구수 NA 계산', inputs: [{ id: 'n1', label: '코어 굴절률 (n1)', unit: '' }, { id: 'n2', label: '클래드 굴절률 (n2)', unit: '' }], rLabel: '개구수 (NA)', rUnit: '', calc: function(v) { var inside = v.n1*v.n1 - v.n2*v.n2; return inside >= 0 ? Math.sqrt(inside) : 0; } }] }
        ]
      },
      {
        id: 'elec_dig_comp',
        name: '디지털 및 컴퓨터',
        calculators: [
          { id: 'ec_elc2', name: '디지털 전파 지연', icon: '🔢', desc: '게이트 단 수와 단위 딜레이로부터 총 지연을 계산합니다.', formula: { text: 'Tpd = N × t_gate', vars: [] }, modes: [{ id: 'm', label: '지연시간 계산', inputs: [{ id: 'n', label: '게이트 단 수', unit: '단' }, { id: 'tg', label: '단위 게이트 지연', unit: 'ns' }], rLabel: '총 지연 시간', rUnit: 'ns', calc: function(v) { return v.n * v.tg; } }] },
          { id: 'ec_elc9', name: '인스트럭션 처리 속도', icon: '⏱️', desc: 'CPU 동작 주파수와 CPI 조건에서 MIPS를 산출합니다.', formula: { text: 'MIPS = F_clk / CPI', vars: [] }, modes: [{ id: 'm', label: 'MIPS 계산', inputs: [{ id: 'f', label: '클럭 속도', unit: 'MHz' }, { id: 'cpi', label: '평균 CPI', unit: 'cycle' }], rLabel: '성능 지수', rUnit: 'MIPS', calc: function(v) { return v.cpi ? v.f / v.cpi : Infinity; } }] },
          { id: 'ec_elc10', name: 'I2C 버스 전송 시간', icon: '🔌', desc: '클럭 속도와 전송 데이터 크기로부터 I2C 지연을 계산합니다.', formula: { text: 't = bits / F_scl', vars: [] }, modes: [{ id: 'm', label: '전송 시간 계산', inputs: [{ id: 'bits', label: '전송 비트수(주소포함)', unit: 'bit' }, { id: 'fscl', label: 'I2C 클럭 속도', unit: 'kHz' }], rLabel: '전송 시간', rUnit: 'ms', calc: function(v) { return v.fscl ? v.bits / v.fscl : Infinity; } }] },
          { id: 'ec_elc11', name: 'LUT 소요량 추정', icon: '⚡', desc: '논리 함수 입력 조건 수로부터 필요 6입력 LUT 개수를 대략 추정합니다.', formula: { text: 'LUTs = 2^(N - 6)', vars: [] }, modes: [{ id: 'm', label: 'LUT 개수 계산', inputs: [{ id: 'n', label: '동시입력 변수 개수', unit: '개' }], rLabel: '필요 LUT 수', rUnit: '개', calc: function(v) { return v.n > 6 ? Math.pow(2, v.n - 6) : 1; } }] }
        ]
      },
      {
        id: 'elec_semi_ic',
        name: '반도체 및 집적회로',
        calculators: [
          { id: 'ec_elc4', name: 'pn접합 내장 전위', icon: '🔬', desc: '반도체 접합부 도핑 농도로부터 빌트인 포텐셜(Vbi)을 구합니다.', formula: { text: 'Vbi = Vt × ln(Na×Nd / ni²)', vars: [] }, modes: [{ id: 'm', label: 'Vbi 계산', inputs: [{ id: 'na', label: 'Acceptor Na', unit: 'cm⁻³' }, { id: 'nd', label: 'Donor Nd', unit: 'cm⁻³' }, { id: 't', label: '절대온도', unit: 'K' }], rLabel: '내장 전위 (Vbi)', rUnit: 'V', calc: function(v) { var Vt = 8.617e-5 * v.t; var num = v.na * v.nd; var ni2 = 2.25e20; return num > 0 ? Vt * Math.log(num / ni2) : 0; } }] },
          { id: 'ec_elc5', name: 'MOS 피드백 전류', icon: '🖥️', desc: '포화 영역 MOSFET의 드레인 전류(Id)를 계산합니다.', formula: { text: 'Id = ½ × Kn × (Vgs - Vth)²', vars: [] }, modes: [{ id: 'm', label: '포화 드레인 전류', inputs: [{ id: 'kn', label: '전도도 계수 (Kn)', unit: 'mA/V²' }, { id: 'vgs', label: '게이트-소스 전압', unit: 'V' }, { id: 'vth', label: '문턱전압 (Vth)', unit: 'V' }], rLabel: '드레인 전류 (Id)', rUnit: 'mA', calc: function(v) { return v.vgs > v.vth ? 0.5 * v.kn * Math.pow(v.vgs - v.vth, 2) : 0; } }] }
        ]
      },
      {
        id: 'elec_signals_sys',
        name: '신호 및 시스템',
        calculators: [
          { id: 'ec_elc6', name: '자유공간 경로 손실', icon: '📡', desc: '주파수와 거리 조건에서 자유공간 전파 손실(FSPL)을 구합니다.', formula: { text: 'FSPL = 20log10(d) + 20log10(f) + 32.44', vars: [] }, modes: [{ id: 'm', label: '경로손실 계산', inputs: [{ id: 'd', label: '송수신 거리', unit: 'km' }, { id: 'f', label: '주파수', unit: 'MHz' }], rLabel: '전파 손실', rUnit: 'dB', calc: function(v) { return (v.d > 0 && v.f > 0) ? 20 * Math.log10(v.d) + 20 * Math.log10(v.f) + 32.44 : 0; } }] },
          { id: 'ec_elc7', name: '주파수 응답 극점', icon: '📊', desc: '1차 시스템 전달함수 1/(s+a)의 차단 극 주파수를 구합니다.', formula: { text: 'fc = a / 2π', vars: [] }, modes: [{ id: 'm', label: '극주파수 계산', inputs: [{ id: 'a', label: '극점상수 (a)', unit: '' }], rLabel: '극주파수 (fc)', rUnit: 'Hz', calc: function(v) { return v.a / (2 * Math.PI); } }] },
          { id: 'ec_elc8', name: 'DFT 주파수 해상도', icon: '🎙️', desc: '샘플링 속도와 포인트 수로부터 주파수 분해능을 구합니다.', formula: { text: 'df = fs / N', vars: [] }, modes: [{ id: 'm', label: '주파수해상도 계산', inputs: [{ id: 'fs', label: '샘플링 주파수', unit: 'Hz' }, { id: 'n', label: 'DFT 포인트 수 (N)', unit: '개' }], rLabel: '분해능 (df)', rUnit: 'Hz', calc: function(v) { return v.n ? v.fs / v.n : Infinity; } }] },
          { id: 'ec_elc14', name: '홀 센서 감도 전압', icon: '🌡️', desc: '홀 계수, 전류 및 자기장 밀도로부터 홀 기전력 전압(Vh)을 구합니다.', formula: { text: 'Vh = Rh × I × B / t', vars: [] }, modes: [{ id: 'm', label: '홀 전압 계산', inputs: [{ id: 'rh', label: '홀 계수 (Rh)', unit: 'm³/C' }, { id: 'i', label: '공급 전류', unit: 'A' }, { id: 'b', label: '자기장 밀도', unit: 'T' }, { id: 't', label: '반도체 소자 두께', unit: 'mm' }], rLabel: '홀 전압 (Vh)', rUnit: 'μV', calc: function(v) { return v.t ? (v.rh * v.i * v.b) / (v.t/1000) * 1e6 : Infinity; } }] },
          { id: 'ec_elc15', name: '2D 컨볼루션 필터 이득', icon: '📸', desc: '3x3 영상 필터 커널 셀의 총합 이득을 산출합니다.', formula: { text: 'Gain = Sum(Kernel)', vars: [] }, modes: [{ id: 'm', label: '커널 합산', inputs: [{ id: 'c', label: '센터 픽셀 가중치', unit: '' }, { id: 'n', label: '상하좌우 픽셀 가중치', unit: '' }], rLabel: '종합 이득', rUnit: '배', calc: function(v) { return v.c + 4 * v.n; } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_chem',
    name: '화학공학',
    icon: '🧪',
    color: '#10b981',
    subcategories: [
      {
        id: 'chem_basics_stoich',
        name: '기초화학 및 양론',
        calculators: [
          { id: 'ch_c1', name: '희석 법칙 용액 몰농도', icon: '🧪', desc: '용액 희석 시 농도와 부피 변화를 구합니다.', formula: { text: 'M2 = M1 × V1 / V2', vars: [] }, modes: [{ id: 'm', label: '희석농도 계산', inputs: [{ id: 'm1', label: '원액농도 (M1)', unit: 'M' }, { id: 'v1', label: '취한부피 (V1)', unit: 'mL' }, { id: 'v2', label: '최종부피 (V2)', unit: 'mL' }], rLabel: '최종 농도 (M2)', rUnit: 'M', calc: function(v) { return v.v2 ? (v.m1 * v.v1) / v.v2 : Infinity; } }] },
          { id: 'ch_c2', name: '평균 분자량 계산', icon: '🎈', desc: '혼합 가스의 몰분율로부터 평균 분자량을 계산합니다.', formula: { text: 'Mw = y1×Mw1 + y2×Mw2', vars: [] }, modes: [{ id: 'm', label: '평균 분자량', inputs: [{ id: 'y1', label: '성분 1 몰분율', unit: '0~1' }, { id: 'm1', label: '성분 1 분자량', unit: 'g/mol' }, { id: 'm2', label: '성분 2 분자량', unit: 'g/mol' }], rLabel: '평균 분자량', rUnit: 'g/mol', calc: function(v) { return v.y1 * v.m1 + (1 - v.y1) * v.m2; } }] },
          { id: 'ch_c14', name: '아닐린점 오일 성상', icon: '⛽', desc: '아닐린점과 비중으로부터 디젤 지수(DI)를 구합니다.', formula: { text: 'DI = Aniline_Pt × API / 100', vars: [] }, modes: [{ id: 'm', label: '디젤지수 계산', inputs: [{ id: 'ap', label: '아닐린점', unit: '°F' }, { id: 'api', label: 'API 비중', unit: '' }], rLabel: '디젤 지수', rUnit: '', calc: function(v) { return (v.ap * v.api) / 100; } }] },
          { id: 'ch_c15', name: '패러데이 법칙 전착량', icon: '🔋', desc: '전류와 통전 시간으로부터 전해 전기량 도금 중량을 계산합니다.', formula: { text: 'W = I × t × M / (z × F)', vars: [] }, modes: [{ id: 'm', label: '도금 전착 질량', inputs: [{ id: 'i', label: '전류 (I)', unit: 'A' }, { id: 't', label: '시간 (t)', unit: 's' }, { id: 'mw', label: '금속 몰질량 (M)', unit: 'g/mol' }, { id: 'z', label: '반응가수 (z)', unit: '' }], rLabel: '이론 전착량 (W)', rUnit: 'g', calc: function(v) { var F = 96485; var denom = v.z * F; return denom ? (v.i * v.t * v.mw) / denom : 0; } }] }
        ]
      },
      {
        id: 'chem_thermo_reaction',
        name: '화학열역학 및 반응',
        calculators: [
          { id: 'ch_c3', name: '반응 열량(엔탈피)', icon: '🔥', desc: '화학 반응 엔탈피 변화값을 열량값(Q)으로 계산합니다.', formula: { text: 'Q = n × ΔH', vars: [] }, modes: [{ id: 'm', label: '반응열 계산', inputs: [{ id: 'n', label: '반응 물질량 (n)', unit: 'mol' }, { id: 'dh', label: '표준반응 엔탈피', unit: 'kJ/mol' }], rLabel: '반응 방출열', rUnit: 'kJ', calc: function(v) { return v.n * v.dh; } }] },
          { id: 'ch_c7', name: 'CSTR 반응기 공간시간', icon: '🔥', desc: 'CSTR의 부피와 공급 유량으로부터 공간시간(τ)을 구합니다.', formula: { text: 'τ = V / v0', vars: [] }, modes: [{ id: 'm', label: '공간시간 계산', inputs: [{ id: 'v', label: '반응기 부피 (V)', unit: 'L' }, { id: 'v0', label: '부피 공급유량 (v0)', unit: 'L/min' }], rLabel: '공간 시간 (τ)', rUnit: '분', calc: function(v) { return v.v0 ? v.v / v.v0 : Infinity; } }] },
          { id: 'ch_c12', name: '촉매 유효도 인자', icon: '⚛️', desc: '실제 반응속도와 내부확산 제한이 없을 때 속도의 비를 계산합니다.', formula: { text: 'Eta = TanH(Phi) / Phi', vars: [] }, modes: [{ id: 'm', label: '유효도 인자 계산', inputs: [{ id: 'phi', label: '틸레 계수 (Phi)', unit: '0.1~5' }], rLabel: '유효도 (η)', rUnit: '', calc: function(v) { return v.phi ? Math.tanh(v.phi) / v.phi : 1; } }] }
        ]
      },
      {
        id: 'chem_transfer_fluid',
        name: '전달현상 및 유체',
        calculators: [
          { id: 'ch_c4', name: '정압 분포 수두', icon: '🌊', desc: '유체 높이에 의한 정압(Static Pressure)을 구합니다.', formula: { text: 'P = ρ × g × h', vars: [] }, modes: [{ id: 'm', label: '수두 정압 계산', inputs: [{ id: 'rho', label: '유체 밀도', unit: 'kg/m³' }, { id: 'h', label: '유체 높이 (h)', unit: 'm' }], rLabel: '정적 압력', rUnit: 'kPa', calc: function(v) { return (v.rho * 9.81 * v.h) / 1000; } }] },
          { id: 'ch_c5', name: '원통벽 전도 열저항', icon: '🧱', desc: '배관 및 원통형 형상의 반경비 전도 열저항을 구합니다.', formula: { text: 'R = ln(ro/ri) / (2π × k × L)', vars: [] }, modes: [{ id: 'm', label: '원통 열저항 계산', inputs: [{ id: 'ro', label: '외경 반경 (ro)', unit: 'mm' }, { id: 'ri', label: '내경 반경 (ri)', unit: 'mm' }, { id: 'k', label: '재질 전도율', unit: 'W/m·K' }, { id: 'l', label: '원통 길이 (L)', unit: 'm' }], rLabel: '열저항 (R)', rUnit: 'K/W', calc: function(v) { var denom = 2 * Math.PI * v.k * v.l; return (denom && v.ri > 0) ? Math.log(v.ro / v.ri) / denom : Infinity; } }] },
          { id: 'ch_c6', name: '기체 대류 물질전달', icon: '🌀', desc: '물질전달 계수와 계면 농도차로부터 성분 선속을 구합니다.', formula: { text: 'Na = ky × (ya1 - ya2)', vars: [] }, modes: [{ id: 'm', label: '전달선속 계산', inputs: [{ id: 'ky', label: '전달계수 (ky)', unit: 'mol/m²·s' }, { id: 'y1', label: '계면 농도 (ya1)', unit: '0~1' }, { id: 'y2', label: '본류 농도 (ya2)', unit: '0~1' }], rLabel: '물질 선속 (Na)', rUnit: 'mol/m²·s', calc: function(v) { return v.ky * (v.y1 - v.y2); } }] }
        ]
      },
      {
        id: 'chem_control_design',
        name: '공정제어 및 설계',
        calculators: [
          { id: 'ch_c8', name: 'PID 제어기 비례이득', icon: '📈', desc: '비례 대역(Proportional Band)으로부터 이득 Kp를 계산합니다.', formula: { text: 'Kp = 100 / PB', vars: [] }, modes: [{ id: 'm', label: '이득 Kp 계산', inputs: [{ id: 'pb', label: '비례 대역 (PB)', unit: '%' }], rLabel: 'Kp 이득', rUnit: '', calc: function(v) { return v.pb ? 100 / v.pb : Infinity; } }] },
          { id: 'ch_c9', name: '오리피스 판 유량계', icon: '📉', desc: '차압계 측정값으로부터 배관 유량을 산출합니다.', formula: { text: 'Q = Cd × A × √(2 × ΔP / ρ)', vars: [] }, modes: [{ id: 'm', label: '체적 유량 계산', inputs: [{ id: 'cd', label: '오리피스 계수', unit: '' }, { id: 'a', label: '오리피스 구멍 면적', unit: 'mm²' }, { id: 'dp', label: '차압측정값 (ΔP)', unit: 'kPa' }, { id: 'rho', label: '유체 밀도 (ρ)', unit: 'kg/m³' }], rLabel: '체적 유량', rUnit: 'L/min', calc: function(v) { var A_m = v.a * 1e-6; var inside = (2 * (v.dp * 1000)) / v.rho; if (inside < 0 || v.rho <= 0) return 0; return v.cd * A_m * Math.sqrt(inside) * 60000; } }] },
          { id: 'ch_c16', name: '가스 폭발 하한계 (LEL)', icon: '⚠️', desc: '르 샤틀리에 법칙을 사용하여 혼합 가스의 폭발 하한 한계(LELm)를 구합니다.', formula: { text: 'LELm = 100 / Sum(yi / LELi)', vars: [] }, modes: [{ id: 'm', label: '2성분 LEL 계산', inputs: [{ id: 'y1', label: '성분 1 몰분율', unit: '%' }, { id: 'l1', label: '성분 1 LEL', unit: '%' }, { id: 'l2', label: '성분 2 LEL', unit: '%' }], rLabel: '혼합가스 LEL', rUnit: '%', calc: function(v) { var y2 = 100 - v.y1; var denom = (v.y1 / v.l1) + (y2 / v.l2); return denom ? 100 / denom : 0; } }] }
        ]
      },
      {
        id: 'chem_unit_polymer',
        name: '단위조작 및 고분자',
        calculators: [
          { id: 'ch_c10', name: '중력 여과 압력', icon: '💧', desc: '유체 기둥 높이 조건에서 중력 여과 필터 유압을 구합니다.', formula: { text: 'P = ρ × g × h', vars: [] }, modes: [{ id: 'm', label: '여과압 계산', inputs: [{ id: 'rho', label: '용액 밀도', unit: 'kg/m³' }, { id: 'h', label: '여과액 높이', unit: 'm' }], rLabel: '여과 정압', rUnit: 'kPa', calc: function(v) { return (v.rho * 9.81 * v.h) / 1000; } }] },
          { id: 'ch_c11', name: '흡착 등온식 (Freundlich)', icon: '🔄', desc: '흡착 평형식으로부터 평형 흡착량(qe)을 구합니다.', formula: { text: 'qe = Kf × Ce^(1/n)', vars: [] }, modes: [{ id: 'm', label: '흡착량 계산', inputs: [{ id: 'kf', label: '흡착 용량 계수', unit: '' }, { id: 'ce', label: '평형 농도', unit: 'mg/L' }, { id: 'n', label: '흡착 강도계수 (n)', unit: '' }], rLabel: '평형 흡착량 (qe)', rUnit: 'mg/g', calc: function(v) { return (v.n && v.ce >= 0) ? v.kf * Math.pow(v.ce, 1/v.n) : 0; } }] },
          { id: 'ch_c13', name: '점도 평균 분자량', icon: '🔗', desc: '마크-하우윈크 식으로부터 고분자의 점도 평균 분자량(Mv)을 산출합니다.', formula: { text: 'Mv = ([η] / K)^(1/a)', vars: [] }, modes: [{ id: 'm', label: '분자량 Mv 계산', inputs: [{ id: 'visc', label: '고유점도 [η]', unit: 'dL/g' }, { id: 'k', label: '상수 K', unit: '×10⁻⁴' }, { id: 'a', label: '상수 a', unit: '0.5~0.8' }], rLabel: '점도평균분자량', rUnit: 'g/mol', calc: function(v) { var K_real = v.k * 1e-4; if (K_real <= 0 || v.a <= 0) return 0; return Math.pow(v.visc / K_real, 1 / v.a); } }] }
        ]
      }
    ]
  },
  {
    id: 'eng_computer',
    name: '컴퓨터공학',
    icon: '💻',
    color: '#0284c7',
    subcategories: [
      {
        id: 'comp_ds_algo',
        name: '자료구조 및 알고리즘',
        calculators: [
          {
            id: 'cs_a1',
            name: '이진 탐색 최대 비교 횟수',
            icon: '🔍',
            desc: '데이터 개수(N)로부터 이진 탐색 시 필요한 최대 탐색 비교 횟수를 구합니다.',
            formula: { text: 'Count = ceil(log2(N))', vars: [] },
            modes: [
              { id: 'bin', label: '비교횟수 계산', inputs: [{ id: 'n', label: '데이터 수 (N)', unit: '개' }], rLabel: '최대 비교 횟수', rUnit: '회', calc: function(v) { return v.n > 0 ? Math.ceil(Math.log2(v.n)) : 0; } }
            ]
          },
          {
            id: 'cs_a2',
            name: '알고리즘 시간 복잡도 연산 횟수',
            icon: '⏱️',
            desc: '데이터 입력 크기 N and 복잡도 유형에 따른 연산 횟수를 산출합니다.',
            formula: { text: 'O(NlogN) = N × log2(N) | O(N²) = N²', vars: [] },
            modes: [
              { id: 'nlogn', label: 'O(N log N) 계산', inputs: [{ id: 'n', label: '데이터 크기 (N)', unit: '개' }], rLabel: '연산 횟수', rUnit: '회', calc: function(v) { return v.n > 0 ? v.n * Math.log2(v.n) : 0; } },
              { id: 'n2', label: 'O(N²) 계산', inputs: [{ id: 'n', label: '데이터 크기 (N)', unit: '개' }], rLabel: '연산 횟수', rUnit: '회', calc: function(v) { return v.n * v.n; } }
            ]
          },
          {
            id: 'cs_a3',
            name: '해시 테이블 충돌 확률 (생일 역설)',
            icon: '💥',
            desc: '해시 테이블 크기(N)와 저장 데이터 수(k)로부터 발생 가능한 충돌 확률을 추정합니다.',
            formula: { text: 'P ≈ 1 - exp(-k(k-1) / 2N)', vars: [] },
            modes: [
              { id: 'collision', label: '충돌 확률 계산', inputs: [{ id: 'n', label: '테이블 크기 (N)', unit: '슬롯' }, { id: 'k', label: '저장 데이터 수 (k)', unit: '개' }], rLabel: '충돌 확률', rUnit: '%', calc: function(v) { if (v.n <= 0 || v.k <= 0) return 0; var exponent = -(v.k * (v.k - 1)) / (2 * v.n); return (1 - Math.exp(exponent)) * 100; } }
            ]
          }
        ]
      },
      {
        id: 'comp_net_security',
        name: '네트워크 및 정보보안',
        calculators: [
          {
            id: 'cs_n1',
            name: '대역폭-지연 곱 (BDP)',
            icon: '📡',
            desc: '네트워크 링크의 대역폭과 왕복 지연시간(RTT)으로부터 통신 회선에 적재할 수 있는 최대 데이터 크기를 구합니다.',
            formula: { text: 'BDP = Bandwidth × RTT', vars: [] },
            modes: [
              { id: 'bdp', label: 'BDP 계산', inputs: [{ id: 'bw', label: '링크 대역폭', unit: 'Mbps' }, { id: 'rtt', label: '지연시간 (RTT)', unit: 'ms' }], rLabel: '최대 적재 데이터', rUnit: 'KB', calc: function(v) { return (v.bw * 1e6 * (v.rtt / 1000)) / 8 / 1024; } }
            ]
          },
          {
            id: 'cs_n2',
            name: 'RSA 암호 모듈러스 (n)',
            icon: '🔑',
            desc: '두 소수 p와 q로부터 공개키 및 개인키 생성의 근간이 되는 모듈러스 값 n을 구합니다.',
            formula: { text: 'n = p × q', vars: [] },
            modes: [
              { id: 'rsa', label: '모듈러스 계산', inputs: [{ id: 'p', label: '소수 p', unit: '' }, { id: 'q', label: '소수 q', unit: '' }], rLabel: '모듈러스 값 (n)', rUnit: '', calc: function(v) { return v.p * v.q; } }
            ]
          },
          {
            id: 'cs_n3',
            name: '암호 브루트포스 돌파 시간',
            icon: '🔓',
            desc: '암호의 키 공간 크기(Bits)와 초당 연산 속도로부터 전체 키를 탐색하는 최대 소요 시간을 구합니다.',
            formula: { text: 'Time = 2^Bits / Speed', vars: [] },
            modes: [
              { id: 'bf', label: '돌파 시간 계산', inputs: [{ id: 'bits', label: '키 길이 (Bits)', unit: 'bit' }, { id: 'speed', label: '초당 해시 속도', unit: 'MH/s' }], rLabel: '최대 탐색 시간', rUnit: '시간', calc: function(v) { var keys = Math.pow(2, v.bits); var speed_hz = v.speed * 1e6; return speed_hz ? (keys / speed_hz) / 3600 : Infinity; } }
            ]
          },
          {
            id: 'cs_n4',
            name: '서브넷 마스크 가용 호스트 수',
            icon: '🌐',
            desc: 'IPv4 서브넷 마스크 비트 수(CIDR)로부터 네트워크당 할당 가능한 유효 호스트 개수를 계산합니다.',
            formula: { text: 'Hosts = 2^(32 - Mask) - 2', vars: [] },
            modes: [
              { id: 'hosts', label: '호스트 수 계산', inputs: [{ id: 'mask', label: '서브넷 비트 (Mask)', unit: 'bit' }], rLabel: '가용 호스트 수', rUnit: '개', calc: function(v) { return v.mask >= 0 && v.mask <= 32 ? Math.pow(2, 32 - v.mask) - 2 : 0; } }
            ]
          }
        ]
      },
      {
        id: 'comp_arch_os',
        name: '컴퓨터 구조 및 운영체제',
        calculators: [
          {
            id: 'cs_c1',
            name: '암달의 법칙 가속비 (Amdahl)',
            icon: '💻',
            desc: '프로그램의 병렬화 비율(P)과 코어 가속률(S) 조건에서 전체 시스템 속도 향상(Speedup) 비율을 구합니다.',
            formula: { text: 'Speedup = 1 / ((1 - P) + P / S)', vars: [] },
            modes: [
              { id: 'amdahl', label: '시스템 가속비 계산', inputs: [{ id: 'p', label: '병렬화 가능 분율 (P)', unit: '0~1' }, { id: 's', label: '병렬 부분 가속률 (S)', unit: '배' }], rLabel: '전체 속도 향상비', rUnit: '배', calc: function(v) { var denom = (1 - v.p) + (v.p / v.s); return denom ? 1 / denom : Infinity; } }
            ]
          },
          {
            id: 'cs_c2',
            name: '캐시 메모리 평균 액세스 시간 (AMAT)',
            icon: '⚡',
            desc: 'L1 캐시 히트 타임, 미스 확률 및 미스 페널티로부터 평균 메모리 액세스 시간(AMAT)을 계산합니다.',
            formula: { text: 'AMAT = HitTime + MissRate × MissPenalty', vars: [] },
            modes: [
              { id: 'amat', label: 'AMAT 계산', inputs: [{ id: 'hit', label: 'L1 캐시 히트타임', unit: 'ns' }, { id: 'rate', label: '미스율 (Miss Rate)', unit: '0~1' }, { id: 'penalty', label: '미스 페널티 지연', unit: 'ns' }], rLabel: '평균 메모리 액세스 시간', rUnit: 'ns', calc: function(v) { return v.hit + v.rate * v.penalty; } }
            ]
          }
        ]
      }
    ]
  }
];
