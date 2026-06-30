// ============================================
// UI: DOM rendering functions
// ============================================

window.UI = {

  // ── 대분류 그리드 렌더링 ──
  renderCatGrid: function(categories, selectedCatId) {
    const grid = document.getElementById('catGrid');
    grid.innerHTML = '';

    categories.forEach(function(cat) {
      var count = 0;
      cat.subcategories.forEach(function(sub) { count += sub.calculators.length; });

      var btn = document.createElement('button');
      btn.className = 'cat-grid-btn' + (selectedCatId === cat.id ? ' active' : '');
      btn.style.setProperty('--btn-bg', cat.color + '18');
      btn.style.setProperty('--btn-border', cat.color + '55');
      btn.style.setProperty('--btn-color', cat.color);
      btn.innerHTML = '<span class="cat-icon">' + cat.icon + '</span><span class="cat-label">' + App.translatePhrase(cat.name) + '</span>';
      btn.onclick = function() { App.selectCategory(cat.id); };
      grid.appendChild(btn);
    });
  },

  // ── 중분류 행 렌더링 ──
  renderSubRow: function(subcategories, selectedSubId) {
    var row = document.getElementById('subRow');
    row.innerHTML = '';

    if (!subcategories || subcategories.length === 0) {
      row.style.display = 'none';
      return;
    }

    row.style.display = 'flex';
    subcategories.forEach(function(sub) {
      var btn = document.createElement('button');
      btn.className = 'nav-btn' + (selectedSubId === sub.id ? ' active' : '');
      btn.innerHTML = App.translatePhrase(sub.name) + ' <span class="b-count">' + sub.calculators.length + '</span>';
      btn.onclick = function() { App.selectSubcategory(sub.id); };
      row.appendChild(btn);
    });
  },

  // ── 소분류(계산기) 행 렌더링 ──
  renderCalcRow: function(calculators, selectedCalcId) {
    var row = document.getElementById('calcRow');
    row.innerHTML = '';

    if (!calculators || calculators.length === 0) {
      row.style.display = 'none';
      return;
    }

    row.style.display = 'flex';
    calculators.forEach(function(calc) {
      var btn = document.createElement('button');
      btn.className = 'nav-btn' + (selectedCalcId === calc.id ? ' active' : '');
      var tCalc = App.translateCalc(calc);
      btn.innerHTML = '<span class="b-icon">' + calc.icon + '</span> ' + tCalc.name;
      btn.onclick = function() { App.openCalculator(calc.id); };
      row.appendChild(btn);
    });
  },

  // ── 검색 결과 렌더링 (대분류 그리드 영역에 표시) ──
  renderSearchResults: function(results) {
    var grid = document.getElementById('catGrid');
    grid.innerHTML = '';
    // 검색 중에는 그리드 대신 flex wrap으로 전환
    grid.style.display = 'flex';
    grid.style.flexWrap = 'wrap';
    grid.style.gap = '0.35rem';

    document.getElementById('subRow').style.display = 'none';
    document.getElementById('calcRow').style.display = 'none';

    if (results.length === 0) {
      grid.innerHTML = '<div class="no-results">' + App.t('no_results') + '</div>';
      return;
    }

    results.forEach(function(r) {
      var btn = document.createElement('button');
      btn.className = 'nav-btn';
      var tName = App.translateCalc(r).name;
      btn.innerHTML = '<span class="b-icon">' + r.icon + '</span> ' + tName + ' <span class="b-count">' + App.translatePhrase(r.catName) + '</span>';
      btn.onclick = function() { App.openCalculatorDirect(r); };
      grid.appendChild(btn);
    });
  },

  // ── 그리드 모드 복원 ──
  restoreGridMode: function() {
    var grid = document.getElementById('catGrid');
    grid.style.display = '';
    grid.style.flexWrap = '';
    grid.style.gap = '';
  },

  // ── 계산기 뷰 렌더링 ──
  renderCalculator: function(def, catName, subName, calcName, modeIdx) {
    document.getElementById('welcomeView').style.display = 'none';
    var view = document.getElementById('calcView');
    view.classList.add('active');

    // Breadcrumb
    document.getElementById('breadcrumb').innerHTML =
      App.translatePhrase(catName) + ' <span class="sep">›</span> ' +
      App.translatePhrase(subName) + ' <span class="sep">›</span> ' +
      '<span class="current">' + def.name + '</span>';

    document.getElementById('calcTitle').textContent = def.title || def.name;
    document.getElementById('calcDesc').textContent = def.desc;

    // Formula
    var fb = document.getElementById('formulaBox');
    var varsHtml = '';
    if (def.formula.vars && def.formula.vars.length > 0) {
      varsHtml = '<div class="formula-vars">' +
        def.formula.vars.map(function(v) { return '<span><strong>' + v.s + '</strong> = ' + v.d + '</span>'; }).join('') +
        '</div>';
    }
    fb.innerHTML = '<div class="formula-label">' + App.t('formula_label') + '</div><div class="formula-text">' + def.formula.text + '</div>' + varsHtml;

    this.renderMode(def, modeIdx);

    // Scroll to calc
    view.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  // ── 모드 탭 + 입력 필드 렌더링 ──
  renderMode: function(def, modeIdx) {
    var mode = def.modes[modeIdx];

    // Mode tabs
    var tabsWrap = document.getElementById('modeTabsWrap');
    if (def.modes.length > 1) {
      var html = '<div class="mode-tabs">';
      def.modes.forEach(function(m, i) {
        html += '<button class="mode-tab' + (i === modeIdx ? ' active' : '') + '" onclick="App.switchMode(' + i + ')">' + m.label + '</button>';
      });
      html += '</div>';
      tabsWrap.innerHTML = html;
    } else {
      tabsWrap.innerHTML = '';
    }

    // Inputs
    var inputsWrap = document.getElementById('inputsWrap');
    var html = '';
    mode.inputs.forEach(function(inp) {
      html += '<div class="input-group">' +
        '<label>' + inp.label + (inp.hint ? ' <span class="hint">' + inp.hint + '</span>' : '') + '</label>' +
        '<div class="input-wrap">' +
        '<input type="number" id="inp_' + inp.id + '" placeholder="0" step="any" inputmode="decimal" oninput="App.doCalc()">' +
        '<span class="input-unit">' + inp.unit + '</span>' +
        '</div></div>';
    });
    inputsWrap.innerHTML = html;

    // Result
    document.getElementById('resultLabel').textContent = mode.rLabel;
    document.getElementById('resultValue').textContent = '0';
    document.getElementById('resultUnit').textContent = ' ' + mode.rUnit;
  },

  // ── 환영 화면 표시 ──
  showWelcome: function() {
    document.getElementById('welcomeView').style.display = 'flex';
    document.getElementById('calcView').classList.remove('active');
  },

  // ── 통계 업데이트 ──
  updateStats: function(total) {
    document.getElementById('statTotal').textContent = total;
  }
};
