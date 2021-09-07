(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'tetste'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'tetste'.");
    }root.tetste = factory(typeof tetste === 'undefined' ? {} : tetste, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var toString = Kotlin.toString;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var arrayListOf = Kotlin.kotlin.collections.arrayListOf_i5x0yv$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  function Tabuleiro(celulasT, naviosT) {
    this.celulasT = celulasT;
    this.naviosT = naviosT;
  }
  Tabuleiro.prototype.fimDeJogo = function () {
    return false;
  };
  Tabuleiro.$metadata$ = {kind: Kind_CLASS, simpleName: 'Tabuleiro', interfaces: []};
  function Celula(id, navio, visivel, ehBorda) {
    this.id = id;
    this.navio = navio;
    this.visivel = visivel;
    this.ehBorda = ehBorda;
  }
  Celula.$metadata$ = {kind: Kind_CLASS, simpleName: 'Celula', interfaces: []};
  function criarTabuleiro() {
    var tabuleiroOficial = new Tabuleiro(ArrayList_init(), ArrayList_init());
    for (var i = 0; i <= 63; i++) {
      tabuleiroOficial.celulasT.add_11rb$(new Celula(i, false, true, true));
    }
    return tabuleiroOficial;
  }
  function gerarColunaLinha_Array_0(a) {
    println('krl');
    if (a < 8)
      return arrayListOf([a, 0]);
    else
      return arrayListOf([resto(a, 8), a / 8 | 0]);
  }
  function resto(num, div) {
    if (num < div)
      return num - 1 | 0;
    else
      return num - Kotlin.imul(num / div | 0, div) | 0;
  }
  function main() {
    var t1 = criarTabuleiro();
    println(gerarColunaLinha_Array_0(5).get_za3lpa$(0));
    println(gerarColunaLinha_Array_0(5).get_za3lpa$(1));
  }
  _.Tabuleiro = Tabuleiro;
  _.Celula = Celula;
  _.criarTabuleiro = criarTabuleiro;
  _.gerarColunaLinha_Array_0_za3lpa$ = gerarColunaLinha_Array_0;
  _.resto_vux9f0$ = resto;
  _.main = main;
  main();
  return _;
}));

//# sourceMappingURL=tetste.js.map
