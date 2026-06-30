// ============================================
// App: Main controller
// ============================================

window.App = {

  // ── State ──
  appMode: 'industrial',
  lang: 'ko',
  categories: [],
  calcIndex: {},       // id → { def, catName, subName, calcName }
  selectedCat: null,
  selectedSub: null,
  selectedCalc: null,
  currentModeIdx: 0,

  // ── 초기화 ──
  init: function() {
    this.appMode = 'industrial';
    this.lang = 'ko';
    this.loadModeData();
    this.buildIndex();
    this.render();
    this.updateStatsTotal();
    this.initSearch();
    this.updateLanguageUI();
    AdsManager.init();
  },

  // ── 번역 유틸리티 ──
  t: function(key, defaultVal) {
    var l = this.lang || 'ko';
    if (window.TRANSLATIONS && window.TRANSLATIONS.ui[l] && window.TRANSLATIONS.ui[l][key]) {
      return window.TRANSLATIONS.ui[l][key];
    }
    return defaultVal !== undefined ? defaultVal : key;
  },

  translateWordOrPhrase: function(str) {
    var trimmed = str.trim();
    if (window.TRANSLATIONS.categories[trimmed]) {
      return window.TRANSLATIONS.categories[trimmed];
    }
    if (window.TRANSLATIONS.vocabulary[trimmed]) {
      return window.TRANSLATIONS.vocabulary[trimmed];
    }
    
    // Greedy substring translation using translations dictionaries
    // We combine categories and vocabulary keys, sort by length descending
    if (!this.sortedKeys) {
      var keys = [];
      for (var k in window.TRANSLATIONS.categories) keys.push(k);
      for (var k in window.TRANSLATIONS.vocabulary) keys.push(k);
      
      // Remove duplicates
      var seen = {};
      var uniqueKeys = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!seen[key]) {
          seen[key] = true;
          uniqueKeys.push(key);
        }
      }
      
      // Sort by length descending
      uniqueKeys.sort(function(a, b) {
        return b.length - a.length;
      });
      this.sortedKeys = uniqueKeys;
    }
    
    var result = trimmed;
    var matchedAny = false;
    for (var i = 0; i < this.sortedKeys.length; i++) {
      var key = this.sortedKeys[i];
      if (key.length >= 2 && result.indexOf(key) !== -1) {
        var val = window.TRANSLATIONS.categories[key] || window.TRANSLATIONS.vocabulary[key];
        result = result.split(key).join(val + ' ');
        matchedAny = true;
      }
    }
    
    // Standalone single-character replacements pass
    for (var i = 0; i < this.sortedKeys.length; i++) {
      var key = this.sortedKeys[i];
      if (key.length === 1) {
        var val = window.TRANSLATIONS.categories[key] || window.TRANSLATIONS.vocabulary[key];
        var regex = new RegExp('(^|\\s|[^\\uAC00-\\uD7A3])' + key + '(\\s|$|[^\\uAC00-\\uD7A3])', 'g');
        result = result.replace(regex, function(match, p1, p2) {
          return p1 + val + p2;
        });
        matchedAny = true;
      }
    }
    
    if (matchedAny) {
      // Clean up extra spaces
      result = result.replace(/\s+/g, ' ').trim();
      return result;
    }
    
    // Fallback replacements
    var replacements = [
      { k: "계산기", e: "Calculator" },
      { k: "계산", e: "Calc" },
      { k: "변환", e: "Conv" },
      { k: "공식", e: "Formula" },
      { k: "허용", e: "Allowable" },
      { k: "속도", e: "Speed" },
      { k: "시간", e: "Time" },
      { k: "동력", e: "Power" },
      { k: "효율", e: "Efficiency" },
      { k: "강도", e: "Strength" }
    ];
    replacements.forEach(function(rep) {
      result = result.split(rep.k).join(rep.e);
    });
    return result;
  },

  translatePhrase: function(str) {
    var l = this.lang || 'ko';
    if (l === 'ko') return str;
    if (!window.TRANSLATIONS) return str;

    var trimmed = str.trim();
    var unitMatch = trimmed.match(/^(.*?)\s*\(([^)]+)\)$/);
    if (unitMatch) {
      var corePhrase = unitMatch[1].trim();
      var unit = unitMatch[2].trim();
      
      var transCore = this.translateWordOrPhrase(corePhrase);
      var transUnit = this.translateWordOrPhrase(unit);
      
      return transCore + " (" + transUnit + ")";
    }

    return this.translateWordOrPhrase(trimmed);
  },

  translateCalc: function(calc) {
    var l = this.lang || 'ko';
    if (l === 'ko') return calc;
    if (!window.TRANSLATIONS) return calc;

    var clone = Object.assign({}, calc);
    if (window.TRANSLATIONS.calculators[calc.id]) {
      var tMeta = window.TRANSLATIONS.calculators[calc.id];
      if (tMeta.name) clone.name = tMeta.name;
      if (tMeta.desc) clone.desc = tMeta.desc;
    } else {
      clone.name = this.translatePhrase(calc.name);
      if (calc.desc) clone.desc = this.translatePhrase(calc.desc);
    }

    if (clone.formula) {
      var fClone = Object.assign({}, clone.formula);
      if (clone.formula.vars) {
        fClone.vars = clone.formula.vars.map(function(v) {
          var vClone = Object.assign({}, v);
          vClone.d = App.translatePhrase(v.d);
          return vClone;
        });
      }
      clone.formula = fClone;
    }

    if (calc.modes) {
      clone.modes = calc.modes.map(function(mode) {
        var mClone = Object.assign({}, mode);
        mClone.label = App.translatePhrase(mode.label);
        mClone.rLabel = App.translatePhrase(mode.rLabel);
        if (mode.inputs) {
          mClone.inputs = mode.inputs.map(function(inp) {
            var iClone = Object.assign({}, inp);
            iClone.label = App.translatePhrase(inp.label);
            if (inp.hint) iClone.hint = App.translatePhrase(inp.hint);
            iClone.unit = App.translatePhrase(inp.unit);
            return iClone;
          });
        }
        mClone.rUnit = App.translatePhrase(mode.rUnit);
        return mClone;
      });
    }
    return clone;
  },

  setLanguage: function(lang) {
    if (this.lang === lang) return;
    this.lang = lang;

    var btnKo = document.getElementById('btnLangKo');
    var btnEn = document.getElementById('btnLangEn');
    if (btnKo) btnKo.classList.toggle('active', lang === 'ko');
    if (btnEn) btnEn.classList.toggle('active', lang === 'en');

    this.updateLanguageUI();
    this.render();
    this.updateStatsTotal();
    
    if (this.selectedCalc) {
      this.openCalculator(this.selectedCalc);
    }
  },

  updateLanguageUI: function() {
    var searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = this.t('search_placeholder');

    var welcomeTitle = document.getElementById('welcomeTitle');
    if (welcomeTitle) {
      welcomeTitle.textContent = this.appMode === 'industrial' ? this.t('sub_title_industrial') : this.t('sub_title_engineering');
    }

    var welcomeSub = document.getElementById('welcomeSub');
    if (welcomeSub) {
      welcomeSub.textContent = this.t('welcome_sub');
    }

    var lblStatTotal = document.getElementById('lblStatTotal');
    if (lblStatTotal) lblStatTotal.textContent = this.t('stat_total');

    var lblStatFields = document.getElementById('lblStatFields');
    if (lblStatFields) lblStatFields.textContent = this.t('stat_fields');

    var btnReset = document.getElementById('btnReset');
    if (btnReset) btnReset.textContent = this.t('reset_btn');

    var btnInd = document.getElementById('btnModeIndustrial');
    var btnEng = document.getElementById('btnModeEngineering');
    if (btnInd) btnInd.textContent = this.t('btn_mode_ind');
    if (btnEng) btnEng.textContent = this.t('btn_mode_eng');
  },

  // ── 데이터 소스 로드 ──
  loadModeData: function() {
    var dataSources = [];
    if (this.appMode === 'industrial') {
      dataSources = [
        window.DATA_DESIGN,
        window.DATA_MECHANICAL,
        window.DATA_MANUFACTURING,
        window.DATA_FASTENING,
        window.DATA_ELECTRICAL,
        window.DATA_MATERIAL,
        window.DATA_THERMAL_FLUID,
        window.DATA_MEASUREMENT_MATH,
        window.DATA_PROPERTIES,
        window.DATA_CONVERSION
      ];
    } else {
      dataSources = (window.DATA_ENGINEERING_1 || []).concat(window.DATA_ENGINEERING_2 || []);
    }
    var self = this;
    this.categories = [];
    dataSources.forEach(function(src) {
      if (src) self.categories.push(src);
    });
  },

  // ── 앱 모드 전환 ──
  setAppMode: function(mode) {
    if (this.appMode === mode) return;
    this.appMode = mode;
    this.selectedCat = null;
    this.selectedSub = null;
    this.selectedCalc = null;
    this.currentModeIdx = 0;

    var btnInd = document.getElementById('btnModeIndustrial');
    var btnEng = document.getElementById('btnModeEngineering');
    if (btnInd) btnInd.classList.toggle('active', mode === 'industrial');
    if (btnEng) btnEng.classList.toggle('active', mode === 'engineering');

    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('show');

    this.loadModeData();
    this.calcIndex = {};
    this.buildIndex();
    UI.restoreGridMode();
    UI.showWelcome();
    this.render();
    this.updateStatsTotal();
  },

  // ── 통계 및 환영화면 타이틀 갱신 ──
  updateStatsTotal: function() {
    var total = 0;
    this.categories.forEach(function(cat) {
      cat.subcategories.forEach(function(sub) {
        total += sub.calculators.length;
      });
    });
    UI.updateStats(total);

    var welcomeTitle = document.getElementById('welcomeTitle');
    if (welcomeTitle) {
      welcomeTitle.textContent = this.appMode === 'industrial' ? this.t('sub_title_industrial') : this.t('sub_title_engineering');
    }
    var fieldsValEl = document.getElementById('statFields');
    if (fieldsValEl) {
      fieldsValEl.textContent = this.categories.length;
    }
  },

  // ── 인덱스 구축 ──
  buildIndex: function() {
    var self = this;
    this.categories.forEach(function(cat) {
      cat.subcategories.forEach(function(sub) {
        sub.calculators.forEach(function(calc) {
          self.calcIndex[calc.id] = {
            def: calc,
            catId: cat.id,
            catName: cat.name,
            catColor: cat.color,
            subId: sub.id,
            subName: sub.name,
            calcName: calc.name,
            icon: calc.icon
          };
        });
      });
    });
  },

  // ── 렌더링 ──
  render: function() {
    UI.renderCatGrid(this.categories, this.selectedCat);

    // 중분류
    if (this.selectedCat) {
      var cat = this.categories.find(function(c) { return c.id === App.selectedCat; });
      if (cat) {
        UI.renderSubRow(cat.subcategories, this.selectedSub);

        // 소분류
        if (this.selectedSub) {
          var sub = cat.subcategories.find(function(s) { return s.id === App.selectedSub; });
          if (sub) {
            UI.renderCalcRow(sub.calculators, this.selectedCalc);
          } else {
            UI.renderCalcRow(null);
          }
        } else {
          UI.renderCalcRow(null);
        }
      }
    } else {
      UI.renderSubRow(null);
      UI.renderCalcRow(null);
    }
  },

  // ── 대분류 선택 ──
  selectCategory: function(catId) {
    if (this.selectedCat === catId) {
      this.selectedCat = null;
      this.selectedSub = null;
    } else {
      this.selectedCat = catId;
      this.selectedSub = null;
    }
    this.selectedCalc = null;
    UI.restoreGridMode();
    this.render();
  },

  // ── 중분류 선택 ──
  selectSubcategory: function(subId) {
    if (this.selectedSub === subId) {
      this.selectedSub = null;
    } else {
      this.selectedSub = subId;
    }
    this.selectedCalc = null;
    this.render();
  },

  // ── 계산기 열기 ──
  openCalculator: function(calcId) {
    var info = this.calcIndex[calcId];
    if (!info) return;

    this.selectedCalc = calcId;
    this.currentModeIdx = 0;
    this.render();

    var tCalc = this.translateCalc(info.def);
    UI.renderCalculator(tCalc, info.catName, info.subName, info.calcName, 0);
    AdsManager.refresh();
  },

  // ── 검색 결과에서 직접 열기 ──
  openCalculatorDirect: function(result) {
    // 네비게이션 상태 동기화
    this.selectedCat = result.catId;
    this.selectedSub = result.subId;
    this.selectedCalc = result.id;
    this.currentModeIdx = 0;

    // 검색 초기화
    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('show');

    UI.restoreGridMode();
    this.render();

    var info = this.calcIndex[result.id];
    if (info) {
      var tCalc = this.translateCalc(info.def);
      UI.renderCalculator(tCalc, info.catName, info.subName, info.calcName, 0);
      AdsManager.refresh();
    }
  },

  // ── 모드 전환 ──
  switchMode: function(idx) {
    this.currentModeIdx = idx;
    var info = this.calcIndex[this.selectedCalc];
    if (info) {
      var tCalc = this.translateCalc(info.def);
      UI.renderMode(tCalc, idx);
    }
  },

  // ── 계산 실행 ──
  doCalc: function() {
    var info = this.calcIndex[this.selectedCalc];
    if (!info) return;

    var tCalc = this.translateCalc(info.def);
    var mode = tCalc.modes[this.currentModeIdx];
    var vals = {};
    var allOk = true;

    mode.inputs.forEach(function(inp) {
      var el = document.getElementById('inp_' + inp.id);
      var v = parseFloat(el.value);
      if (isNaN(v)) allOk = false;
      vals[inp.id] = isNaN(v) ? 0 : v;
    });

    var el = document.getElementById('resultValue');
    var detailEl = document.getElementById('resultDetail');
    if (!allOk) {
      el.textContent = '0';
      detailEl.textContent = '';
      return;
    }

    var result = CalcEngine.calculate(mode, vals);
    el.textContent = CalcEngine.format(result);

    // 공식 및 입력한 숫자 매핑 출력
    try {
      var pattern = mode.formulaPattern || tCalc.formula.text;
      
      // 등호(=)를 기준으로 좌변과 우변 구분
      var leftSide = "";
      var mathPattern = pattern;
      if (pattern.indexOf('=') !== -1) {
        var parts = pattern.split('=');
        leftSide = parts[0].trim() + " = ";
        mathPattern = parts[1].trim();
      }

      // 우변 수식에서 매칭할 심볼 정리
      var subst = mathPattern;
      
      // 아래 특수 기호들(첨자 등)을 일반 텍스트 및 숫자로 변환하여 매칭 확률을 높임
      subst = subst
        .replace(/₀/g, '0').replace(/₁/g, '1').replace(/₂/g, '2').replace(/₃/g, '3').replace(/⁴/g, '4')
        .replace(/_in/g, 'in').replace(/_out/g, 'out')
        .replace(/_yield/g, 'yield').replace(/_allow/g, 'allow')
        .replace(/_trans/g, 'trans').replace(/_axial/g, 'axial');

      // 그리스 문자 등 예외 매칭용 맵
      var greekMap = {
        'sigma': ['σ', 'σ_yield', 'σ_allow', 'σc'],
        'tau': ['τ'],
        'rho': ['ρ'],
        'nu': ['ν', 'ν_trans', 'ν_axial'],
        'eta': ['η'],
        'alpha': ['α'],
        'eps': ['ε'],
        'die_w': ['V'],
        'die-w': ['V']
      };

      mode.inputs.forEach(function(inp) {
        var valStr = parseFloat(vals[inp.id].toPrecision(6)).toString();
        var symbols = [inp.id];
        if (inp.symbol) symbols.push(inp.symbol);

        symbols.forEach(function(sym) {
          // 대소문자 구분 없이 기호를 숫자로 치환
          subst = subst.split(sym).join(valStr);
          subst = subst.split(sym.toUpperCase()).join(valStr);
          subst = subst.split(sym.toLowerCase()).join(valStr);
        });

        // 그리스 문자 치환
        var gList = greekMap[inp.id.toLowerCase()];
        if (gList) {
          gList.forEach(function(g) {
            subst = subst.split(g).join(valStr);
          });
        }
      });

      var resultStr = CalcEngine.format(result);
      detailEl.textContent = mathPattern + ' = ' + subst + ' = ' + resultStr;
    } catch (err) {
      console.warn("Formula detail generation failed:", err);
      detailEl.textContent = '';
    }
  },

  // ── 검색 ──
  initSearch: function() {
    var input = document.getElementById('searchInput');
    var clear = document.getElementById('searchClear');
    var self = this;

    input.addEventListener('input', function() {
      var val = input.value.trim();
      clear.classList.toggle('show', val.length > 0);

      if (!val) {
        UI.restoreGridMode();
        self.render();
        return;
      }

      var q = val.toLowerCase();
      var results = [];

      self.categories.forEach(function(cat) {
        cat.subcategories.forEach(function(sub) {
          sub.calculators.forEach(function(calc) {
            var tCalc = self.translateCalc(calc);
            var nameToSearch = tCalc.name;
            var descToSearch = tCalc.desc || '';
            var catNameSearch = self.translatePhrase(cat.name);
            var subNameSearch = self.translatePhrase(sub.name);

            if (
              nameToSearch.toLowerCase().indexOf(q) !== -1 ||
              descToSearch.toLowerCase().indexOf(q) !== -1 ||
              catNameSearch.toLowerCase().indexOf(q) !== -1 ||
              subNameSearch.toLowerCase().indexOf(q) !== -1 ||
              calc.name.toLowerCase().indexOf(q) !== -1 ||
              (calc.desc && calc.desc.toLowerCase().indexOf(q) !== -1)
            ) {
              results.push({
                id: calc.id,
                name: tCalc.name,
                icon: calc.icon,
                catId: cat.id,
                catName: cat.name,
                catColor: cat.color,
                subId: sub.id,
                subName: sub.name
              });
            }
          });
        });
      });

      UI.renderSearchResults(results);
    });
  },

  // ── 홈으로 ──
  goHome: function() {
    this.selectedCat = null;
    this.selectedSub = null;
    this.selectedCalc = null;
    this.currentModeIdx = 0;

    document.getElementById('searchInput').value = '';
    document.getElementById('searchClear').classList.remove('show');

    UI.restoreGridMode();
    UI.showWelcome();
    this.render();
  }
};

// ── Global functions (HTML onclick handlers) ──
function goHome() { App.goHome(); }
function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClear').classList.remove('show');
  UI.restoreGridMode();
  App.render();
  document.getElementById('searchInput').focus();
}
function resetInputs() {
  var info = App.calcIndex[App.selectedCalc];
  if (!info) return;
  var tCalc = App.translateCalc(info.def);
  var mode = tCalc.modes[App.currentModeIdx];
  mode.inputs.forEach(function(inp) {
    document.getElementById('inp_' + inp.id).value = '';
  });
  document.getElementById('resultValue').textContent = '0';
  document.getElementById('resultDetail').textContent = '';
}

// ── 키보드 단축키 ──
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
});

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
