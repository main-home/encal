window.DATA_THERMAL_FLUID = {
  id: 'thermal_fluid',
  name: '열·유체',
  icon: '🔥',
  color: '#f97316',
  subcategories: [
    {
      id: 'tf_thermo_heat',
      name: '열역학 및 열전달',
      calculators: [
        {
          id: 'conduction',
          name: '전도 열전달',
          icon: '🧱',
          desc: '푸리에 열전도 법칙을 적용해 평판의 열전도율을 계산합니다.',
          formula: { text: 'Q = k × A × ΔT / L', vars: [] },
          modes: [
            { id: 'cond', label: '열량 계산', inputs: [{ id: 'k', label: '열전도율', unit: 'W/m·K' }, { id: 'a', label: '면적', unit: 'm²' }, { id: 'dt', label: '온도차', unit: '°C' }, { id: 'l', label: '두께', unit: 'mm' }], rLabel: '열전달량', rUnit: 'W', calc: function(v) { return v.l ? (v.k * v.a * v.dt) / (v.l / 1000) : Infinity; } }
          ]
        },
        {
          id: 'convection',
          name: '대류 열전달',
          icon: '🌬️',
          desc: '표면과 유체 사이의 대류 열전달량을 구합니다.',
          formula: { text: 'Q = h × A × ΔT', vars: [] },
          modes: [
            { id: 'conv', label: '열량 계산', inputs: [{ id: 'h', label: '대류계수', unit: 'W/m²·K' }, { id: 'a', label: '면적', unit: 'm²' }, { id: 'dt', label: '온도차', unit: '°C' }], rLabel: '열전달량', rUnit: 'W', calc: function(v) { return v.h * v.a * v.dt; } }
          ]
        },
        {
          id: 'radiation',
          name: '복사 열전달',
          icon: '☀️',
          desc: '스테판-볼츠만 상수를 활용해 표면 복사열을 계산합니다.',
          formula: { text: 'Q = ε × σ × A × (T1⁴ - T2⁴)', vars: [] },
          modes: [
            { id: 'rad', label: '복사열 계산', inputs: [{ id: 'eps', label: '방사율', unit: '' }, { id: 'a', label: '면적', unit: 'm²' }, { id: 't1', label: 'T1 (고온)', unit: '°C' }, { id: 't2', label: 'T2 (저온)', unit: '°C' }], rLabel: '복사열', rUnit: 'W', calc: function(v) { var T1 = v.t1 + 273.15; var T2 = v.t2 + 273.15; return v.eps * 5.67e-8 * v.a * (Math.pow(T1, 4) - Math.pow(T2, 4)); } }
          ]
        },
        {
          id: 'thermal_resist',
          name: '열저항',
          icon: '🧱',
          desc: '평판 재질의 두께와 전도율로부터 열저항(R)을 구합니다.',
          formula: { text: 'R = L / (k × A)', vars: [] },
          modes: [
            { id: 'resist', label: '열저항 계산', inputs: [{ id: 'l', label: '두께', unit: 'mm' }, { id: 'k', label: '열전도율', unit: 'W/m·K' }, { id: 'a', label: '면적', unit: 'm²' }], rLabel: '열저항', rUnit: 'K/W', calc: function(v) { var denom = v.k * v.a; return denom ? (v.l / 1000) / denom : Infinity; } }
          ]
        },
        {
          id: 'specific_heat_energy',
          name: '비열량',
          icon: '🔥',
          desc: '공급된 열량 및 온도 상승치로부터 열에너지를 계산합니다.',
          formula: { text: 'Q = m × c × ΔT', vars: [] },
          modes: [
            { id: 'calc_q', label: '열량 계산', inputs: [{ id: 'm', label: '질량', unit: 'kg' }, { id: 'c', label: '비열', unit: 'kJ/kg·°C' }, { id: 'dt', label: '온도 변화', unit: '°C' }], rLabel: '열량 (Q)', rUnit: 'kJ', calc: function(v) { return v.m * v.c * v.dt; } }
          ]
        },
        {
          id: 'cooling_time',
          name: '냉각시간',
          icon: '⏱️',
          desc: '물질의 열전달 냉각 특성 및 온도 변화 조건으로부터 냉각 소요 시간을 대략적으로 산출합니다.',
          formula: { text: 't = - (m × c / (h × A)) × ln((T - Tf) / (Ti - Tf))', vars: [] },
          modes: [
            { id: 'time', label: '냉각시간 산출', inputs: [{ id: 'm', label: '질량', unit: 'kg' }, { id: 'c', label: '비열', unit: 'kJ/kg·°C' }, { id: 'h', label: '대류계수', unit: 'W/m²·K' }, { id: 'a', label: '표면적', unit: 'm²' }, { id: 'ti', label: '초기온도', unit: '°C' }, { id: 't', label: '목표온도', unit: '°C' }, { id: 'tf', label: '유체온도', unit: '°C' }], rLabel: '냉각시간', rUnit: 's', calc: function(v) { var denom = v.h * v.a; var num = (v.t - v.tf) / (v.ti - v.tf); if (denom === 0 || num <= 0 || num >= 1) return Infinity; return -((v.m * (v.c * 1000)) / denom) * Math.log(num); } }
          ]
        },
        {
          id: 'thermal_efficiency',
          name: '열기기관 열효율',
          icon: '🔥',
          desc: '공급 열량과 방출 열량으로부터 열기관의 효율을 구합니다.',
          formula: { text: 'η = (Qin - Qout) / Qin × 100', vars: [] },
          modes: [
            { id: 'eff', label: '열효율 계산', inputs: [{ id: 'qi', label: '공급 열량 (Qin)', unit: 'kJ' }, { id: 'qo', label: '방출 열량 (Qout)', unit: 'kJ' }], rLabel: '열효율 (η)', rUnit: '%', calc: function(v) { return v.qi ? ((v.qi - v.qo) / v.qi) * 100 : 0; } }
          ]
        }
      ]
    },
    {
      id: 'tf_pipe_pump',
      name: '유체 배관 및 펌프',
      calculators: [
        {
          id: 'pressure_drop',
          name: '압력손실',
          icon: '📉',
          desc: '배관 내 유동의 마찰 손실 압력을 구합니다.',
          formula: { text: 'ΔP = f × (L/D) × (ρ × v² / 2)', vars: [] },
          modes: [
            { id: 'dp', label: '압력손실 계산', inputs: [{ id: 'f', label: '마찰계수', unit: '' }, { id: 'l', label: '배관길이', unit: 'm' }, { id: 'd', label: '내경', unit: 'mm' }, { id: 'rho', label: '밀도', unit: 'kg/m³' }, { id: 'v', label: '유속', unit: 'm/s' }], rLabel: '압력손실', rUnit: 'kPa', calc: function(v) { var D = v.d / 1000; if (!D) return Infinity; return (v.f * (v.l / D) * (v.rho * v.v * v.v / 2)) / 1000; } }
          ]
        },
        {
          id: 'flow_velocity',
          name: '유속',
          icon: '🏃',
          desc: '유량과 내경으로부터 배관 내 유속을 계산합니다.',
          formula: { text: 'v = 4Q / (π × D²)', vars: [] },
          modes: [
            { id: 'vel', label: '유속 계산', inputs: [{ id: 'q', label: '유량', unit: 'L/min' }, { id: 'd', label: '관경', unit: 'mm' }], rLabel: '유속', rUnit: 'm/s', calc: function(v) { var D = v.d / 1000; var A = Math.PI * D * D / 4; return A ? (v.q / 60000) / A : Infinity; } }
          ]
        },
        {
          id: 'flow_rate',
          name: '유량',
          icon: '💧',
          desc: '내경과 유속으로부터 유량을 구합니다.',
          formula: { text: 'Q = A × v', vars: [] },
          modes: [
            { id: 'flow', label: '유량 계산', inputs: [{ id: 'd', label: '관경', unit: 'mm' }, { id: 'v', label: '유속', unit: 'm/s' }], rLabel: '유량', rUnit: 'L/min', calc: function(v) { var D = v.d / 1000; var A = Math.PI * D * D / 4; return A * v.v * 60000; } }
          ]
        },
        {
          id: 'reynolds_tf',
          name: 'Reynolds 계산',
          icon: '🌀',
          desc: '배관 유체의 레이놀즈 수(Re)를 구합니다.',
          formula: { text: 'Re = v × D / ν', vars: [] },
          modes: [
            { id: 're', label: 'Reynolds 수', inputs: [{ id: 'v', label: '유속', unit: 'm/s' }, { id: 'd', label: '내경', unit: 'mm' }, { id: 'nu', label: '동점성계수', unit: '×10⁻⁶ m²/s' }], rLabel: 'Re', rUnit: '', calc: function(v) { var D = v.d / 1000; var nu = v.nu * 1e-6; return nu ? (v.v * D) / nu : Infinity; } }
          ]
        },
        {
          id: 'pump_head',
          name: '양정',
          icon: '📈',
          desc: '실양정과 관내 손실수두를 모두 고려한 전양정(H)을 구합니다.',
          formula: { text: 'H = H_static + H_loss', vars: [] },
          modes: [
            { id: 'head', label: '전양정 계산', inputs: [{ id: 'hs', label: '실양정', unit: 'm' }, { id: 'hl', label: '손실수두', unit: 'm' }], rLabel: '전양정', rUnit: 'm', calc: function(v) { return v.hs + v.hl; } }
          ]
        },
        {
          id: 'pump_power',
          name: '펌프동력',
          icon: '⚙️',
          desc: '유량, 양정, 효율로부터 필요 펌프 동력을 구합니다.',
          formula: { text: 'P = ρgQH / η', vars: [] },
          modes: [
            { id: 'power', label: '축동력 계산', inputs: [{ id: 'q', label: '유량', unit: 'L/min' }, { id: 'h', label: '전양정', unit: 'm' }, { id: 'eta', label: '효율', unit: '%' }], rLabel: '동력', rUnit: 'kW', calc: function(v) { var Q = v.q / 60000; var eta = v.eta / 100; return eta ? (1000 * 9.81 * Q * v.h) / (eta * 1000) : Infinity; } }
          ]
        },
        {
          id: 'pump_npsh',
          name: 'NPSH',
          icon: '📊',
          desc: '펌프 흡입 배관의 유효흡입수두(NPSHa)를 계산합니다.',
          formula: { text: 'NPSHa = (Pa - Pv) / (ρg) + Zs - hfs', vars: [] },
          modes: [
            { id: 'npsha', label: 'NPSHa 계산', inputs: [{ id: 'pa', label: '대기압', unit: 'kPa' }, { id: 'pv', label: '증기압', unit: 'kPa' }, { id: 'zs', label: '흡입 높이', unit: 'm' }, { id: 'hf', label: '마찰 손실', unit: 'm' }], rLabel: 'NPSHa', rUnit: 'm', calc: function(v) { return ((v.pa - v.pv) * 1000) / (1000 * 9.81) + v.zs - v.hf; } }
          ]
        },
        {
          id: 'darcy_weisbach_friction',
          name: '원관 층류 마찰계수',
          icon: '🌀',
          desc: '레이놀즈 수(Re) 조건으로부터 원형 관 내 층류 유동의 마찰 계수를 구합니다.',
          formula: { text: 'f = 64 / Re', vars: [] },
          modes: [
            { id: 'fric', label: '마찰계수 계산', inputs: [{ id: 're', label: '레이놀즈 수 (Re)', unit: '2000이하' }], rLabel: '마찰 계수 (f)', rUnit: '', calc: function(v) { return v.re > 0 ? 64 / v.re : Infinity; } }
          ]
        }
      ]
    },
    {
      id: 'tf_pneu_hyd',
      name: '유공압 시스템',
      calculators: [
        {
          id: 'pneu_cylinder_force',
          name: '공압 실린더 추력',
          icon: '🔩',
          desc: '사용 공압 압력과 실린더 보어(내경)로부터 추력을 구합니다.',
          formula: { text: 'F = P × A', vars: [] },
          modes: [
            { id: 'force', label: '실린더 힘 계산', inputs: [{ id: 'p', label: '압력', unit: 'bar' }, { id: 'd', label: '실린더 내경', unit: 'mm' }], rLabel: '실린더 추력', rUnit: 'N', calc: function(v) { var A = Math.PI * Math.pow(v.d, 2) / 4; return (v.p * 0.1) * A; } }
          ]
        },
        {
          id: 'hyd_cylinder_force',
          name: '유압 실린더 추력',
          icon: '🏗️',
          desc: '유압 작동 압력과 실린더 치수로부터 힘을 구합니다.',
          formula: { text: 'F = P × A', vars: [] },
          modes: [
            { id: 'force', label: '유압 실린더 힘', inputs: [{ id: 'p', label: '압력', unit: 'bar' }, { id: 'd', label: '피스톤 지름', unit: 'mm' }], rLabel: '출력 힘', rUnit: 'kN', calc: function(v) { var A = Math.PI * Math.pow(v.d, 2) / 4; return ((v.p * 0.1) * A) / 1000; } }
          ]
        },
        {
          id: 'cylinder_air_consumption',
          name: '실린더 공기 소비량',
          icon: '🌬️',
          desc: '실린더 보어와 행정(스트로크), 왕복 횟수로부터 소요 자유 공기량을 산출합니다.',
          formula: { text: 'Q = 2 × (π×d²/4) × S × N × (P + 1.013)', vars: [] },
          modes: [
            { id: 'air', label: '공기소비량 계산', inputs: [{ id: 'd', label: '실린더 내경', unit: 'mm' }, { id: 's', label: '행정 (S)', unit: 'mm' }, { id: 'n', label: '분당 왕복횟수', unit: '회' }, { id: 'p', label: '사용 압력', unit: 'bar' }], rLabel: '분당 소비 유량', rUnit: 'L/min', calc: function(v) { var A_dm2 = (Math.PI * v.d * v.d / 4) / 10000; var S_dm = v.s / 100; var compression_ratio = (v.p + 1.013) / 1.013; return 2 * A_dm2 * S_dm * v.n * compression_ratio; } }
          ]
        },
        {
          id: 'accumulator_volume',
          name: '어큐뮬레이터 용량',
          icon: '🔋',
          desc: '보일의 법칙(등온 조건)을 기준으로 유압 어큐뮬레이터 용적을 산출합니다.',
          formula: { text: 'V1 = V_gas × P2 / (P2 - P1)', vars: [] },
          modes: [
            { id: 'acc', label: '용적 계산', inputs: [{ id: 'p1', label: '최소 공급압', unit: 'bar' }, { id: 'p2', label: '최대 충전압', unit: 'bar' }, { id: 'v_gas', label: '필요 방출유량', unit: 'L' }], rLabel: '필요 가스용적 (V1)', rUnit: 'L', calc: function(v) { var diff = v.p2 - v.p1; return diff > 0 ? (v.v_gas * v.p2) / diff : Infinity; } }
          ]
        }
      ]
    }
  ]
};
