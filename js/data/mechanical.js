window.DATA_MECHANICAL = {
  id: 'mechanical',
  name: '기계',
  icon: '⚙️',
  color: '#ef4444',
  subcategories: [
    {
      id: 'mech_rot_dyn',
      name: '회전 및 역학',
      calculators: [
        {
          id: 'rot_speed',
          name: '선속도 및 원주속도',
          icon: '🔄',
          desc: '반경과 회전수(RPM)로부터 회전체의 선속도(원주속도)를 구합니다.',
          formula: { text: 'v = π × D × N / 60000', vars: [] },
          modes: [
            { id: 'v', label: '속도 계산', inputs: [{ id: 'd', label: '지름 (D)', unit: 'mm' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }], rLabel: '원주 속도', rUnit: 'm/s', calc: function(v) { return (Math.PI * v.d * v.n) / 60000; } }
          ]
        },
        {
          id: 'power_torque_mech',
          name: '토크 및 출력',
          icon: '🔧',
          desc: 'RPM과 출력(kW)으로부터 기계 축 토크를 산출합니다.',
          formula: { text: 'T = 9550 × P / N', vars: [] },
          modes: [
            { id: 'torque', label: '토크 계산', inputs: [{ id: 'p', label: '동력 (P)', unit: 'kW' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }], rLabel: '토크', rUnit: 'N·m', calc: function(v) { return v.n ? (9550 * v.p) / v.n : Infinity; } }
          ]
        },
        {
          id: 'motion_kinetic_energy',
          name: '운동에너지',
          icon: '⚡',
          desc: '질량체와 속도로부터 운동에너지를 계산합니다.',
          formula: { text: 'Ek = ½ × m × v²', vars: [] },
          modes: [
            { id: 'ke', label: '에너지 계산', inputs: [{ id: 'm', label: '질량 (m)', unit: 'kg' }, { id: 'v', label: '속도 (v)', unit: 'm/s' }], rLabel: '운동에너지', rUnit: 'J', calc: function(v) { return 0.5 * v.m * v.v * v.v; } }
          ]
        },
        {
          id: 'vibration_freq',
          name: '고유진동수',
          icon: '📡',
          desc: '강성(k)과 질량(m)으로부터 1자유도 고유진동수를 계산합니다.',
          formula: { text: 'fn = 1 / (2π) × √(k / m)', vars: [] },
          modes: [
            { id: 'fn', label: '고유진동수 계산', inputs: [{ id: 'k', label: '강성 (k)', unit: 'N/mm' }, { id: 'm', label: '질량 (m)', unit: 'kg' }], rLabel: '고유진동수', rUnit: 'Hz', calc: function(v) { var K = v.k * 1000; return v.m ? (1 / (2 * Math.PI)) * Math.sqrt(K / v.m) : Infinity; } }
          ]
        },
        {
          id: 'critical_speed',
          name: '위험속도 (Critical Speed)',
          icon: '⚠️',
          desc: '단순 지지된 축의 처짐량(y)을 기준으로 회전축의 1차 위험 속도(RPM)를 구합니다.',
          formula: { text: 'Nc = 946 / √y', vars: [] },
          modes: [
            { id: 'nc', label: '위험속도 계산', inputs: [{ id: 'y', label: '축의 자중 처짐 (y)', unit: 'mm' }], rLabel: '위험 속도', rUnit: 'RPM', calc: function(v) { return v.y > 0 ? 946 / Math.sqrt(v.y) : Infinity; } }
          ]
        },
        {
          id: 'flywheel_energy',
          name: '플라이휠 에너지 저장',
          icon: '🔄',
          desc: '플라이휠 관성 모멘트(I)와 작동 각속도로부터 총 회전 에너지(E)를 계산합니다.',
          formula: { text: 'E = ½ × I × ω²', vars: [] },
          modes: [
            { id: 'fly', label: '에너지 저장량', inputs: [{ id: 'i', label: '관성 모멘트 (I)', unit: 'kg·m²' }, { id: 'rpm', label: '회전수 (N)', unit: 'RPM' }], rLabel: '저장 에너지 (E)', rUnit: 'J', calc: function(v) { var w = (2 * Math.PI * v.rpm) / 60; return 0.5 * v.i * w * w; } }
          ]
        }
      ]
    },
    {
      id: 'mech_parts_lub',
      name: '요소 및 윤활',
      calculators: [
        {
          id: 'bearing_life_l10',
          name: '베어링 수명 (L10)',
          icon: '⚙️',
          desc: '동정격하중(C)과 등가동하중(P)을 이용해 볼베어링의 기본 정격 피로 수명(L10)을 구합니다.',
          formula: { text: 'L10 = (C / P)³ × 10⁶', vars: [] },
          modes: [
            { id: 'life', label: '수명 계산 (볼베어링)', inputs: [{ id: 'c', label: '기본 동적 부하 용량 (C)', unit: 'kN' }, { id: 'p', label: '동등 하중 (P)', unit: 'kN' }], rLabel: '피로 수명', rUnit: '회전수 (10^6 rev)', calc: function(v) { return v.p ? Math.pow(v.c / v.p, 3); } }
          ]
        },
        {
          id: 'lub_interval',
          name: '베어링 그리스 윤활주기',
          icon: '🍯',
          desc: '베어링 내경, RPM 및 작동 온도 조건을 사용해 간략화된 베어링의 그리스 재윤활 주기를 산출합니다.',
          formula: { text: 't = K_temp × (14000000 / (N × √d))', vars: [] },
          modes: [
            { id: 'interval', label: '윤활주기 계산', inputs: [{ id: 'd', label: '베어링 안지름 (d)', unit: 'mm' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }, { id: 'temp', label: '작동 온도', unit: '°C' }], rLabel: '그리스 수명', rUnit: '시간 (h)', calc: function(v) { var denom = v.n * Math.sqrt(v.d); if (!denom) return Infinity; var t_base = 14000000 / denom; var f_temp = 1.0; if (v.temp > 70) { f_temp = Math.pow(0.5, (v.temp - 70) / 15); } return t_base * f_temp; } }
          ]
        },
        {
          id: 'spring_rate',
          name: '스프링 상수 (Spring Rate)',
          icon: '🌀',
          desc: '소재 선경, 평균경 및 유효 권수로부터 압축 코일 스프링 상수(k)를 구합니다.',
          formula: { text: 'k = G × d⁴ / (8 × D³ × N_active)', vars: [] },
          modes: [
            { id: 'spring', label: '스프링 상수', inputs: [{ id: 'g', label: '횡탄성계수 (G)', unit: 'GPa' }, { id: 'd_wire', label: '스프링 와이어경 (d)', unit: 'mm' }, { id: 'd_mean', label: '평균 코일경 (D)', unit: 'mm' }, { id: 'na', label: '유효 권수 (Na)', unit: '회' }], rLabel: '스프링 상수 (k)', rUnit: 'N/mm', calc: function(v) { var G = v.g * 1000; var denom = 8 * Math.pow(v.d_mean, 3) * v.na; return denom ? (G * Math.pow(v.d_wire, 4)) / denom : Infinity; } }
          ]
        },
        {
          id: 'bearing_friction',
          name: '베어링 마찰 손실 동력',
          icon: '⚡',
          desc: '하중, 마찰계수, 회전수로부터 베어링 마찰 토크 및 손실 동력(P)을 구합니다.',
          formula: { text: 'P = T_friction × ω', vars: [] },
          modes: [
            { id: 'loss', label: '손실 동력 계산', inputs: [{ id: 'f', label: '베어링 하중 (F)', unit: 'N' }, { id: 'mu', label: '마찰계수 (μ)', unit: '' }, { id: 'd', label: '베어링 안지름 (d)', unit: 'mm' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }], rLabel: '마찰 손실 동력', rUnit: 'W', calc: function(v) { var T = v.mu * v.f * (v.d / 2000); var w = (2 * Math.PI * v.n) / 60; return T * w; } }
          ]
        }
      ]
    }
  ]
};
