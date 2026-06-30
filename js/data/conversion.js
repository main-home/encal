window.DATA_CONVERSION = {
  id: 'conversion',
  name: '단위변환',
  icon: '🔄',
  color: '#14b8a6',
  subcategories: [
    {
      id: 'conv_base_units',
      name: '기본 기하/시간/각도 단위',
      calculators: [
        {
          id: 'conv_len',
          name: '길이 변환',
          icon: '📏',
          desc: 'mm, cm, m, inch, ft 간의 단위를 변환합니다.',
          formula: { text: '1 in = 25.4 mm | 1 ft = 304.8 mm', vars: [] },
          modes: [
            { id: 'mm_in', label: 'mm → inch', inputs: [{ id: 'v', label: '값', unit: 'mm' }], rLabel: '결과', rUnit: 'inch', calc: function(v) { return v.v / 25.4; } },
            { id: 'in_mm', label: 'inch → mm', inputs: [{ id: 'v', label: '값', unit: 'inch' }], rLabel: '결과', rUnit: 'mm', calc: function(v) { return v.v * 25.4; } },
            { id: 'm_ft', label: 'm → ft', inputs: [{ id: 'v', label: '값', unit: 'm' }], rLabel: '결과', rUnit: 'ft', calc: function(v) { return v.v / 0.3048; } },
            { id: 'ft_m', label: 'ft → m', inputs: [{ id: 'v', label: '값', unit: 'ft' }], rLabel: '결과', rUnit: 'm', calc: function(v) { return v.v * 0.3048; } }
          ]
        },
        {
          id: 'conv_area',
          name: '면적 변환',
          icon: '📐',
          desc: 'm², mm², ft², 평(pyung) 간의 단위를 변환합니다.',
          formula: { text: '1 평 ≈ 3.30578 m²', vars: [] },
          modes: [
            { id: 'm2_py', label: 'm² → 평', inputs: [{ id: 'v', label: '값', unit: 'm²' }], rLabel: '결과', rUnit: '평', calc: function(v) { return v.v / 3.30578; } },
            { id: 'py_m2', label: '평 → m²', inputs: [{ id: 'v', label: '값', unit: '평' }], rLabel: '결과', rUnit: 'm²', calc: function(v) { return v.v * 3.30578; } }
          ]
        },
        {
          id: 'conv_vol',
          name: '체적 변환',
          icon: '🥛',
          desc: 'L, m³, gallon, cc 간의 단위를 변환합니다.',
          formula: { text: '1 gal ≈ 3.78541 L', vars: [] },
          modes: [
            { id: 'l_gal', label: 'L → gallon (US)', inputs: [{ id: 'v', label: '값', unit: 'L' }], rLabel: '결과', rUnit: 'gal', calc: function(v) { return v.v / 3.78541; } },
            { id: 'gal_l', label: 'gallon (US) → L', inputs: [{ id: 'v', label: '값', unit: 'gal' }], rLabel: '결과', rUnit: 'L', calc: function(v) { return v.v * 3.78541; } }
          ]
        },
        {
          id: 'conv_mass',
          name: '질량 변환',
          icon: '⚖️',
          desc: 'g, kg, lb(파운드), oz(온스) 간의 단위를 변환합니다.',
          formula: { text: '1 lb ≈ 0.453592 kg', vars: [] },
          modes: [
            { id: 'kg_lb', label: 'kg → lb', inputs: [{ id: 'v', label: '값', unit: 'kg' }], rLabel: '결과', rUnit: 'lb', calc: function(v) { return v.v / 0.45359237; } },
            { id: 'lb_kg', label: 'lb → kg', inputs: [{ id: 'v', label: '값', unit: 'lb' }], rLabel: '결과', rUnit: 'kg', calc: function(v) { return v.v * 0.45359237; } }
          ]
        },
        {
          id: 'conv_time',
          name: '시간 변환',
          icon: '⏱️',
          desc: '초(s), 분(min), 시(h), 일(day) 간 단위를 변환합니다.',
          formula: { text: '1 min = 60 s | 1 h = 60 min | 1 day = 24 h', vars: [] },
          modes: [
            { id: 's_min', label: '초 → 분', inputs: [{ id: 'v', label: '값', unit: 's' }], rLabel: '결과', rUnit: 'min', calc: function(v) { return v.v / 60; } },
            { id: 'min_s', label: '분 → 초', inputs: [{ id: 'v', label: '값', unit: 'min' }], rLabel: '결과', rUnit: 's', calc: function(v) { return v.v * 60; } }
          ]
        },
        {
          id: 'conv_angle',
          name: '각도 변환',
          icon: '📐',
          desc: '도(deg)와 라디안(rad) 단위를 서로 변환합니다.',
          formula: { text: '1 rad = 180° / π', vars: [] },
          modes: [
            { id: 'deg_rad', label: '도(°) → 라디안(rad)', inputs: [{ id: 'v', label: '값', unit: '°' }], rLabel: '결과', rUnit: 'rad', calc: function(v) { return (v.v * Math.PI) / 180; } },
            { id: 'rad_deg', label: '라디안(rad) → 도(°)', inputs: [{ id: 'v', label: 'rad' }], rLabel: '결과', rUnit: '°', calc: function(v) { return (v.v * 180) / Math.PI; } }
          ]
        },
        {
          id: 'conv_density',
          name: '밀도 단위 변환',
          icon: '🧱',
          desc: 'g/cm³ 와 kg/m³(SI 표준) 단위를 서로 변환합니다.',
          formula: { text: '1 g/cm³ = 1000 kg/m³', vars: [] },
          modes: [
            { id: 'gcm_kgm', label: 'g/cm³ → kg/m³', inputs: [{ id: 'v', label: '값', unit: 'g/cm³' }], rLabel: '결과', rUnit: 'kg/m³', calc: function(v) { return v.v * 1000; } },
            { id: 'kgm_gcm', label: 'kg/m³ → g/cm³', inputs: [{ id: 'v', label: '값', unit: 'kg/m³' }], rLabel: '결과', rUnit: 'g/cm³', calc: function(v) { return v.v / 1000; } }
          ]
        }
      ]
    },
    {
      id: 'conv_mech_units',
      name: '역학 단위',
      calculators: [
        {
          id: 'conv_force',
          name: '힘 변환',
          icon: '💪',
          desc: 'N, kgf, lbf 간의 단위를 변환합니다.',
          formula: { text: '1 kgf ≈ 9.80665 N | 1 lbf ≈ 4.44822 N', vars: [] },
          modes: [
            { id: 'kgf_n', label: 'kgf → N', inputs: [{ id: 'v', label: '값', unit: 'kgf' }], rLabel: '결과', rUnit: 'N', calc: function(v) { return v.v * 9.80665; } },
            { id: 'n_kgf', label: 'N → kgf', inputs: [{ id: 'v', label: '값', unit: 'N' }], rLabel: '결과', rUnit: 'kgf', calc: function(v) { return v.v / 9.80665; } },
            { id: 'lbf_n', label: 'lbf → N', inputs: [{ id: 'v', label: '값', unit: 'lbf' }], rLabel: '결과', rUnit: 'N', calc: function(v) { return v.v * 4.44822; } }
          ]
        },
        {
          id: 'conv_torque',
          name: '토크 변환',
          icon: '🔄',
          desc: 'N·m, kgf·m, kgf·cm 간의 단위를 변환합니다.',
          formula: { text: '1 kgf·m ≈ 9.80665 N·m', vars: [] },
          modes: [
            { id: 'kgfm_nm', label: 'kgf·m → N·m', inputs: [{ id: 'v', label: '값', unit: 'kgf·m' }], rLabel: '결과', rUnit: 'N·m', calc: function(v) { return v.v * 9.80665; } },
            { id: 'nm_kgfm', label: 'N·m → kgf·m', inputs: [{ id: 'v', label: '값', unit: 'N·m' }], rLabel: '결과', rUnit: 'kgf·m', calc: function(v) { return v.v / 9.80665; } },
            { id: 'nm_kgfcm', label: 'N·m → kgf·cm', inputs: [{ id: 'v', label: '값', unit: 'N·m' }], rLabel: '결과', rUnit: 'kgf·cm', calc: function(v) { return (v.v / 9.80665) * 100; } }
          ]
        },
        {
          id: 'conv_press',
          name: '압력 변환',
          icon: '🌪️',
          desc: 'Pa, kPa, MPa, bar, PSI 간의 단위를 변환합니다.',
          formula: { text: '1 MPa = 10 bar = 145.038 PSI', vars: [] },
          modes: [
            { id: 'mpa_psi', label: 'MPa → PSI', inputs: [{ id: 'v', label: '값', unit: 'MPa' }], rLabel: '결과', rUnit: 'PSI', calc: function(v) { return v.v * 145.038; } },
            { id: 'mpa_bar', label: 'MPa → bar', inputs: [{ id: 'v', label: '값', unit: 'MPa' }], rLabel: '결과', rUnit: 'bar', calc: function(v) { return v.v * 10; } },
            { id: 'psi_mpa', label: 'PSI → MPa', inputs: [{ id: 'v', label: '값', unit: 'PSI' }], rLabel: '결과', rUnit: 'MPa', calc: function(v) { return v.v / 145.038; } }
          ]
        },
        {
          id: 'conv_vel',
          name: '속도 변환',
          icon: '🏃',
          desc: 'm/s, km/h, mph, knot 간의 속도를 변환합니다.',
          formula: { text: '1 m/s = 3.6 km/h | 1 mph ≈ 1.60934 km/h', vars: [] },
          modes: [
            { id: 'ms_kmh', label: 'm/s → km/h', inputs: [{ id: 'v', label: '값', unit: 'm/s' }], rLabel: '결과', rUnit: 'km/h', calc: function(v) { return v.v * 3.6; } },
            { id: 'kmh_ms', label: 'km/h → m/s', inputs: [{ id: 'v', label: '값', unit: 'km/h' }], rLabel: '결과', rUnit: 'm/s', calc: function(v) { return v.v / 3.6; } }
          ]
        },
        {
          id: 'conv_flow',
          name: '유량 변환',
          icon: '🌊',
          desc: 'L/min, L/s, m³/h, m³/s 간의 유량을 변환합니다.',
          formula: { text: '1 m³/h ≈ 16.6667 L/min', vars: [] },
          modes: [
            { id: 'lmin_m3h', label: 'L/min → m³/h', inputs: [{ id: 'v', label: '값', unit: 'L/min' }], rLabel: '결과', rUnit: 'm³/h', calc: function(v) { return v.v * 0.06; } },
            { id: 'm3h_lmin', label: 'm³/h → L/min', inputs: [{ id: 'v', label: '값', unit: 'm³/h' }], rLabel: '결과', rUnit: 'L/min', calc: function(v) { return v.v / 0.06; } }
          ]
        },
        {
          id: 'conv_viscosity',
          name: '점도 단위 변환',
          icon: '🍯',
          desc: '절대 점도 단위인 cP(센티포아즈)와 SI 단위 Pa·s를 서로 변환합니다.',
          formula: { text: '1 cP = 0.001 Pa·s', vars: [] },
          modes: [
            { id: 'cp_pas', label: 'cP → Pa·s', inputs: [{ id: 'v', label: '값', unit: 'cP' }], rLabel: '결과', rUnit: 'Pa·s', calc: function(v) { return v.v * 0.001; } },
            { id: 'pas_cp', label: 'Pa·s → cP', inputs: [{ id: 'v', label: '값', unit: 'Pa·s' }], rLabel: '결과', rUnit: 'cP', calc: function(v) { return v.v / 0.001; } }
          ]
        }
      ]
    },
    {
      id: 'conv_energy_power_units',
      name: '에너지 및 전력/전기 단위',
      calculators: [
        {
          id: 'conv_temp',
          name: '온도 변환',
          icon: '🌡️',
          desc: '°C, °F, K 간의 온도를 변환합니다.',
          formula: { text: '°F = °C × 1.8 + 32 | K = °C + 273.15', vars: [] },
          modes: [
            { id: 'c_f', label: '°C → °F', inputs: [{ id: 'c', label: '섭씨 온도', unit: '°C' }], rLabel: '결과', rUnit: '°F', calc: function(v) { return v.c * 1.8 + 32; } },
            { id: 'f_c', label: '°F → °C', inputs: [{ id: 'f', label: '화씨 온도', unit: '°F' }], rLabel: '결과', rUnit: '°C', calc: function(v) { return (v.f - 32) / 1.8; } },
            { id: 'c_k', label: '°C → K', inputs: [{ id: 'c', label: '섭씨 온도', unit: '°C' }], rLabel: '결과', rUnit: 'K', calc: function(v) { return v.c + 273.15; } }
          ]
        },
        {
          id: 'conv_power',
          name: '전력 변환',
          icon: '⚡',
          desc: 'W, kW, HP(마력), PS 간의 전력을 변환합니다.',
          formula: { text: '1 HP ≈ 745.7 W | 1 PS ≈ 735.5 W', vars: [] },
          modes: [
            { id: 'kw_hp', label: 'kW → HP (Mechanical)', inputs: [{ id: 'v', label: '값', unit: 'kW' }], rLabel: '결과', rUnit: 'HP', calc: function(v) { return v.v / 0.745699872; } },
            { id: 'hp_kw', label: 'HP → kW', inputs: [{ id: 'v', label: '값', unit: 'HP' }], rLabel: '결과', rUnit: 'kW', calc: function(v) { return v.v * 0.745699872; } }
          ]
        },
        {
          id: 'conv_energy',
          name: '에너지 변환',
          icon: '🔥',
          desc: 'J, kJ, cal, kcal, Wh, kWh, BTU 간의 에너지를 변환합니다.',
          formula: { text: '1 cal = 4.184 J | 1 BTU ≈ 1055.06 J', vars: [] },
          modes: [
            { id: 'j_cal', label: 'J → cal', inputs: [{ id: 'v', label: '값', unit: 'J' }], rLabel: '결과', rUnit: 'cal', calc: function(v) { return v.v / 4.184; } },
            { id: 'cal_j', label: 'cal → J', inputs: [{ id: 'v', label: '값', unit: 'cal' }], rLabel: '결과', rUnit: 'J', calc: function(v) { return v.v * 4.184; } }
          ]
        },
        {
          id: 'conv_elec',
          name: '전기 단위 변환',
          icon: '⚡',
          desc: 'A↔mA, V↔mV, Ω↔kΩ 간 단위를 변환합니다.',
          formula: { text: '1 A = 1000 mA | 1 V = 1000 mV', vars: [] },
          modes: [
            { id: 'a_ma', label: 'A → mA', inputs: [{ id: 'v', label: '값', unit: 'A' }], rLabel: '결과', rUnit: 'mA', calc: function(v) { return v.v * 1000; } },
            { id: 'ma_a', label: 'mA → A', inputs: [{ id: 'v', label: '값', unit: 'mA' }], rLabel: '결과', rUnit: 'A', calc: function(v) { return v.v / 1000; } }
          ]
        },
        {
          id: 'conv_thermal_conductivity',
          name: '열전도율 단위 변환',
          icon: '🧱',
          desc: 'W/m·K 단위와 공학 공칭 단위 kcal/h·m·°C 단위를 서로 변환합니다.',
          formula: { text: '1 W/m·K ≈ 0.85984 kcal/h·m·°C', vars: [] },
          modes: [
            { id: 'wmk_kcal', label: 'W/m·K → kcal/h·m·°C', inputs: [{ id: 'v', label: '값', unit: 'W/m·K' }], rLabel: '결과', rUnit: 'kcal/h·m·°C', calc: function(v) { return v.v * 0.85984; } },
            { id: 'kcal_wmk', label: 'kcal/h·m·°C → W/m·K', inputs: [{ id: 'v', label: '값', unit: 'kcal/h·m·°C' }], rLabel: '결과', rUnit: 'W/m·K', calc: function(v) { return v.v / 0.85984; } }
          ]
        }
      ]
    }
  ]
};
