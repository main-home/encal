window.DATA_ELECTRICAL = {
  id: 'electrical',
  name: '전기·전자',
  icon: '⚡',
  color: '#3b82f6',
  subcategories: [
    {
      id: 'elec_basics_circuits_merge',
      name: '전기·전자 기초 및 회로',
      calculators: [
        {
          id: 'ohm',
          name: '옴의 법칙',
          icon: '🔌',
          desc: 'V=IR 관계를 이용하여 전압, 전류, 저항을 계산합니다.',
          formula: { text: 'V = I × R', vars: [] },
          modes: [
            { id: 'find-v', label: '전압(V) 구하기', inputs: [{ id: 'i', label: '전류', unit: 'A' }, { id: 'r', label: '저항', unit: 'Ω' }], rLabel: '전압', rUnit: 'V', calc: function(v) { return v.i * v.r; } },
            { id: 'find-i', label: '전류(I) 구하기', inputs: [{ id: 'v', label: '전압', unit: 'V' }, { id: 'r', label: '저항', unit: 'Ω' }], rLabel: '전류', rUnit: 'A', calc: function(v) { return v.r ? v.v / v.r : Infinity; } },
            { id: 'find-r', label: '저항(R) 구하기', inputs: [{ id: 'v', label: '전압', unit: 'V' }, { id: 'i', label: '전류', unit: 'A' }], rLabel: '저항', rUnit: 'Ω', calc: function(v) { return v.i ? v.v / v.i : Infinity; } }
          ]
        },
        {
          id: 'power_calc_elec',
          name: '전력',
          icon: '🔋',
          desc: '전력, 전압, 전류 관계를 계산합니다.',
          formula: { text: 'P = V × I', vars: [] },
          modes: [
            { id: 'p', label: '전력(P) 계산', inputs: [{ id: 'v', label: '전압', unit: 'V' }, { id: 'i', label: '전류', unit: 'A' }], rLabel: '전력', rUnit: 'W', calc: function(v) { return v.v * v.i; } }
          ]
        },
        {
          id: 'power_factor',
          name: '역률 및 전력 분석',
          icon: '📊',
          desc: '유효전력과 피상전력으로부터 역률(Power Factor)을 계산합니다.',
          formula: { text: 'PF = P / S', vars: [{ s: 'PF', d: '역률' }, { s: 'P', d: '유효전력 (W)' }, { s: 'S', d: '피상전력 (VA)' }] },
          modes: [
            { id: 'pf', label: '역률 구하기', inputs: [{ id: 'p', label: '유효전력', unit: 'W' }, { id: 's', label: '피상전력', unit: 'VA' }], rLabel: '역률', rUnit: '', calc: function(v) { return v.s ? v.p / v.s : Infinity; } }
          ]
        },
        {
          id: 'series_parallel_r',
          name: '직렬/병렬 저항',
          icon: '🔗',
          desc: '두 저항의 직렬 또는 병렬 합성 저항을 계산합니다.',
          formula: { text: '직렬: R1 + R2 | 병렬: (R1 × R2) / (R1 + R2)', vars: [] },
          modes: [
            { id: 'series', label: '직렬 합성저항', inputs: [{ id: 'r1', label: '저항 1', unit: 'Ω' }, { id: 'r2', label: '저항 2', unit: 'Ω' }], rLabel: '합성저항', rUnit: 'Ω', calc: function(v) { return v.r1 + v.r2; } },
            { id: 'parallel', label: '병렬 합성저항', inputs: [{ id: 'r1', label: '저항 1', unit: 'Ω' }, { id: 'r2', label: '저항 2', unit: 'Ω' }], rLabel: '합성저항', rUnit: 'Ω', calc: function(v) { return (v.r1 + v.r2) ? (v.r1 * v.r2) / (v.r1 + v.r2) : 0; } }
          ]
        },
        {
          id: 'voltage_divider_elec',
          name: '분압 회로',
          icon: '🔌',
          desc: '두 저항으로 구성된 직렬 회로의 출력 전압을 계산합니다.',
          formula: { text: 'Vout = Vin × R2 / (R1 + R2)', vars: [] },
          modes: [
            { id: 'vout', label: '출력 전압 계산', inputs: [{ id: 'vin', label: '입력 전압', unit: 'V' }, { id: 'r1', label: '저항 R1', unit: 'Ω' }, { id: 'r2', label: '저항 R2', unit: 'Ω' }], rLabel: '출력 전압', rUnit: 'V', calc: function(v) { return (v.r1 + v.r2) ? v.vin * v.r2 / (v.r1 + v.r2) : 0; } }
          ]
        },
        {
          id: 'rc_time_elec',
          name: 'RC 시정수',
          icon: '⏱️',
          desc: 'RC 회로의 충방전 시정수(τ)를 구합니다.',
          formula: { text: 'τ = R × C', vars: [] },
          modes: [
            { id: 'tau', label: '시정수 계산', inputs: [{ id: 'r', label: '저항', unit: 'Ω' }, { id: 'c', label: '커패시터', unit: 'μF' }], rLabel: '시정수', rUnit: 'ms', calc: function(v) { return v.r * (v.c / 1000); } }
          ]
        },
        {
          id: 'led_resistor_elec',
          name: 'LED 보호저항',
          icon: '💡',
          desc: 'LED를 켜기 위한 적절한 한류 저항 값을 구합니다.',
          formula: { text: 'R = (Vs - Vf) / If', vars: [] },
          modes: [
            { id: 'r', label: '저항 계산', inputs: [{ id: 'vs', label: '전원 전압', unit: 'V' }, { id: 'vf', label: 'LED 순방향전압', unit: 'V' }, { id: 'if_ma', label: '동작 전류', unit: 'mA' }], rLabel: '저항', rUnit: 'Ω', calc: function(v) { return v.if_ma ? (v.vs - v.vf) / (v.if_ma / 1000) : Infinity; } }
          ]
        },
        {
          id: 'frequency_wavelength',
          name: '주파수와 파장',
          icon: '📡',
          desc: '자유공간 전자기파 주파수로부터 파장을 계산합니다.',
          formula: { text: 'λ = c / f', vars: [] },
          modes: [
            { id: 'wave', label: '파장 계산', inputs: [{ id: 'f', label: '주파수 (f)', unit: 'MHz' }], rLabel: '파장 (λ)', rUnit: 'm', calc: function(v) { return v.f ? 299.792458 / v.f : Infinity; } }
          ]
        },
        {
          id: 'decibel_power_ratio',
          name: 'dB 전력비 변환',
          icon: '📈',
          desc: '두 입력 전력비에 해당하는 데시벨(dB) 게인을 산출합니다.',
          formula: { text: 'dB = 10 × log10(P2 / P1)', vars: [] },
          modes: [
            { id: 'db', label: 'dB 게인 계산', inputs: [{ id: 'p1', label: '입력 전력 (P1)', unit: 'W' }, { id: 'p2', label: '출력 전력 (P2)', unit: 'W' }], rLabel: '게인', rUnit: 'dB', calc: function(v) { return (v.p1 > 0 && v.p2 > 0) ? 10 * Math.log10(v.p2 / v.p1) : 0; } }
          ]
        }
      ]
    },
    {
      id: 'elec_power_sys_merge',
      name: '전력 기기 및 시스템',
      calculators: [
        {
          id: 'motor_torque',
          name: '모터 토크',
          icon: '🔄',
          desc: '모터 출력(동력)과 회전속도로부터 발생 토크를 구합니다.',
          formula: { text: 'T = 9550 × P / N', vars: [] },
          modes: [
            { id: 't', label: '토크 계산', inputs: [{ id: 'p', label: '모터 출력', unit: 'kW' }, { id: 'n', label: '회전수', unit: 'RPM' }], rLabel: '발생 토크', rUnit: 'N·m', calc: function(v) { return v.n ? (9550 * v.p) / v.n : Infinity; } }
          ]
        },
        {
          id: 'battery_life_elec',
          name: '사용시간',
          icon: '⏱️',
          desc: '배터리 용량과 부하의 소비전류로부터 대략적인 동작 시간을 구합니다.',
          formula: { text: 't = C / I', vars: [] },
          modes: [
            { id: 'life', label: '사용시간 계산', inputs: [{ id: 'c', label: '배터리 용량', unit: 'Ah' }, { id: 'i', label: '소비 전류', unit: 'A' }], rLabel: '동작 시간', rUnit: '시간 (h)', calc: function(v) { return v.i ? v.c / v.i : Infinity; } }
          ]
        },
        {
          id: 'cable_v_drop',
          name: '전압강하',
          icon: '📈',
          desc: '전선 저항 및 전류에 따른 케이블 상의 전압강하를 계산합니다.',
          formula: { text: 'Vd = 2 × I × R_wire (단상)', vars: [] },
          modes: [
            { id: 'vdrop', label: '전압강하 계산', inputs: [{ id: 'i', label: '부하 전류', unit: 'A' }, { id: 'r', label: '전선 총저항', unit: 'Ω' }], rLabel: '전압강하', rUnit: 'V', calc: function(v) { return 2 * v.i * v.r; } }
          ]
        },
        {
          id: 'transformer_calc',
          name: '변압기 권선비',
          icon: '🌀',
          desc: '변압기 1차측 및 2차측 전압으로부터 변압비를 계산합니다.',
          formula: { text: 'Ratio = V1 / V2', vars: [] },
          modes: [
            { id: 'ratio', label: '권선비 계산', inputs: [{ id: 'v1', label: '1차 전압', unit: 'V' }, { id: 'v2', label: '2차 전압', unit: 'V' }], rLabel: '변압 권선비', rUnit: '', calc: function(v) { return v.v2 ? v.v1 / v.v2 : Infinity; } }
          ]
        },
        {
          id: 'three_phase_power',
          name: '3상 교류 전력',
          icon: '⚡',
          desc: '선간전압, 선전류, 부하 역률로부터 3상 유효전력을 계산합니다.',
          formula: { text: 'P = √3 × V × I × cosθ', vars: [] },
          modes: [
            { id: 'p3', label: '3상 전력 계산', inputs: [{ id: 'v', label: '선간 전압', unit: 'V' }, { id: 'i', label: '선 전류', unit: 'A' }, { id: 'pf', label: '역률 (cosθ)', unit: '0~1' }], rLabel: '3상 전력 (P)', rUnit: 'kW', calc: function(v) { return (Math.sqrt(3) * v.v * v.i * v.pf) / 1000; } }
          ]
        },
        {
          id: 'kwh_to_cost',
          name: '전력량 사용 요금',
          icon: '💰',
          desc: '소비전력, 일일 사용시간 및 단가 조건에서 월간 대략적 전기료를 추산합니다.',
          formula: { text: 'Cost = kW × Hours × 30 × UnitPrice', vars: [] },
          modes: [
            { id: 'cost', label: '월 전기요금 추산', inputs: [{ id: 'p_w', label: '소비 전력', unit: 'W' }, { id: 'hrs', label: '일일 사용시간', unit: '시간' }, { id: 'price', label: '1kWh당 단가', unit: '원' }], rLabel: '예상 월 요금', rUnit: '원', calc: function(v) { return (v.p_w / 1000) * v.hrs * 30 * v.price; } }
          ]
        }
      ]
    }
  ]
};
