window.DATA_FASTENING = {
  id: 'fastening',
  name: '체결',
  icon: '🔩',
  color: '#a855f7',
  subcategories: [
    {
      id: 'fast_bolt_screw',
      name: '볼트 및 나사',
      calculators: [
        {
          id: 'bolt_torque',
          name: '체결토크',
          icon: '🔩',
          desc: '볼트 호칭경과 축력을 기반으로 필요한 체결 토크를 계산합니다.',
          formula: { text: 'T = K × d × F', vars: [] },
          modes: [
            { id: 't', label: '토크 계산', inputs: [{ id: 'k', label: '토크계수', unit: '' }, { id: 'd', label: '지름', unit: 'mm' }, { id: 'f', label: '축력', unit: 'kN' }], rLabel: '체결토크', rUnit: 'N·m', calc: function(v) { return v.k * (v.d / 1000) * (v.f * 1000); } }
          ]
        },
        {
          id: 'bolt_stress',
          name: '볼트응력',
          icon: '📊',
          desc: '축력과 단면적으로부터 인장 응력을 구합니다.',
          formula: { text: 'σ = F / As', vars: [] },
          modes: [
            { id: 'stress', label: '응력 계산', inputs: [{ id: 'f', label: '축력', unit: 'kN' }, { id: 'as', label: '유효단면적', unit: 'mm²' }], rLabel: '인장응력', rUnit: 'MPa', calc: function(v) { return v.as ? (v.f * 1000) / v.as : Infinity; } }
          ]
        },
        {
          id: 'screw_lead',
          name: '나사 리드',
          icon: '🔄',
          desc: '나사의 조수(n)와 피치(p)로부터 회전당 전진 거리인 리드(L)를 구합니다.',
          formula: { text: 'L = n × p', vars: [] },
          modes: [
            { id: 'lead', label: '리드 계산', inputs: [{ id: 'n', label: '줄 수', unit: '줄' }, { id: 'p', label: '피치', unit: 'mm' }], rLabel: '리드', rUnit: 'mm', calc: function(v) { return v.n * v.p; } }
          ]
        },
        {
          id: 'washer_pressure',
          name: '와셔 압력',
          icon: '⭕',
          desc: '와셔 면적과 볼트 하중으로부터 와셔가 접촉면에 가하는 면압을 계산합니다.',
          formula: { text: 'P = F / A_washer', vars: [] },
          modes: [
            { id: 'press', label: '와셔 면압', inputs: [{ id: 'f', label: '체결력', unit: 'kN' }, { id: 'd_out', label: '와셔 외경', unit: 'mm' }, { id: 'd_in', label: '와셔 내경', unit: 'mm' }], rLabel: '면압', rUnit: 'MPa', calc: function(v) { var A = (Math.PI * (v.d_out*v.d_out - v.d_in*v.d_in)) / 4; return A ? (v.f * 1000) / A : Infinity; } }
          ]
        },
        {
          id: 'bolt_axial_force',
          name: '볼트 조임 축력 (Preload)',
          icon: '🔩',
          desc: '조임 토크와 토크 계수, 호칭경 조건으로부터 볼트에 유발되는 축력을 계산합니다.',
          formula: { text: 'Fi = T / (K × d)', vars: [] },
          modes: [
            { id: 'axial', label: '축력 계산', inputs: [{ id: 't', label: '조임 토크', unit: 'N·m' }, { id: 'k', label: '토크 계수 (K)', unit: '' }, { id: 'd', label: '볼트 지름 (d)', unit: 'mm' }], rLabel: '볼트 인장축력 (Fi)', rUnit: 'kN', calc: function(v) { var denom = v.k * (v.d / 1000); return denom ? (v.t / denom) / 1000 : Infinity; } }
          ]
        },
        {
          id: 'thread_shear',
          name: '나사산 전단 파손 강도',
          icon: '📊',
          desc: '체결 높이 및 나사 전단 한계 재질 강도로부터 나사산의 기계적 전단 한계 하중을 계산합니다.',
          formula: { text: 'F_stripping = π × d × H_nut × τ_shear', vars: [] },
          modes: [
            { id: 'strip', label: '나사산 파손강도', inputs: [{ id: 'd', label: '나사 외경', unit: 'mm' }, { id: 'h', label: '너트 체결높이', unit: 'mm' }, { id: 'tau', label: '재료 전단강도', unit: 'MPa' }], rLabel: '전단 파손 한계', rUnit: 'kN', calc: function(v) { return (Math.PI * v.d * v.h * v.tau) / 1000; } }
          ]
        }
      ]
    },
    {
      id: 'fast_design_strength',
      name: '체결 설계 및 강도',
      calculators: [
        {
          id: 'bolt_shear_strength',
          name: '전단응력',
          icon: '✂️',
          desc: '볼트에 횡방향 하중이 걸릴 때 전단 단면이 받는 응력을 구합니다.',
          formula: { text: 'τ = F / A', vars: [] },
          modes: [
            { id: 'shear', label: '전단응력 계산', inputs: [{ id: 'f', label: '전단 하중', unit: 'kN' }, { id: 'a', label: '전단 단면적', unit: 'mm²' }], rLabel: '전단응력', rUnit: 'MPa', calc: function(v) { return v.a ? (v.f * 1000) / v.a : Infinity; } }
          ]
        },
        {
          id: 'rivet_strength',
          name: '리벳 전단 허용하중',
          icon: '🔩',
          desc: '리벳 직경과 개수, 재료 허용 응력으로부터 리벳 결합부 전단 허용 하중을 계산합니다.',
          formula: { text: 'F = N_rivets × (π × d² / 4) × τ_allow', vars: [] },
          modes: [
            { id: 'riv', label: '리벳 허용하중', inputs: [{ id: 'd', label: '리벳 지름', unit: 'mm' }, { id: 'n', label: '리벳 개수', unit: '개' }, { id: 'tau', label: '허용 전단응력', unit: 'MPa' }], rLabel: '허용 전단하중', rUnit: 'kN', calc: function(v) { var A = Math.PI * v.d * v.d / 4; return (v.n * A * v.tau) / 1000; } }
          ]
        },
        {
          id: 'pin_shear',
          name: '평행 핀 허용 전단하중',
          icon: '📍',
          desc: '이중 전단 또는 단일 전단 핀의 치수와 허용 강도로부터 전단 안전 한계 하중을 계산합니다.',
          formula: { text: 'F = 2 × (π × d² / 4) × τ_allow (이중전단)', vars: [] },
          modes: [
            { id: 'double', label: '이중 전단 핀', inputs: [{ id: 'd', label: '핀 지름', unit: 'mm' }, { id: 'tau', label: '허용 전단응력', unit: 'MPa' }], rLabel: '이중전단 허용하중', rUnit: 'kN', calc: function(v) { var A = Math.PI * v.d * v.d / 4; return (2 * A * v.tau) / 1000; } }
          ]
        }
      ]
    }
  ]
};
