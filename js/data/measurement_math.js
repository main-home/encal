window.DATA_MEASUREMENT_MATH = {
  id: 'measurement_math',
  name: '측정·수학',
  icon: '📏',
  color: '#a1a1aa',
  subcategories: [
    {
      id: 'math_geo_meas',
      name: '기하학 및 측정',
      calculators: [
        {
          id: 'calc_distance',
          name: '거리',
          icon: '📏',
          desc: '두 좌표 사이의 직선 거리를 계산합니다.',
          formula: { text: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)', vars: [] },
          modes: [
            { id: 'dist2d', label: '2D 좌표 거리', inputs: [{ id: 'x1', label: 'X1', unit: '' }, { id: 'y1', label: 'Y1', unit: '' }, { id: 'x2', label: 'X2', unit: '' }, { id: 'y2', label: 'Y2', unit: '' }], rLabel: '거리 (d)', rUnit: '', calc: function(v) { return Math.sqrt(Math.pow(v.x2 - v.x1, 2) + Math.pow(v.y2 - v.y1, 2)); } }
          ]
        },
        {
          id: 'calc_perimeter',
          name: '둘레',
          icon: '⭕',
          desc: '원 또는 사각형의 둘레 길이를 계산합니다.',
          formula: { text: '원: 2πr | 사각형: 2(w + h)', vars: [] },
          modes: [
            { id: 'circle_p', label: '원의 둘레', inputs: [{ id: 'r', label: '반경 (r)', unit: 'mm' }], rLabel: '둘레', rUnit: 'mm', calc: function(v) { return 2 * Math.PI * v.r; } },
            { id: 'rect_p', label: '사각형 둘레', inputs: [{ id: 'w', label: '가로 (w)', unit: 'mm' }, { id: 'h', label: '세로 (h)', unit: 'mm' }], rLabel: '둘레', rUnit: 'mm', calc: function(v) { return 2 * (v.w + v.h); } }
          ]
        },
        {
          id: 'calc_arc_length',
          name: '호길이',
          icon: '📐',
          desc: '원호의 반경 and 중심각을 기준으로 호의 길이를 계산합니다.',
          formula: { text: 'L = r × θ = r × (π × angle / 180)', vars: [] },
          modes: [
            { id: 'arc_len', label: '호길이 계산', inputs: [{ id: 'r', label: '반경 (r)', unit: 'mm' }, { id: 'ang', label: '중심각', unit: '도(°)' }], rLabel: '호길이 (L)', rUnit: 'mm', calc: function(v) { return (v.r * Math.PI * v.ang) / 180; } }
          ]
        },
        {
          id: 'area_circle',
          name: '원 면적',
          icon: '⭕',
          desc: '반경을 통해 원의 단면적을 계산합니다.',
          formula: { text: 'A = π × r²', vars: [] },
          modes: [
            { id: 'circle', label: '원 면적', inputs: [{ id: 'r', label: '반경', unit: 'mm' }], rLabel: '면적', rUnit: 'mm²', calc: function(v) { return Math.PI * v.r * v.r; } }
          ]
        },
        {
          id: 'area_rect',
          name: '사각형 면적',
          icon: '⬜',
          desc: '가로와 세로 길이를 곱하여 사각형의 면적을 구합니다.',
          formula: { text: 'A = w × h', vars: [] },
          modes: [
            { id: 'rect', label: '사각형 면적', inputs: [{ id: 'w', label: '가로', unit: 'mm' }, { id: 'h', label: '세로', unit: 'mm' }], rLabel: '면적', rUnit: 'mm²', calc: function(v) { return v.w * v.h; } }
          ]
        },
        {
          id: 'area_tri',
          name: '삼각형 면적',
          icon: '📐',
          desc: '밑변과 높이로부터 삼각형의 면적을 계산합니다.',
          formula: { text: 'A = ½ × b × h', vars: [] },
          modes: [
            { id: 'tri', label: '삼각형 면적', inputs: [{ id: 'b', label: '밑변 (b)', unit: 'mm' }, { id: 'h', label: '높이 (h)', unit: 'mm' }], rLabel: '면적', rUnit: 'mm²', calc: function(v) { return 0.5 * v.b * v.h; } }
          ]
        },
        {
          id: 'area_poly',
          name: '다각형 면적',
          icon: '🛑',
          desc: '정n각형의 변 개수와 한 변의 길이로부터 면적을 구합니다.',
          formula: { text: 'A = n × s² / (4 × tan(π/n))', vars: [] },
          modes: [
            { id: 'poly', label: '정다각형 면적', inputs: [{ id: 'n', label: '변의 개수 (n)', unit: '개' }, { id: 's', label: '한 변의 길이 (s)', unit: 'mm' }], rLabel: '면적', rUnit: 'mm²', calc: function(v) { if (v.n < 3) return 0; return (v.n * v.s * v.s) / (4 * Math.tan(Math.PI / v.n)); } }
          ]
        },
        {
          id: 'area_trapezoid',
          name: '사다리꼴 면적',
          icon: '📐',
          desc: '윗변과 아랫변 길이, 높이로부터 사다리꼴의 면적을 계산합니다.',
          formula: { text: 'A = ½ × (a + b) × h', vars: [] },
          modes: [
            { id: 'trap', label: '사다리꼴 면적', inputs: [{ id: 'a', label: '윗변 (a)', unit: 'mm' }, { id: 'b', label: '아랫변 (b)', unit: 'mm' }, { id: 'h', label: '높이 (h)', unit: 'mm' }], rLabel: '면적', rUnit: 'mm²', calc: function(v) { return 0.5 * (v.a + v.b) * v.h; } }
          ]
        },
        {
          id: 'vol_cylinder',
          name: '원통 체적',
          icon: '🛢️',
          desc: '원통의 반경과 높이를 통해 체적을 계산합니다.',
          formula: { text: 'V = π × r² × h', vars: [] },
          modes: [
            { id: 'cyl', label: '원통 부피', inputs: [{ id: 'r', label: '반경 (r)', unit: 'mm' }, { id: 'h', label: '높이 (h)', unit: 'mm' }], rLabel: '부피 (V)', rUnit: 'mm³', calc: function(v) { return Math.PI * v.r * v.r * v.h; } }
          ]
        },
        {
          id: 'vol_cone',
          name: '원뿔 체적',
          icon: '🍦',
          desc: '원뿔의 반경 and 높이를 통해 체적을 계산합니다.',
          formula: { text: 'V = ⅓ × π × r² × h', vars: [] },
          modes: [
            { id: 'cone', label: '원뿔 부피', inputs: [{ id: 'r', label: '반경 (r)', unit: 'mm' }, { id: 'h', label: '높이 (h)', unit: 'mm' }], rLabel: '부피 (V)', rUnit: 'mm³', calc: function(v) { return (1/3) * Math.PI * v.r * v.r * v.h; } }
          ]
        },
        {
          id: 'vol_sphere',
          name: '구 체적',
          icon: '🔮',
          desc: '구체의 반지름으로부터 체적(부피)을 구합니다.',
          formula: { text: 'V = 4/3 × π × r³', vars: [] },
          modes: [
            { id: 'sphere', label: '구체 부피', inputs: [{ id: 'r', label: '반지름 (r)', unit: 'mm' }], rLabel: '부피 (V)', rUnit: 'mm³', calc: function(v) { return (4/3) * Math.PI * Math.pow(v.r, 3); } }
          ]
        },
        {
          id: 'vol_box',
          name: '육면체 체적',
          icon: '📦',
          desc: '직육면체의 가로, 세로, 높이를 곱해 부피를 구합니다.',
          formula: { text: 'V = w × d × h', vars: [] },
          modes: [
            { id: 'box', label: '직육면체 부피', inputs: [{ id: 'w', label: '가로', unit: 'mm' }, { id: 'd', label: '세로', unit: 'mm' }, { id: 'h', label: '높이', unit: 'mm' }], rLabel: '부피 (V)', rUnit: 'mm³', calc: function(v) { return v.w * v.d * v.h; } }
          ]
        },
        {
          id: 'mass_weight',
          name: '무게 계산',
          icon: '⚖️',
          desc: '체적과 재료의 밀도로부터 무게를 산출합니다.',
          formula: { text: 'W = V × ρ', vars: [] },
          modes: [
            { id: 'calc_w', label: '무게 구하기', inputs: [{ id: 'v', label: '부피', unit: 'cm³' }, { id: 'rho', label: '밀도', unit: 'g/cm³' }], rLabel: '무게', rUnit: 'g', calc: function(v) { return v.v * v.rho; } }
          ]
        },
        {
          id: 'mass_density',
          name: '밀도 계산',
          icon: '🧪',
          desc: '질량과 부피로부터 밀도를 산출합니다.',
          formula: { text: 'ρ = m / V', vars: [] },
          modes: [
            { id: 'calc_d', label: '밀도 구하기', inputs: [{ id: 'm', label: '질량', unit: 'g' }, { id: 'v', label: '부피', unit: 'cm³' }], rLabel: '밀도', rUnit: 'g/cm³', calc: function(v) { return v.v ? v.m / v.v : Infinity; } }
          ]
        },
        {
          id: 'mass_sg',
          name: '비중',
          icon: '🛢️',
          desc: '밀도 조건으로부터 비중을 구합니다.',
          formula: { text: 'SG = ρ / ρ_water', vars: [] },
          modes: [
            { id: 'calc_sg', label: '비중 구하기', inputs: [{ id: 'rho', label: '밀도', unit: 'g/cm³' }], rLabel: '비중', rUnit: '', calc: function(v) { return v.rho; } }
          ]
        },
        {
          id: 'geo_pythagoras',
          name: '피타고라스 정리',
          icon: '📐',
          desc: '두 직각 변으로부터 빗변의 길이를 구합니다.',
          formula: { text: 'c = √(a² + b²)', vars: [] },
          modes: [
            { id: 'pyth', label: '빗변 구하기', inputs: [{ id: 'a', label: '밑변 (a)', unit: 'mm' }, { id: 'b', label: '높이 (b)', unit: 'mm' }], rLabel: '빗변 (c)', rUnit: 'mm', calc: function(v) { return Math.sqrt(v.a*v.a + v.b*v.b); } }
          ]
        },
        {
          id: 'geo_coordinate',
          name: '좌표 이동',
          icon: '🌐',
          desc: '좌표와 이동 거리 및 각도로부터 최종 좌표를 구합니다.',
          formula: { text: 'x₂ = x₁ + d × cos(θ) | y₂ = y₁ + d × sin(θ)', vars: [] },
          modes: [
            { id: 'move_x', label: '이동 X 구하기', inputs: [{ id: 'x1', label: 'X1', unit: 'mm' }, { id: 'd', label: '거리 (d)', unit: 'mm' }, { id: 'ang', label: '방향각', unit: '°' }], rLabel: 'X2', rUnit: 'mm', calc: function(v) { return v.x1 + v.d * Math.cos((v.ang * Math.PI)/180); } },
            { id: 'move_y', label: '이동 Y 구하기', inputs: [{ id: 'y1', label: 'Y1', unit: 'mm' }, { id: 'd', label: '거리 (d)', unit: 'mm' }, { id: 'ang', label: '방향각', unit: '°' }], rLabel: 'Y2', rUnit: 'mm', calc: function(v) { return v.y1 + v.d * Math.sin((v.ang * Math.PI)/180); } }
          ]
        }
      ]
    },
    {
      id: 'math_pure_stat',
      name: '수학 및 통계',
      calculators: [
        {
          id: 'trig_sin',
          name: 'sin 계산',
          icon: '📐',
          desc: '입력된 각도의 사인(sine) 값을 구합니다.',
          formula: { text: 'y = sin(θ)', vars: [] },
          modes: [
            { id: 'sin_deg', label: 'sin(deg)', inputs: [{ id: 'deg', label: '각도', unit: '°' }], rLabel: '결과', rUnit: '', calc: function(v) { return Math.sin((v.deg * Math.PI) / 180); } }
          ]
        },
        {
          id: 'trig_cos',
          name: 'cos 계산',
          icon: '📐',
          desc: '입력된 각도의 코사인(cosine) 값을 구합니다.',
          formula: { text: 'y = cos(θ)', vars: [] },
          modes: [
            { id: 'cos_deg', label: 'cos(deg)', inputs: [{ id: 'deg', label: '각도', unit: '°' }], rLabel: '결과', rUnit: '', calc: function(v) { return Math.cos((v.deg * Math.PI) / 180); } }
          ]
        },
        {
          id: 'trig_tan',
          name: 'tan 계산',
          icon: '📐',
          desc: '입력된 각도의 탄젠트(tangent) 값을 구합니다.',
          formula: { text: 'y = tan(θ)', vars: [] },
          modes: [
            { id: 'tan_deg', label: 'tan(deg)', inputs: [{ id: 'deg', label: '각도', unit: '°' }], rLabel: '결과', rUnit: '', calc: function(v) { return Math.tan((v.deg * Math.PI) / 180); } }
          ]
        },
        {
          id: 'stat_mean',
          name: '평균',
          icon: '📊',
          desc: '간단히 세 값의 평균을 계산합니다.',
          formula: { text: 'Mean = (x₁ + x₂ + x₃) / 3', vars: [] },
          modes: [
            { id: 'mean3', label: '3개 변수 평균', inputs: [{ id: 'x1', label: '값1', unit: '' }, { id: 'x2', label: '값2', unit: '' }, { id: 'x3', label: '값3', unit: '' }], rLabel: '평균', rUnit: '', calc: function(v) { return (v.x1 + v.x2 + v.x3) / 3; } }
          ]
        },
        {
          id: 'stat_cp',
          name: '공정능력지수 Cp',
          icon: '📉',
          desc: '규격 상하한과 표준편차로부터 Cp 지수를 계산합니다.',
          formula: { text: 'Cp = (USL - LSL) / (6 × s)', vars: [] },
          modes: [
            { id: 'cp', label: 'Cp 계산', inputs: [{ id: 'usl', label: '규격 상한', unit: '' }, { id: 'lsl', label: '규격 하한', unit: '' }, { id: 's', label: '표준편차 (s)', unit: '' }], rLabel: 'Cp', rUnit: '', calc: function(v) { return v.s ? (v.usl - v.lsl) / (6 * v.s) : Infinity; } }
          ]
        },
        {
          id: 'gen_percent',
          name: '백분율',
          icon: '📊',
          desc: '전체값에 대한 부분값의 비율(%)을 구합니다.',
          formula: { text: 'P = (Part / Total) × 100', vars: [] },
          modes: [
            { id: 'perc', label: '백분율 계산', inputs: [{ id: 'part', label: '부분값', unit: '' }, { id: 'tot', label: '전체값', unit: '' }], rLabel: '비율', rUnit: '%', calc: function(v) { return v.tot ? (v.part / v.tot) * 100 : Infinity; } }
          ]
        },
        {
          id: 'gen_log',
          name: '로그',
          icon: '📈',
          desc: '상용로그 log10 값을 계산합니다.',
          formula: { text: 'y = log10(x)', vars: [] },
          modes: [
            { id: 'log', label: '상용로그 (log10)', inputs: [{ id: 'x', label: '값 (x)', unit: '' }], rLabel: '결과', rUnit: '', calc: function(v) { return v.x > 0 ? Math.log10(v.x) : Infinity; } }
          ]
        },
        {
          id: 'stat_std_dev',
          name: '3개 표본 표준편차',
          icon: '📊',
          desc: '세 표본값으로부터 표본 표준편차(s)를 계산합니다.',
          formula: { text: 's = √((Σ(xi - m)²)/2)', vars: [] },
          modes: [
            { id: 'std', label: '표준편차 계산', inputs: [{ id: 'x1', label: '값1', unit: '' }, { id: 'x2', label: '값2', unit: '' }, { id: 'x3', label: '값3', unit: '' }], rLabel: '표본 표준편차', rUnit: '', calc: function(v) { var m = (v.x1 + v.x2 + v.x3) / 3; return Math.sqrt((Math.pow(v.x1-m,2)+Math.pow(v.x2-m,2)+Math.pow(v.x3-m,2))/2); } }
          ]
        },
        {
          id: 'linear_interpolation',
          name: '선형 보간법 (Interpolation)',
          icon: '📈',
          desc: '두 기준점 사이의 비례값 y를 선형 보간으로 구합니다.',
          formula: { text: 'y = y1 + (x - x1) × (y2 - y1) / (x2 - x1)', vars: [] },
          modes: [
            { id: 'interp', label: '보간값 y 계산', inputs: [{ id: 'x1', label: 'x1', unit: '' }, { id: 'y1', label: 'y1', unit: '' }, { id: 'x2', label: 'x2', unit: '' }, { id: 'y2', label: 'y2', unit: '' }, { id: 'x', label: '목표 x', unit: '' }], rLabel: '보간값 (y)', rUnit: '', calc: function(v) { var denom = v.x2 - v.x1; return denom ? v.y1 + (v.x - v.x1) * (v.y2 - v.y1) / denom : Infinity; } }
          ]
        }
      ]
    }
  ]
};
