window.DATA_PROPERTIES = {
  id: 'properties',
  name: '물성',
  icon: '📦',
  color: '#059669',
  subcategories: [
    {
      id: 'prop_phys_chem',
      name: '재료 물리/화학 물성',
      calculators: [
        {
          id: 'tensile_strength',
          name: '인장강도 계산',
          icon: '💪',
          desc: '최대 인장 하중과 초기 단면적을 통해 재료의 극한 인장강도를 구합니다.',
          formula: { text: 'σ_uts = F_max / A_0', vars: [{ s: 'σ_uts', d: '인장강도 (MPa)' }, { s: 'F_max', d: '최대 하중 (N)' }, { s: 'A_0', d: '초기 단면적 (mm²)' }] },
          modes: [
            { id: 'calc_uts', label: '인장강도 계산', inputs: [{ id: 'f', label: '최대 하중', unit: 'N' }, { id: 'a', label: '초기 단면적', unit: 'mm²' }], rLabel: '인장강도', rUnit: 'MPa', calc: function(v) { return v.a ? v.f / v.a : Infinity; } }
          ]
        },
        {
          id: 'yield_strength',
          name: '항복강도 계산',
          icon: '📈',
          desc: '항복점 하중 또는 0.2% 오프셋 하중을 단면적으로 나눠 항복강도를 계산합니다.',
          formula: { text: 'σ_ys = F_yield / A_0', vars: [{ s: 'σ_ys', d: '항복강도 (MPa)' }] },
          modes: [
            { id: 'calc_ys', label: '항복강도 계산', inputs: [{ id: 'f', label: '항복 하중', unit: 'N' }, { id: 'a', label: '초기 단면적', unit: 'mm²' }], rLabel: '항복강도', rUnit: 'MPa', calc: function(v) { return v.a ? v.f / v.a : Infinity; } }
          ]
        },
        {
          id: 'comp_strength',
          name: '압축강도 계산',
          icon: '🧱',
          desc: '압축 파단 하중과 단면적으로부터 압축강도를 구합니다.',
          formula: { text: 'σ_c = F_comp / A_0', vars: [{ s: 'σ_c', d: '압축강도 (MPa)' }] },
          modes: [
            { id: 'calc_cs', label: '압축강도 계산', inputs: [{ id: 'f', label: '압축 파단 하중', unit: 'N' }, { id: 'a', label: '초기 단면적', unit: 'mm²' }], rLabel: '압축강도', rUnit: 'MPa', calc: function(v) { return v.a ? v.f / v.a : Infinity; } }
          ]
        },
        {
          id: 'shear_strength',
          name: '전단강도 계산',
          icon: '✂️',
          desc: '전단 하중과 전단 단면적으로부터 전단강도를 구합니다.',
          formula: { text: 'τ_max = F_shear / A_shear', vars: [{ s: 'τ_max', d: '전단강도 (MPa)' }] },
          modes: [
            { id: 'calc_ss', label: '전단강도 계산', inputs: [{ id: 'f', label: '전단 하중', unit: 'N' }, { id: 'a', label: '전단 면적', unit: 'mm²' }], rLabel: '전단강도', rUnit: 'MPa', calc: function(v) { return v.a ? v.f / v.a : Infinity; } }
          ]
        },
        {
          id: 'elastic_mod',
          name: '탄성계수 (영률)',
          icon: '📊',
          desc: '응력과 변형률 관계로부터 탄성계수를 구합니다.',
          formula: { text: 'E = σ / ε', vars: [{ s: 'E', d: '탄성계수 (GPa)' }, { s: 'σ', d: '응력 (MPa)' }, { s: 'ε', d: '변형률' }] },
          modes: [
            { id: 'calc_e', label: '탄성계수 계산', inputs: [{ id: 's', label: '응력', unit: 'MPa' }, { id: 'e', label: '변형률', unit: '' }], rLabel: '탄성계수', rUnit: 'GPa', calc: function(v) { return v.e ? (v.s / v.e) / 1000 : Infinity; } }
          ]
        },
        {
          id: 'poisson_ratio_prop',
          name: '포아송비',
          icon: '📈',
          desc: '가로 방향 변형률과 축 방향 변형률의 비율을 계산합니다.',
          formula: { text: 'ν = ε_trans / ε_axial', vars: [] },
          modes: [
            { id: 'calc_nu', label: '포아송비 계산', inputs: [{ id: 'et', label: '가로 방향 변형률', unit: '' }, { id: 'ea', label: '축 방향 변형률', unit: '' }], rLabel: '포아송비', rUnit: '', calc: function(v) { return v.ea ? v.et / v.ea : Infinity; } }
          ]
        },
        {
          id: 'thermal_cond_calc',
          name: '열전도율',
          icon: '🧱',
          desc: '열류량, 면적, 두께, 온도차로부터 열전도율을 구합니다.',
          formula: { text: 'k = (Q × L) / (A × ΔT)', vars: [{ s: 'k', d: '열전도율 (W/m·K)' }] },
          modes: [
            { id: 'calc_k', label: '열전도율 계산', inputs: [{ id: 'q', label: '열량', unit: 'W' }, { id: 'l', label: '두께', unit: 'mm' }, { id: 'a', label: '단면적', unit: 'm²' }, { id: 'dt', label: '온도차', unit: '°C' }], rLabel: '열전도율', rUnit: 'W/m·K', calc: function(v) { var denom = v.a * v.dt; return denom ? (v.q * (v.l/1000)) / denom : Infinity; } }
          ]
        },
        {
          id: 'specific_heat_prop',
          name: '비열',
          icon: '🔥',
          desc: '공급 열량, 질량, 온도 변화로부터 물질의 비열을 구합니다.',
          formula: { text: 'c = Q / (m × ΔT)', vars: [] },
          modes: [
            { id: 'calc_c', label: '비열 계산', inputs: [{ id: 'q', label: '열에너지', unit: 'kJ' }, { id: 'm', label: '질량', unit: 'kg' }, { id: 'dt', label: '온도차', unit: '°C' }], rLabel: '비열', rUnit: 'kJ/kg·°C', calc: function(v) { var denom = v.m * v.dt; return denom ? v.q / denom : Infinity; } }
          ]
        },
        {
          id: 'cte_calc',
          name: '열팽창계수',
          icon: '🌡️',
          desc: '길이 변화량과 초기 길이, 온도차로부터 선팽창계수를 역산합니다.',
          formula: { text: 'α = ΔL / (L_0 × ΔT)', vars: [{ s: 'α', d: '선팽창계수 (×10⁻⁶/°C)' }] },
          modes: [
            { id: 'calc_cte', label: '열팽창계수 역산', inputs: [{ id: 'dl', label: '길이 변화량', unit: 'mm' }, { id: 'l0', label: '초기 길이', unit: 'mm' }, { id: 'dt', label: '온도 변화', unit: '°C' }], rLabel: '선팽창계수', rUnit: '×10⁻⁶/°C', calc: function(v) { var denom = v.l0 * v.dt; return denom ? (v.dl / denom) * 1e6 : Infinity; } }
          ]
        },
        {
          id: 'resistivity_calc',
          name: '저항률',
          icon: '⚡',
          desc: '저항, 단면적, 길이로부터 고유 저항률을 구합니다.',
          formula: { text: 'ρ = R × A / L', vars: [{ s: 'ρ', d: '저항률 (Ω·m)' }] },
          modes: [
            { id: 'calc_res', label: '저항률 계산', inputs: [{ id: 'r', label: '측정 저항', unit: 'Ω' }, { id: 'a', label: '단면적', unit: 'mm²' }, { id: 'l', label: '길이', unit: 'm' }], rLabel: '저항률', rUnit: 'μΩ·m', calc: function(v) { return v.l ? (v.r * (v.a * 1e-6)) / v.l * 1e6 : Infinity; } }
          ]
        },
        {
          id: 'conductivity_calc',
          name: '전도도',
          icon: '🔌',
          desc: '저항률의 역수로서 전기 전도도를 구합니다.',
          formula: { text: 'σ = 1 / ρ', vars: [] },
          modes: [
            { id: 'calc_cond', label: '전도도 계산', inputs: [{ id: 'r', label: '저항률', unit: 'μΩ·m' }], rLabel: '전도도', rUnit: 'MS/m', calc: function(v) { return v.r ? 1 / v.r : Infinity; } }
          ]
        },
        {
          id: 'permittivity_calc',
          name: '유전율',
          icon: '🌀',
          desc: '진공 유전율과 비유전율을 곱해 최종 유전율을 계산합니다.',
          formula: { text: 'ε = ε_r × ε_0', vars: [{ s: 'ε_0', d: '8.854 × 10⁻¹² F/m' }] },
          modes: [
            { id: 'calc_perm', label: '유전율 계산', inputs: [{ id: 'er', label: '비유전율 (k)', unit: '' }], rLabel: '유전율', rUnit: '×10⁻¹² F/m', calc: function(v) { return v.er * 8.854187; } }
          ]
        },
        {
          id: 'ph_calc',
          name: 'pH 계산',
          icon: '🧪',
          desc: '수소이온 농도 [H+]로부터 pH 값을 계산합니다.',
          formula: { text: 'pH = -log10([H+])', vars: [] },
          modes: [
            { id: 'calc_ph', label: 'pH 구하기', inputs: [{ id: 'h', label: '수소이온 농도', unit: 'mol/L' }], rLabel: 'pH', rUnit: '', calc: function(v) { return v.h > 0 ? -Math.log10(v.h) : Infinity; } }
          ]
        },
        {
          id: 'concentration_calc',
          name: '농도 계산',
          icon: '💧',
          desc: '용질의 질량과 용액의 총 질량으로 백분율 농도(wt%)를 계산합니다.',
          formula: { text: 'C = (m_solute / m_solution) × 100', vars: [] },
          modes: [
            { id: 'calc_conc', label: '백분율 농도', inputs: [{ id: 'm1', label: '용질 질량', unit: 'g' }, { id: 'm2', label: '용액 총질량', unit: 'g' }], rLabel: '농도', rUnit: '%', calc: function(v) { return v.m2 ? (v.m1 / v.m2) * 100 : Infinity; } }
          ]
        },
        {
          id: 'viscosity_calc',
          name: '점도',
          icon: '🍯',
          desc: '동점도와 밀도를 곱해 절대 점도(동적 점도)를 계산합니다.',
          formula: { text: 'μ = ν × ρ', vars: [{ s: 'μ', d: '절대점도 (cP)' }, { s: 'ν', d: '동점도 (cSt)' }, { s: 'ρ', d: '밀도 (g/cm³)' }] },
          modes: [
            { id: 'calc_visc', label: '절대점도 계산', inputs: [{ id: 'nu', label: '동점도', unit: 'cSt' }, { id: 'rho', label: '밀도', unit: 'g/cm³' }], rLabel: '절대점도', rUnit: 'cP', calc: function(v) { return v.nu * v.rho; } }
          ]
        },
        {
          id: 'sg_calc',
          name: '비중 (Specific Gravity)',
          icon: '⚖️',
          desc: '물질의 밀도를 표준 물질(물)의 밀도로 나눈 비중을 구합니다.',
          formula: { text: 'SG = ρ_material / ρ_water', vars: [] },
          modes: [
            { id: 'calc_sg', label: '비중 계산', inputs: [{ id: 'rho', label: '물질 밀도', unit: 'g/cm³' }], rLabel: '비중', rUnit: '', calc: function(v) { return v.rho; } }
          ]
        },
        {
          id: 'bulk_modulus_k',
          name: '체적 탄성계수 (K)',
          icon: '📊',
          desc: '영률(E)과 포아송비(ν)로부터 재료의 체적 압축 탄성계수(K)를 계산합니다.',
          formula: { text: 'K = E / (3 × (1 - 2ν))', vars: [] },
          modes: [
            { id: 'bulk', label: '체적탄성계수 계산', inputs: [{ id: 'e_gpa', label: '종탄성계수 (E)', unit: 'GPa' }, { id: 'nu', label: '포아송비 (ν)', unit: '0~0.49' }], rLabel: '체적 탄성계수', rUnit: 'GPa', calc: function(v) { var denom = 3 * (1 - 2 * v.nu); return denom > 0 ? v.e_gpa / denom : Infinity; } }
          ]
        },
        {
          id: 'shear_modulus_g',
          name: '전단 탄성계수 (G)',
          icon: '📊',
          desc: '영률(E)과 포아송비(ν)로부터 재료의 전단 탄성계수(G)를 계산합니다.',
          formula: { text: 'G = E / (2 × (1 + ν))', vars: [] },
          modes: [
            { id: 'shear_mod', label: '전단탄성계수 계산', inputs: [{ id: 'e_gpa', label: '종탄성계수 (E)', unit: 'GPa' }, { id: 'nu', label: '포아송비 (ν)', unit: '0~0.5' }], rLabel: '전단 탄성계수', rUnit: 'GPa', calc: function(v) { return v.e_gpa / (2 * (1 + v.nu)); } }
          ]
        }
      ]
    },
    {
      id: 'prop_hardness_conv',
      name: '경도 및 변환',
      calculators: [
        {
          id: 'hrc_conv',
          name: '로크웰 C 경도 (HRC)',
          icon: '💎',
          desc: 'HRC 경도 값에서 비커스(HV) 및 브리넬(HB) 경도로 근사 변환합니다.',
          formula: { text: 'HV ≈ 10.5 × HRC + 240', vars: [] },
          modes: [
            { id: 'hrc_hv', label: 'HRC → HV', inputs: [{ id: 'hrc', label: 'HRC 값', unit: '' }], rLabel: 'HV(근사)', rUnit: 'HV', calc: function(v) { return 10.5 * v.hrc + 240; } }
          ]
        },
        {
          id: 'hrb_conv',
          name: '로크웰 B 경도 (HRB)',
          icon: '⚙️',
          desc: 'HRB 값을 브리넬(HB) 경도 값으로 근사 변환합니다.',
          formula: { text: 'HB ≈ 2 × HRB + 30', vars: [] },
          modes: [
            { id: 'hrb_hb', label: 'HRB → HB', inputs: [{ id: 'hrb', label: 'HRB 값', unit: '' }], rLabel: 'HB(근사)', rUnit: 'HB', calc: function(v) { return 2 * v.hrb + 30; } }
          ]
        },
        {
          id: 'hb_conv_prop',
          name: '브리넬 경도 (HB)',
          icon: '🔨',
          desc: '브리넬 하중과 압입 자국 지름을 이용해 브리넬 경도를 구합니다.',
          formula: { text: 'HB = 2P / (πD(D - √(D² - d²)))', vars: [] },
          modes: [
            { id: 'calc_hb', label: 'HB 계산', inputs: [{ id: 'p', label: '시험 하중', unit: 'kgf' }, { id: 'd_ball', label: '압입구 지름 (D)', unit: 'mm' }, { id: 'd_ind', label: '자국 지름 (d)', unit: 'mm' }], rLabel: '브리넬 경도', rUnit: 'HB', calc: function(v) { var inside = v.d_ball*v.d_ball - v.d_ind*v.d_ind; if (inside < 0) return 0; var denom = Math.PI * v.d_ball * (v.d_ball - Math.sqrt(inside)); return denom ? (2 * v.p) / denom : Infinity; } }
          ]
        },
        {
          id: 'hv_conv',
          name: '비커스 경도 (HV)',
          icon: '📐',
          desc: '시험 하중과 대각선 자국 길이로부터 비커스 경도를 구합니다.',
          formula: { text: 'HV = 1.8544 × P / d²', vars: [] },
          modes: [
            { id: 'calc_hv', label: 'HV 계산', inputs: [{ id: 'p', label: '시험 하중', unit: 'kgf' }, { id: 'd', label: '대각선 평균길이', unit: 'mm' }], rLabel: '비커스 경도', rUnit: 'HV', calc: function(v) { return v.d ? (1.8544 * v.p) / (v.d * v.d) : Infinity; } }
          ]
        },
        {
          id: 'shore_a_conv',
          name: '쇼어 A 경도 (Shore A)',
          icon: '🚗',
          desc: '쇼어 A 고무 경도로부터 쇼어 D 경도를 추정합니다.',
          formula: { text: 'Shore D ≈ 0.6 × Shore A + 5', vars: [] },
          modes: [
            { id: 'a_d', label: 'Shore A → Shore D', inputs: [{ id: 'a', label: 'Shore A 값', unit: '' }], rLabel: 'Shore D(추정)', rUnit: 'D', calc: function(v) { return 0.6 * v.a + 5; } }
          ]
        },
        {
          id: 'shore_d_conv',
          name: '쇼어 D 경도 (Shore D)',
          icon: '🛹',
          desc: '쇼어 D 경도로부터 쇼어 A 경도를 추정합니다.',
          formula: { text: 'Shore A ≈ (Shore D - 5) / 0.6', vars: [] },
          modes: [
            { id: 'd_a', label: 'Shore D → Shore A', inputs: [{ id: 'd', label: 'Shore D 값', unit: '' }], rLabel: 'Shore A(추정)', rUnit: 'A', calc: function(v) { return (v.d - 5) / 0.6; } }
          ]
        },
        {
          id: 'mohs_scratch_hardness',
          name: '비커스 경도 → 모스 경도 (Mohs)',
          icon: '💎',
          desc: 'Vickers 경도로부터 광물 비교용 모스 긁기 경도를 추정합니다.',
          formula: { text: 'Mohs ≈ 0.002 × HV + 1', vars: [] },
          modes: [
            { id: 'mohs', label: '모스 경도 추정', inputs: [{ id: 'hv', label: '비커스 경도 (HV)', unit: 'HV' }], rLabel: '모스 경도(근사)', rUnit: 'Mohs', calc: function(v) { return v.hv > 0 ? Math.min(0.002 * v.hv + 1, 10) : 1; } }
          ]
        }
      ]
    }
  ]
};
