window.DATA_MATERIAL = {
  id: 'material',
  name: '소재',
  icon: '🧪',
  color: '#10b981',
  subcategories: [
    {
      id: 'mat_weight_sub',
      name: '재질별 중량',
      calculators: [
        {
          id: 'wt_carbon_steel',
          name: '탄소강 중량',
          icon: '⛓️',
          desc: '탄소강 부재의 중량을 밀도 7.85g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 7.85 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '철판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 7.85) / 1000000; } }
          ]
        },
        {
          id: 'wt_sus',
          name: '스테인리스 중량',
          icon: '🛡️',
          desc: '스테인리스(SUS304) 부재의 중량을 밀도 7.93g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 7.93 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'SUS 판재 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 7.93) / 1000000; } }
          ]
        },
        {
          id: 'wt_al',
          name: '알루미늄 중량',
          icon: '✈️',
          desc: '알루미늄 부재의 중량을 밀도 2.70g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 2.70 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'AL 판재 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 2.70) / 1000000; } }
          ]
        },
        {
          id: 'wt_copper',
          name: '구리 중량',
          icon: '🔌',
          desc: '구리 부재의 중량을 밀도 8.96g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 8.96 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '구리판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 8.96) / 1000000; } }
          ]
        },
        {
          id: 'wt_titanium',
          name: '티타늄 중량',
          icon: '🚀',
          desc: '티타늄 부재의 중량을 밀도 4.51g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 4.51 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '티타늄판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 4.51) / 1000000; } }
          ]
        },
        {
          id: 'wt_magnesium',
          name: '마그네슘 중량',
          icon: '🔋',
          desc: '마그네슘 부재의 중량을 밀도 1.74g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 1.74 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '마그네슘판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 1.74) / 1000000; } }
          ]
        },
        {
          id: 'wt_abs',
          name: 'ABS 중량',
          icon: '🧱',
          desc: 'ABS 부재의 중량을 밀도 1.04g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 1.04 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'ABS 판재 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 1.04) / 1000000; } }
          ]
        },
        {
          id: 'wt_pc',
          name: 'PC 중량',
          icon: '👓',
          desc: '폴리카보네이트(PC) 부재의 중량을 밀도 1.20g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 1.20 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'PC 판재 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 1.20) / 1000000; } }
          ]
        },
        {
          id: 'wt_epdm',
          name: 'EPDM 중량',
          icon: '🚗',
          desc: 'EPDM 고무의 중량을 밀도 0.86g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 0.86 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'EPDM 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 0.86) / 1000000; } }
          ]
        },
        {
          id: 'wt_cfrp',
          name: 'CFRP 중량',
          icon: '✈️',
          desc: '탄소섬유 복합재(CFRP)의 중량을 밀도 1.60g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 1.60 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: 'CFRP 판재 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 1.60) / 1000000; } }
          ]
        },
        {
          id: 'wt_brass',
          name: '황동 중량',
          icon: '🪙',
          desc: '황동 부재의 중량을 평균 밀도 8.43g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 8.43 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '황동판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 8.43) / 1000000; } }
          ]
        },
        {
          id: 'wt_glass',
          name: '일반 유리 중량',
          icon: '🥛',
          desc: '일반 유리의 중량을 밀도 2.50g/cm³ 기준으로 계산합니다.',
          formula: { text: 'W = L × W × T × 2.50 / 1e6', vars: [] },
          modes: [
            { id: 'plate', label: '유리판 중량', inputs: [{ id: 'l', label: '길이', unit: 'mm' }, { id: 'w', label: '폭', unit: 'mm' }, { id: 't', label: '두께', unit: 'mm' }], rLabel: '중량', rUnit: 'kg', calc: function(v) { return (v.l * v.w * v.t * 2.50) / 1000000; } }
          ]
        }
      ]
    },
    {
      id: 'mat_properties_compare',
      name: '소재 특성 및 비교',
      calculators: [
        {
          id: 'strength_to_weight',
          name: '비강도 비교',
          icon: '📊',
          desc: '재료의 인장강도와 밀도를 이용해 비강도(Strength-to-Weight) 효율을 비교합니다.',
          formula: { text: 'Eff = σ_uts / ρ', vars: [] },
          modes: [
            { id: 'calc_eff', label: '비강도 효율 구하기', inputs: [{ id: 's', label: '인장강도', unit: 'MPa' }, { id: 'rho', label: '밀도', unit: 'g/cm³' }], rLabel: '비강도 효율', rUnit: 'kN·m/kg', calc: function(v) { return v.rho ? v.s / v.rho : Infinity; } }
          ]
        },
        {
          id: 'youngs_modulus_strain',
          name: '영률 및 탄성변형률',
          icon: '📐',
          desc: '영률(E)과 작용 응력(σ)으로부터 유발되는 선형 탄성 변형률을 구합니다.',
          formula: { text: 'ε = σ / E', vars: [] },
          modes: [
            { id: 'strain', label: '변형률 계산', inputs: [{ id: 'stress', label: '인장 응력 (σ)', unit: 'MPa' }, { id: 'e_gpa', label: '종탄성계수 (E)', unit: 'GPa' }], rLabel: '변형률 (ε)', rUnit: '×10⁻⁶', calc: function(v) { return v.e_gpa ? (v.stress / (v.e_gpa * 1000)) * 1e6 : Infinity; } }
          ]
        },
        {
          id: 'thermal_expansion_delta',
          name: '재료 선열팽창량',
          icon: '🌡️',
          desc: '선팽창 계수와 온도차, 기준 길이 조건에서 열팽창량(ΔL)을 구합니다.',
          formula: { text: 'ΔL = α × L0 × ΔT', vars: [] },
          modes: [
            { id: 'exp', label: '팽창량 계산', inputs: [{ id: 'l0', label: '기준 길이', unit: 'mm' }, { id: 'alpha', label: '선팽창계수 (α)', unit: '×10⁻⁶/°C' }, { id: 'dt', label: '온도 변화', unit: '°C' }], rLabel: '열팽창 변형량', rUnit: 'mm', calc: function(v) { return v.l0 * (v.alpha * 1e-6) * v.dt; } }
          ]
        }
      ]
    }
  ]
};
