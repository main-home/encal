window.DATA_DESIGN = {
  id: 'design',
  name: '설계',
  icon: '📐',
  color: '#8b5cf6',
  subcategories: [
    {
      id: 'dsn_tolerance_cad',
      name: '공차 및 CAD',
      calculators: [
        {
          id: 'tolerance_fit',
          name: '끼워맞춤 공차',
          icon: '📐',
          desc: '구멍과 축의 치수를 입력해 헐거움(틈새) 또는 억지(죔새) 수준을 도출합니다.',
          formula: { text: '틈새 = H_min - S_max | 죔새 = S_min - H_max', vars: [] },
          modes: [
            { id: 'fit', label: '헐거운/억지맞춤', inputs: [{ id: 'h_min', label: '구멍 최소경', unit: 'mm' }, { id: 'h_max', label: '구멍 최대경', unit: 'mm' }, { id: 's_min', label: '축 최소경', unit: 'mm' }, { id: 's_max', label: '축 최대경', unit: 'mm' }], rLabel: '최소 틈새 (양수시 틈새, 음수시 죔새)', rUnit: 'mm', calc: function(v) { return v.h_min - v.s_max; } }
          ]
        },
        {
          id: 'tolerance_stackup',
          name: '공차 누적 (Stack-up)',
          icon: '🔗',
          desc: '최악조건(Worst Case) 및 통계적 기법(RSS)으로 누적 공차를 계산합니다.',
          formula: { text: 'RSS = √(T₁² + T₂² + ...)', vars: [] },
          modes: [
            { id: 'rss', label: 'RSS (통계적 누적공차)', inputs: [{ id: 't1', label: '공차 1', unit: 'mm' }, { id: 't2', label: '공차 2', unit: 'mm' }, { id: 't3', label: '공차 3', unit: 'mm' }], rLabel: '합성 RSS 공차', rUnit: 'mm', calc: function(v) { return Math.sqrt(v.t1*v.t1 + v.t2*v.t2 + v.t3*v.t3); } }
          ]
        },
        {
          id: 'dwg_scale',
          name: '도면 축척',
          icon: '📏',
          desc: '도면상의 실측 거리와 적용할 축척 비율로부터 실제 거리를 계산합니다.',
          formula: { text: 'Real = Drawing / Scale', vars: [] },
          modes: [
            { id: 'scale', label: '실제 거리 계산', inputs: [{ id: 'd', label: '도면상 측정거리', unit: 'mm' }, { id: 's', label: '축척 비율 (1/S)', unit: '' }], rLabel: '실제 거리', rUnit: 'mm', calc: function(v) { return v.s ? v.d * v.s : v.d; } }
          ]
        },
        {
          id: 'pos_tolerance',
          name: '위치공차 (True Position)',
          icon: '🎯',
          desc: '도면 기준 좌표값과 실제 측정 좌표값의 편차로부터 위치공차 치수를 계산합니다.',
          formula: { text: 'Position = 2 × √((X_dev)² + (Y_dev)²)', vars: [] },
          modes: [
            { id: 'pos', label: '위치공차 산출', inputs: [{ id: 'dx', label: 'X 축 편차', unit: 'mm' }, { id: 'dy', label: 'Y 축 편차', unit: 'mm' }], rLabel: '위치공차 지름', rUnit: 'mm', calc: function(v) { return 2 * Math.sqrt(v.dx*v.dx + v.dy*v.dy); } }
          ]
        }
      ]
    },
    {
      id: 'dsn_mech_struct',
      name: '기계 및 구조설계',
      calculators: [
        {
          id: 'gear_dimensions',
          name: '기어 피치원 지름',
          icon: '⚙️',
          desc: '기어 모듈과 잇수로부터 피치원 지름(d)을 계산합니다.',
          formula: { text: 'd = m × Z', vars: [] },
          modes: [
            { id: 'd', label: '피치원지름 계산', inputs: [{ id: 'm', label: '모듈 (m)', unit: 'mm' }, { id: 'z', label: '잇수 (Z)', unit: 'T' }], rLabel: '피치원 지름', rUnit: 'mm', calc: function(v) { return v.m * v.z; } }
          ]
        },
        {
          id: 'shaft_dia',
          name: '샤프트 직경',
          icon: '🔄',
          desc: '비틀림 응력과 허용 전단응력 기준에 따른 전동축 최소 지름을 결정합니다.',
          formula: { text: 'd = ∛(16 × T / (π × τ_allow))', vars: [] },
          modes: [
            { id: 'dia', label: '축 직경 산출', inputs: [{ id: 't', label: '비틀림 토크', unit: 'N·m' }, { id: 'tau', label: '허용 전단응력', unit: 'MPa' }], rLabel: '최소 축 직경', rUnit: 'mm', calc: function(v) { return v.tau ? Math.pow((16 * (v.t * 1000)) / (Math.PI * v.tau), 1/3) : Infinity; } }
          ]
        },
        {
          id: 'beam_deflection_dsn',
          name: '보(Beam) 처짐',
          icon: '📐',
          desc: '단순지지보의 중앙에 하중이 가해질 때의 변위 처짐량을 구합니다.',
          formula: { text: 'δ = P × L³ / (48 × E × I)', vars: [] },
          modes: [
            { id: 'deflection', label: '처짐량 계산', inputs: [{ id: 'p', label: '하중 (P)', unit: 'N' }, { id: 'l', label: '보 길이 (L)', unit: 'mm' }, { id: 'e', label: '탄성계수 (E)', unit: 'GPa' }, { id: 'i', label: '단면 2차모멘트 (I)', unit: 'mm⁴' }], rLabel: '최대 처짐', rUnit: 'mm', calc: function(v) { var E_pa = v.e * 1000; var denom = 48 * E_pa * v.i; return denom ? (v.p * Math.pow(v.l, 3)) / denom : Infinity; } }
          ]
        },
        {
          id: 'safety_factor',
          name: '안전율 (Safety Factor)',
          icon: '🛡️',
          desc: '재료의 극한 강도와 설계 허용 응력으로부터 설계의 안전율(SF)을 계산합니다.',
          formula: { text: 'SF = Strength / Stress_allow', vars: [] },
          modes: [
            { id: 'sf', label: '안전율 계산', inputs: [{ id: 'strength', label: '재료 강도 (항복/인장)', unit: 'MPa' }, { id: 'stress', label: '허용/인가 응력', unit: 'MPa' }], rLabel: '안전율 (SF)', rUnit: '', calc: function(v) { return v.stress ? v.strength / v.stress : Infinity; } }
          ]
        },
        {
          id: 'belt_length',
          name: '벨트 길이 계산',
          icon: '⛓️',
          desc: '두 풀리의 지름과 중심 거리로부터 필요한 벨트의 총 길이를 계산합니다.',
          formula: { text: 'L ≈ 2C + 1.57(D+d) + (D-d)²/(4C)', vars: [] },
          modes: [
            { id: 'len', label: '길이 산출', inputs: [{ id: 'c', label: '축 중심거리 (C)', unit: 'mm' }, { id: 'd1', label: '대풀리 지름 (D)', unit: 'mm' }, { id: 'd2', label: '소풀리 지름 (d)', unit: 'mm' }], rLabel: '벨트 총 길이 (L)', rUnit: 'mm', calc: function(v) { return v.c ? (2 * v.c + 1.57 * (v.d1 + v.d2) + Math.pow(v.d1 - v.d2, 2)/(4 * v.c)) : 0; } }
          ]
        }
      ]
    }
  ]
};
