window.DATA_MANUFACTURING = {
  id: 'manufacturing',
  name: '제조',
  icon: '🏭',
  color: '#38bdf8',
  subcategories: [
    {
      id: 'mfg_mach_cut',
      name: '가공 및 절삭',
      calculators: [
        {
          id: 'cnc_mrr',
          name: '금속 제거율 (MRR)',
          icon: '⚙️',
          desc: '절삭폭, 가공깊이, 이송 속도로부터 분당 칩 배출량을 계산합니다.',
          formula: { text: 'MRR = w × d × F / 1000', vars: [{ s: 'MRR', d: '금속제거율 (cm³/min)' }, { s: 'w', d: '가공 폭 (mm)' }, { s: 'd', d: '가공 깊이 (mm)' }, { s: 'F', d: '이송속도 (mm/min)' }] },
          modes: [
            { id: 'mrr', label: 'MRR 계산', inputs: [{ id: 'w', label: '가공 폭 (w)', unit: 'mm' }, { id: 'd', label: '가공 깊이 (ap)', unit: 'mm' }, { id: 'f', label: '이송속도 (F)', unit: 'mm/min' }], rLabel: '금속 제거율', rUnit: 'cm³/min', calc: function(v) { return (v.w * v.d * v.f) / 1000; } }
          ]
        },
        {
          id: 'lathe_speed',
          name: '선반 절삭속도',
          icon: '🔄',
          desc: '가공경과 주축회전수로부터 절삭속도(V)를 계산합니다.',
          formula: { text: 'V = (π × D × N) / 1000', vars: [] },
          modes: [
            { id: 'speed', label: '절삭속도 계산', inputs: [{ id: 'd', label: '가공경 (D)', unit: 'mm' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }], rLabel: '절삭속도', rUnit: 'm/min', calc: function(v) { return (Math.PI * v.d * v.n) / 1000; } }
          ]
        },
        {
          id: 'milling_feed_mfg',
          name: '밀링 Feed 계산',
          icon: '⚙️',
          desc: '날당이송, 커터날수, RPM을 이용하여 이송속도를 계산합니다.',
          formula: { text: 'F = fz × Z × N', vars: [] },
          modes: [
            { id: 'feed', label: '이송속도 계산', inputs: [{ id: 'fz', label: '날당이송 (fz)', unit: 'mm/t' }, { id: 'z', label: '날 수 (Z)', unit: '개' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }], rLabel: '테이블 이송속도', rUnit: 'mm/min', calc: function(v) { return v.fz * v.z * v.n; } }
          ]
        },
        {
          id: 'drill_time_mfg',
          name: 'Drill 가공시간',
          icon: '⏱️',
          desc: '구멍 깊이와 이송 속도로부터 드릴 관통 소요 시간을 계산합니다.',
          formula: { text: 'T = (L + 0.3d) / (N × f)', vars: [] },
          modes: [
            { id: 'time', label: '드릴 가공시간', inputs: [{ id: 'l', label: '구멍 깊이 (L)', unit: 'mm' }, { id: 'd', label: '드릴 직경 (d)', unit: 'mm' }, { id: 'n', label: '회전수 (N)', unit: 'RPM' }, { id: 'f', label: '이송량 (f)', unit: 'mm/rev' }], rLabel: '가공시간', rUnit: '분 (min)', calc: function(v) { var denom = v.n * v.f; return denom ? (v.l + 0.3 * v.d) / denom : Infinity; } }
          ]
        },
        {
          id: 'tap_torque_mfg',
          name: '탭 토크',
          icon: '🔧',
          desc: '피치, 나사 호칭경 및 재료 상수를 사용해 나사 탭 가공에 필요한 대략적인 토크를 구합니다.',
          formula: { text: 'T ≈ 0.2 × d² × p', vars: [] },
          modes: [
            { id: 'torque', label: '탭 토크 계산', inputs: [{ id: 'd', label: '나사 지름', unit: 'mm' }, { id: 'p', label: '나사 피치', unit: 'mm' }], rLabel: '필요 토크', rUnit: 'N·m', calc: function(v) { return 0.2 * v.d * v.d * v.p; } }
          ]
        },
        {
          id: 'cut_time',
          name: '절단시간',
          icon: '✂️',
          desc: '절단 경로의 총 길이와 절단 공급 속도(Feed)로부터 소요 가공시간을 계산합니다.',
          formula: { text: 't = L / F', vars: [] },
          modes: [
            { id: 'time', label: '절단 시간 계산', inputs: [{ id: 'l', label: '절단 길이', unit: 'mm' }, { id: 'f', label: '절단 속도', unit: 'mm/min' }], rLabel: '소요 시간', rUnit: '분 (min)', calc: function(v) { return v.f ? v.l / v.f : Infinity; } }
          ]
        },
        {
          id: 'surface_roughness',
          name: '이론 표면 거칠기 (Rmax)',
          icon: '📐',
          desc: '노즈 반경(R)과 회전당 이송량(f)으로부터 가공 표면 거칠기를 계산합니다.',
          formula: { text: 'Rmax = f² / (8 × R_nose) × 1000', vars: [] },
          modes: [
            { id: 'rough', label: 'Rmax 계산', inputs: [{ id: 'f', label: '이송량 (f)', unit: 'mm/rev' }, { id: 'rn', label: '공구 노즈반경', unit: 'mm' }], rLabel: '표면거칠기 (Rmax)', rUnit: 'μm', calc: function(v) { return v.rn > 0 ? (v.f * v.f * 1000) / (8 * v.rn) : Infinity; } }
          ]
        },
        {
          id: 'milling_power',
          name: '밀링 절삭 소요동력',
          icon: '⚡',
          desc: '금속 제거율(MRR)과 피절삭재 비절삭저항(Kc)으로부터 필요한 절삭 동력을 산출합니다.',
          formula: { text: 'Pc = MRR × Kc / (60 × η)', vars: [] },
          modes: [
            { id: 'power', label: '절삭동력 계산', inputs: [{ id: 'mrr', label: '금속제거율 (MRR)', unit: 'cm³/min' }, { id: 'kc', label: '비절삭저항 (Kc)', unit: 'GPa' }, { id: 'eff', label: '스핀들 효율', unit: '%' }], rLabel: '스핀들 소요동력', rUnit: 'kW', calc: function(v) { var eff = v.eff / 100; return (eff && v.mrr) ? (v.mrr * (v.kc * 1000) / 60) / (eff * 1000) : 0; } }
          ]
        }
      ]
    },
    {
      id: 'mfg_form_join',
      name: '성형 및 접합',
      calculators: [
        {
          id: 'press_tonnage',
          name: '프레스톤수 (전단력)',
          icon: '✂️',
          desc: '윤곽 길이, 강도 및 판재 두께로부터 전단 가공 하중을 계산합니다.',
          formula: { text: 'P = L × t × τ / 9800', vars: [] },
          modes: [
            { id: 'ton', label: '프레스 하중 계산', inputs: [{ id: 'l', label: '윤곽 길이 (L)', unit: 'mm' }, { id: 't', label: '판 두께 (t)', unit: 'mm' }, { id: 'tau', label: '전단강도 (τ)', unit: 'MPa' }], rLabel: '소요 전단력', rUnit: '톤 (ton)', calc: function(v) { return (v.l * v.t * v.tau) / 9806.65; } }
          ]
        },
        {
          id: 'mold_clamping_force',
          name: '형체력 (Clamping Force)',
          icon: '📐',
          desc: '투영 면적과 캐비티 내 평균 수지 압력으로부터 사출성형 형체력을 계산합니다.',
          formula: { text: 'F = A_proj × P_cavity / 1000', vars: [] },
          modes: [
            { id: 'clamp', label: '형체력 계산', inputs: [{ id: 'a', label: '투영 면적', unit: 'cm²' }, { id: 'p', label: '평균 수지 압력', unit: 'bar' }], rLabel: '필요 형체력', rUnit: '톤 (ton)', calc: function(v) { return (v.a * v.p) / 1000; } }
          ]
        },
        {
          id: 'weld_strength',
          name: '용접강도',
          icon: '🔥',
          desc: '필릿 용접부의 각장(목두께) 및 길이에 따른 허용 하중을 구합니다.',
          formula: { text: 'F = 0.707 × a × L × σ_allow', vars: [] },
          modes: [
            { id: 'weld', label: '허용 하중 계산', inputs: [{ id: 'a', label: '각장 (a)', unit: 'mm' }, { id: 'l', label: '용접 길이 (L)', unit: 'mm' }, { id: 's', label: '허용 응력', unit: 'MPa' }], rLabel: '허용 하중', rUnit: 'kN', calc: function(v) { return (0.707 * v.a * v.l * v.s) / 1000; } }
          ]
        },
        {
          id: 'springback',
          name: '프레스 굽힘 스프링백',
          icon: '📐',
          desc: '판재의 굽힘 가공 전후 탄성 계수와 항복 응력 조건에 의한 곡률 반경 스프링백 계수(K)를 계산합니다.',
          formula: { text: 'K = R_before / R_after = 1 - 3(R_b × σ_y / (E × t))', vars: [] },
          modes: [
            { id: 'sb', label: '스프링백 계산', inputs: [{ id: 'rb', label: '가공 전 반경', unit: 'mm' }, { id: 'sy', label: '재료 항복강도', unit: 'MPa' }, { id: 'e', label: '재료 탄성계수', unit: 'GPa' }, { id: 't', label: '판 두께', unit: 'mm' }], rLabel: '스프링백 계수 K (1에 가까울수록 복원 작음)', rUnit: '', calc: function(v) { return 1 - 3 * (v.rb * v.sy) / (v.e * 1000 * v.t); } }
          ]
        },
        {
          id: 'injection_cooling',
          name: '사출 냉각시간 예측',
          icon: '⏱️',
          desc: '금형 온도, 수지 온도 및 두께 조건에서 냉각에 필요한 최저 안전 인출 대기 시간을 계산합니다.',
          formula: { text: 't_cooling ≈ (s² / (π² × α)) × ln(8/π² × (T_melt - T_mold)/(T_eject - T_mold))', vars: [] },
          modes: [
            { id: 'cool', label: '냉각시간 계산', inputs: [{ id: 's', label: '성형품 최대두께', unit: 'mm' }, { id: 'alpha', label: '열확산계수', unit: 'mm²/s' }, { id: 'tmelt', label: '수지 용융온도', unit: '°C' }, { id: 'tmold', label: '금형 온도', unit: '°C' }, { id: 'teject', label: '취출 가능온도', unit: '°C' }], rLabel: '예상 냉각 시간', rUnit: 's', calc: function(v) { var n = (v.tmelt - v.tmold) / (v.teject - v.tmold); if (n <= 0 || !v.alpha) return Infinity; return (v.s*v.s / (Math.PI*Math.PI * v.alpha)) * Math.log(8/(Math.PI*Math.PI) * n); } }
          ]
        }
      ]
    },
    {
      id: 'mfg_productivity_sub',
      name: '생산성',
      calculators: [
        {
          id: 'takt_time',
          name: 'TAKT Time',
          icon: '⏱️',
          desc: '가동 시간과 목표 생산량으로부터 공정 택트 타임을 계산합니다.',
          formula: { text: 'TAKT = T_work / Q_target', vars: [] },
          modes: [
            { id: 'takt', label: 'TAKT Time 계산', inputs: [{ id: 't', label: '하루 가동시간', unit: '시간 (h)' }, { id: 'q', label: '일일 생산계획량', unit: '개' }], rLabel: '택트 타임', rUnit: '초 (s)', calc: function(v) { return v.q ? (v.t * 3600) / v.q : Infinity; } }
          ]
        },
        {
          id: 'cycle_time_throughput',
          name: '사이클 타임 처리량',
          icon: '📊',
          desc: '개별 부품 사이클 타임과 공정 효율 조건에서 특정 근무 시간 동안의 예상 총 생산량을 구합니다.',
          formula: { text: 'Output = (T_total / Cycle_Time) × Efficiency', vars: [] },
          modes: [
            { id: 'out', label: '처리량 예측', inputs: [{ id: 'ct', label: '사이클 타임 (CT)', unit: '초' }, { id: 'hour', label: '작업 시간', unit: '시간' }, { id: 'eff', label: '종합 효율', unit: '%' }], rLabel: '예상 생산량', rUnit: '개', calc: function(v) { return v.ct ? Math.floor((v.hour * 3600 / v.ct) * (v.eff / 100)) : 0; } }
          ]
        }
      ]
    }
  ]
};
