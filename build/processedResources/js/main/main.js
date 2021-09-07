if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'main'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'main'.");
}var main = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var arrayListOf = Kotlin.kotlin.collections.arrayListOf_i5x0yv$;
  var print = Kotlin.kotlin.io.print_s8jyv4$;
  var println = Kotlin.kotlin.io.println;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  var Random = Kotlin.kotlin.random.Random;
  var random = Kotlin.kotlin.ranges.random_xmiyix$;
  function Tabuleiro(celulasT, naviosT) {
    this.celulasT = celulasT;
    this.naviosT = naviosT;
  }
  Tabuleiro.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Tabuleiro',
    interfaces: []
  };
  function fimDeJogo(tabEsquerda, tabDireita) {
    var esquerda = true;
    var direita = true;
    for (var i = 0; i <= 6; i++) {
      if (!tabDireita.naviosT.get_za3lpa$(i).descoberto)
        direita = false;
    }
    for (var i_0 = 0; i_0 <= 6; i_0++) {
      if (!tabEsquerda.naviosT.get_za3lpa$(i_0).descoberto)
        esquerda = false;
    }
    if (direita) {
      desativarBotoes('#botaoIA');
      atualizarFimDeJogo(tabDireita, '#botaoIA');
      window.alert('Voc\xEA teve sorte dessa vez, mas ganharei na pr\xF3xima... As m\xE1quinas sempre ser\xE3o superiores. ass: IA');
    }if (esquerda) {
      desativarBotoes('#botaoIA');
      atualizarJogadorPerdeu(tabDireita);
      atualizarFimDeJogo(tabEsquerda, '#botaoJ');
      window.alert('EU ganhei de voc\xEA! 1x0 PARA AS M\xC1QUINAS!' + ' Melhore seu sistema operacional para me enfrentar, humano');
    }}
  function Celula(id, navio, visivel, ehBorda) {
    this.id = id;
    this.navio = navio;
    this.visivel = visivel;
    this.ehBorda = ehBorda;
  }
  Celula.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Celula',
    interfaces: []
  };
  function Navio(tamanho, celulas) {
    this.tamanho = tamanho;
    this.celulas = celulas;
  }
  Object.defineProperty(Navio.prototype, 'bordas', {
    configurable: true,
    get: function () {
      return this.retornoDeBorda();
    }
  });
  Navio.prototype.retornoDeBorda = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var retornoDeBorda = ArrayList_init();
    var c;
    var l;
    tmp$ = this.tamanho - 1 | 0;
    for (var x = 0; x <= tmp$; x++) {
      c = gerarColunaLinha_Array_0(this.celulas.get_za3lpa$(x).id).get_za3lpa$(0);
      l = gerarColunaLinha_Array_0(this.celulas.get_za3lpa$(x).id).get_za3lpa$(1);
      tmp$_0 = l + 1 | 0;
      for (var i = l - 1 | 0; i <= tmp$_0; i++) {
        tmp$_1 = c + 1 | 0;
        for (var j = c - 1 | 0; j <= tmp$_1; j++) {
          if (j > -1 && j < 8 && i > -1 && i < 8) {
            if (!retornoDeBorda.contains_11rb$(gerarID_Array_0(j, i)))
              retornoDeBorda.add_11rb$(gerarID_Array_0(j, i));
          }}
      }
    }
    tmp$_2 = this.tamanho - 1 | 0;
    for (var x_0 = 0; x_0 <= tmp$_2; x_0++) {
      if (retornoDeBorda.contains_11rb$(this.celulas.get_za3lpa$(x_0).id))
        retornoDeBorda.remove_11rb$(this.celulas.get_za3lpa$(x_0).id);
    }
    return retornoDeBorda;
  };
  Object.defineProperty(Navio.prototype, 'descoberto', {
    configurable: true,
    get: function () {
      return this.celulasNavioVisiveis();
    }
  });
  Navio.prototype.celulasNavioVisiveis = function () {
    var tmp$;
    tmp$ = this.tamanho - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (!this.celulas.get_za3lpa$(i).visivel) {
        return false;
      }}
    return true;
  };
  Object.defineProperty(Navio.prototype, 'ehHorizontal', {
    configurable: true,
    get: function () {
      if (this.tamanho > 1) {
        if ((this.celulas.get_za3lpa$(1).id - this.celulas.get_za3lpa$(0).id | 0) > 1)
          return false;
      }return true;
    }
  });
  Navio.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Navio',
    interfaces: []
  };
  function IA(ultimaCelulaClicada, idCelulasNaviosSendoDescoberto, celulasRestantesEscolhiveis) {
    this.ultimaCelulaClicada = ultimaCelulaClicada;
    this.idCelulasNaviosSendoDescoberto = idCelulasNaviosSendoDescoberto;
    this.celulasRestantesEscolhiveis = celulasRestantesEscolhiveis;
  }
  Object.defineProperty(IA.prototype, 'tentandoDescobrirNavio', {
    configurable: true,
    get: function () {
      return this.idCelulasNaviosSendoDescoberto.size !== 0;
    }
  });
  IA.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IA',
    interfaces: []
  };
  function mudarIA_ultultimaCelulaClicada(ia, novaUltimaCelulaClicada) {
    return new IA(novaUltimaCelulaClicada, ia.idCelulasNaviosSendoDescoberto, ia.celulasRestantesEscolhiveis);
  }
  function menor(lista) {
    var tmp$;
    var menor = 63;
    tmp$ = lista.size - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (lista.get_za3lpa$(i) < menor)
        menor = lista.get_za3lpa$(i);
    }
    return menor;
  }
  function maior(lista) {
    var tmp$;
    var maior = 0;
    tmp$ = lista.size - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (lista.get_za3lpa$(i) > maior)
        maior = lista.get_za3lpa$(i);
    }
    return maior;
  }
  function iaPensando(tab, ia) {
    var c = 0;
    var l = 0;
    if (ia.tentandoDescobrirNavio) {
      if (ia.idCelulasNaviosSendoDescoberto.size === 1) {
        do {
          c = gerarColunaLinha_Array_0(ia.idCelulasNaviosSendoDescoberto.get_za3lpa$(0)).get_za3lpa$(0);
          l = gerarColunaLinha_Array_0(ia.idCelulasNaviosSendoDescoberto.get_za3lpa$(0)).get_za3lpa$(1);
          var aleatorio = rand(1, 4);
          switch (aleatorio) {
            case 1:
              l = l - 1 | 0;
              break;
            case 2:
              c = c + 1 | 0;
              break;
            case 3:
              l = l + 1 | 0;
              break;
            case 4:
              c = c - 1 | 0;
              break;
          }
        }
         while (c < 0 || c > 7 || l < 0 || l > 7 || !ia.celulasRestantesEscolhiveis.contains_11rb$(gerarID_Array_0(c, l)));
      } else {
        var cMenor = gerarColunaLinha_Array_0(menor(ia.idCelulasNaviosSendoDescoberto)).get_za3lpa$(0);
        var lMenor = gerarColunaLinha_Array_0(menor(ia.idCelulasNaviosSendoDescoberto)).get_za3lpa$(1);
        var cMaior = gerarColunaLinha_Array_0(maior(ia.idCelulasNaviosSendoDescoberto)).get_za3lpa$(0);
        var lMaior = gerarColunaLinha_Array_0(maior(ia.idCelulasNaviosSendoDescoberto)).get_za3lpa$(1);
        do {
          var aleatorio_0 = rand(1, 2);
          switch (aleatorio_0) {
            case 1:
              if (tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, ia.idCelulasNaviosSendoDescoberto.get_za3lpa$(0))).ehHorizontal) {
                c = cMenor - 1 | 0;
                l = lMenor;
              } else {
                c = cMenor;
                l = lMenor - 1 | 0;
              }

              break;
            case 2:
              if (tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, ia.idCelulasNaviosSendoDescoberto.get_za3lpa$(0))).ehHorizontal) {
                c = cMaior + 1 | 0;
                l = lMaior;
              } else {
                c = cMaior;
                l = lMaior + 1 | 0;
              }

              break;
          }
        }
         while (c < 0 || c > 7 || l < 0 || l > 7 || !ia.celulasRestantesEscolhiveis.contains_11rb$(gerarID_Array_0(c, l)));
      }
      return gerarID_Array_0(c, l);
    }if (ia.celulasRestantesEscolhiveis.size === 0)
      return 0;
    return ia.celulasRestantesEscolhiveis.get_za3lpa$(rand(0, ia.celulasRestantesEscolhiveis.size - 1 | 0));
  }
  function Auxiliar(tabuleiro, ia, iaQuerMostrarDevagar) {
    this.tabuleiro = tabuleiro;
    this.ia = ia;
    this.iaQuerMostrarDevagar = iaQuerMostrarDevagar;
  }
  Auxiliar.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Auxiliar',
    interfaces: []
  };
  function iaJogando(t1, ia) {
    var tmp$;
    var iaJogar = ia;
    var tab = t1;
    var iaPensou = 0;
    var iaQuerMostrarDevagarA = ArrayList_init();
    do {
      iaPensou = iaPensando(tab, iaJogar);
      if (ia.celulasRestantesEscolhiveis.size <= 0) {
        break;
      }tab = algoClicouEmUmaCelula(tab, iaPensou);
      iaQuerMostrarDevagarA.add_11rb$(iaPensou);
      iaJogar.celulasRestantesEscolhiveis.remove_11rb$(iaPensou);
      if (tab.celulasT.get_za3lpa$(iaPensou).navio) {
        if (tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, iaPensou)).descoberto) {
          iaJogar.idCelulasNaviosSendoDescoberto.clear();
          tmp$ = tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, iaPensou)).bordas.size - 1 | 0;
          for (var i = 0; i <= tmp$; i++) {
            if (iaJogar.celulasRestantesEscolhiveis.contains_11rb$(tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, iaPensou)).bordas.get_za3lpa$(i))) {
              iaJogar.celulasRestantesEscolhiveis.remove_11rb$(tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, iaPensou)).bordas.get_za3lpa$(i));
            }}
        } else {
          iaJogar.idCelulasNaviosSendoDescoberto.add_11rb$(iaPensou);
        }
      }iaJogar = mudarIA_ultultimaCelulaClicada(iaJogar, iaPensou);
    }
     while (tab.celulasT.get_za3lpa$(iaJogar.ultimaCelulaClicada).navio);
    return new Auxiliar(tab, iaJogar, iaQuerMostrarDevagarA);
  }
  function criarTabuleiro() {
    var tabuleiroOficial = new Tabuleiro(ArrayList_init(), ArrayList_init());
    for (var i = 0; i <= 63; i++) {
      tabuleiroOficial.celulasT.add_11rb$(new Celula(i, false, false, false));
    }
    return tabuleiroOficial;
  }
  function rand(start, end) {
    if (!(start <= end)) {
      var message = 'Illegal Argument';
      throw IllegalArgumentException_init(message.toString());
    }return random(new IntRange(start, end), Random.Default);
  }
  function gerarValoresNavioAleatorio(tabuleiro, tamanho) {
    var coluna;
    var linha;
    var verticalOuHorizontal;
    do {
      verticalOuHorizontal = rand(0, 1);
      if (verticalOuHorizontal === 0) {
        coluna = rand(0, 7);
        linha = rand(0, 8 - tamanho | 0);
      } else {
        linha = rand(0, 7);
        coluna = rand(0, 8 - tamanho | 0);
      }
    }
     while (!verificarDisponibilidadeNavio(gerarID_Array_0(coluna, linha), verticalOuHorizontal, tamanho, tabuleiro));
    return arrayListOf([gerarID_Array_0(coluna, linha), verticalOuHorizontal]);
  }
  function verificarDisponibilidadeNavio(id, verticalOuHorizontal, tamanhoNavio, tabuleiroSendoVerificado) {
    var tmp$;
    var novoId = id;
    tmp$ = tamanhoNavio - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (tabuleiroSendoVerificado.celulasT.get_za3lpa$(novoId).ehBorda || tabuleiroSendoVerificado.celulasT.get_za3lpa$(novoId).navio) {
        return false;
      }if (verticalOuHorizontal === 0) {
        novoId = novoId + 8 | 0;
      } else {
        novoId = novoId + 1 | 0;
      }
    }
    return true;
  }
  function implementarDeFatoNavio(tabulei, tamanhoNavio, valoresNavio) {
    var tmp$;
    var tabuleiroO = tabulei;
    var celulasNavio = ArrayList_init();
    tmp$ = tamanhoNavio - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (valoresNavio.get_za3lpa$(1) === 1) {
        celulasNavio.add_11rb$(new Celula(valoresNavio.get_za3lpa$(0) + i | 0, true, false, false));
        tabuleiroO.celulasT.set_wxm5ur$(valoresNavio.get_za3lpa$(0) + i | 0, celulasNavio.get_za3lpa$(i));
      } else {
        celulasNavio.add_11rb$(new Celula(valoresNavio.get_za3lpa$(0) + (i * 8 | 0) | 0, true, false, false));
        tabuleiroO.celulasT.set_wxm5ur$(valoresNavio.get_za3lpa$(0) + (8 * i | 0) | 0, celulasNavio.get_za3lpa$(i));
      }
      tabuleiroO = criarBordas(tabuleiroO, celulasNavio.get_za3lpa$(i).id);
    }
    var navioFinalizado = new Navio(tamanhoNavio, celulasNavio);
    tabuleiroO.naviosT.add_11rb$(navioFinalizado);
    return tabuleiroO;
  }
  function criarBordas(tabuleiroO, idCelulaDoNavioUND) {
    var tmp$, tmp$_0;
    var id;
    var c = gerarColunaLinha_Array_0(idCelulaDoNavioUND).get_za3lpa$(0);
    var l = gerarColunaLinha_Array_0(idCelulaDoNavioUND).get_za3lpa$(1);
    var novoTabul = tabuleiroO;
    tmp$ = l + 1 | 0;
    for (var i = l - 1 | 0; i <= tmp$; i++) {
      tmp$_0 = c + 1 | 0;
      for (var j = c - 1 | 0; j <= tmp$_0; j++) {
        if (j > -1 && j < 8 && i > -1 && i < 8) {
          id = gerarID_Array_0(j, i);
          if (!novoTabul.celulasT.get_za3lpa$(id).navio) {
            novoTabul.celulasT.set_wxm5ur$(id, mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(novoTabul.celulasT.get_za3lpa$(id), 3));
          }}}
    }
    return novoTabul;
  }
  function organizarNaviosEmTabuleiro(tab) {
    var t1 = tab;
    t1 = implementarDeFatoNavio(t1, 4, gerarValoresNavioAleatorio(t1, 4));
    t1 = implementarDeFatoNavio(t1, 3, gerarValoresNavioAleatorio(t1, 3));
    t1 = implementarDeFatoNavio(t1, 2, gerarValoresNavioAleatorio(t1, 2));
    t1 = implementarDeFatoNavio(t1, 2, gerarValoresNavioAleatorio(t1, 2));
    t1 = implementarDeFatoNavio(t1, 1, gerarValoresNavioAleatorio(t1, 1));
    t1 = implementarDeFatoNavio(t1, 1, gerarValoresNavioAleatorio(t1, 1));
    t1 = implementarDeFatoNavio(t1, 1, gerarValoresNavioAleatorio(t1, 1));
    return t1;
  }
  function gerarID_Array_0(coluna, linha) {
    return coluna + (linha * 8 | 0) | 0;
  }
  function gerarColunaLinha_Array_0(a) {
    if (a < 8)
      return arrayListOf([a, 0]);
    else
      return arrayListOf([resto(a, 8), a / 8 | 0]);
  }
  function gerarIDdoNavio_Array_0(tab, idCelula) {
    var tmp$;
    for (var i = 0; i <= 6; i++) {
      tmp$ = tab.naviosT.get_za3lpa$(i).tamanho - 1 | 0;
      for (var j = 0; j <= tmp$; j++) {
        if (idCelula === tab.naviosT.get_za3lpa$(i).celulas.get_za3lpa$(j).id)
          return i;
      }
    }
    return -1;
  }
  function mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(celula, opcao) {
    if (opcao === 1)
      return new Celula(celula.id, true, celula.visivel, celula.ehBorda);
    if (opcao === 2)
      return new Celula(celula.id, celula.navio, true, celula.ehBorda);
    if (opcao === 3)
      return new Celula(celula.id, celula.navio, celula.visivel, true);
    if (opcao === 4)
      return new Celula(celula.id, celula.navio, false, celula.ehBorda);
    return celula;
  }
  function mudarNavio_alterarUnicaCelulaVisibilidade(tab, idCelula) {
    var tmp$, tmp$_0;
    var idNavio = gerarIDdoNavio_Array_0(tab, idCelula);
    var arrayCelulas = ArrayList_init();
    tmp$ = tab.naviosT.get_za3lpa$(idNavio).tamanho - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      if (idCelula === tab.naviosT.get_za3lpa$(idNavio).celulas.get_za3lpa$(i).id) {
        tmp$_0 = tab.naviosT.get_za3lpa$(idNavio).tamanho - 1 | 0;
        for (var j = 0; j <= tmp$_0; j++) {
          if (j === i) {
            arrayCelulas.add_11rb$(mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.naviosT.get_za3lpa$(idNavio).celulas.get_za3lpa$(j), 2));
          } else {
            arrayCelulas.add_11rb$(tab.naviosT.get_za3lpa$(idNavio).celulas.get_za3lpa$(j));
          }
        }
      }}
    return new Navio(tab.naviosT.get_za3lpa$(idNavio).tamanho, arrayCelulas);
  }
  function tornarTabuleiro_2Visivel_4NaoVisivel(tab, opcao) {
    for (var i = 0; i <= 63; i++) {
      tab.celulasT.set_wxm5ur$(i, mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT.get_za3lpa$(i), opcao));
    }
    return tab;
  }
  function algoClicouEmUmaCelula(t1, idCelula) {
    var tab = t1;
    if (tab.celulasT.get_za3lpa$(idCelula).visivel)
      return tab;
    tab.celulasT.set_wxm5ur$(idCelula, mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT.get_za3lpa$(idCelula), 2));
    if (tab.celulasT.get_za3lpa$(idCelula).navio) {
      tab.naviosT.set_wxm5ur$(gerarIDdoNavio_Array_0(tab, idCelula), mudarNavio_alterarUnicaCelulaVisibilidade(tab, idCelula));
      if (tab.naviosT.get_za3lpa$(gerarIDdoNavio_Array_0(tab, idCelula)).descoberto) {
        tab = mostrarBordasQueDevemSerVistas(tab, gerarIDdoNavio_Array_0(tab, idCelula));
      }}return tab;
  }
  function mostrarBordasQueDevemSerVistas(tab, idNavio) {
    var tmp$;
    tmp$ = tab.naviosT.get_za3lpa$(idNavio).bordas.size - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      tab.celulasT.set_wxm5ur$(tab.naviosT.get_za3lpa$(idNavio).bordas.get_za3lpa$(i), mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT.get_za3lpa$(tab.naviosT.get_za3lpa$(idNavio).bordas.get_za3lpa$(i)), 2));
    }
    return tab;
  }
  function resto(num, div) {
    if (num < div)
      return num - 1 | 0;
    else
      return num - Kotlin.imul(num / div | 0, div) | 0;
  }
  function tabuleiroToPrint(tab) {
    for (var i = 0; i <= 63; i++) {
      if (tab.celulasT.get_za3lpa$(i).visivel) {
        if (tab.celulasT.get_za3lpa$(i).navio)
          print('N ');
        else if (tab.celulasT.get_za3lpa$(i).ehBorda)
          print('* ');
        else
          print('. ');
      } else {
        print('. ');
      }
      if (resto(i + 1 | 0, 8) === 0 && i !== 0)
        println();
    }
  }
  function desativarBotoes(escritaID) {
    var tmp$;
    var idBotao = escritaID;
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var botoes = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      botoes.setAttribute('disabled', 'disabled');
      idBotao = escritaID;
    }
  }
  function ativarBotoes(tab, escritaID) {
    var tmp$;
    var idBotao = escritaID;
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      if (!tab.celulasT.get_za3lpa$(i).visivel) {
        var botoes = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
        botoes.removeAttribute('disabled');
      }idBotao = escritaID;
    }
  }
  function limparTabuleiroHTML(escritaID) {
    var tmp$;
    var idBotao = escritaID;
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var cor = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      cor.style.backgroundColor = 'white';
      idBotao = escritaID;
    }
  }
  function jogadorDecidindoTabuleiroPraIA(tab) {
    var tmp$;
    var idBotao = '#botaoJ';
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var cor = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      if (tab.celulasT.get_za3lpa$(i).navio) {
        cor.style.backgroundColor = 'red';
      }idBotao = '#botaoJ';
    }
  }
  function atualizarTabuleiroIAouJogador(tab, escritaID) {
    var tmp$;
    var idBotao = escritaID;
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var cor = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      if (tab.celulasT.get_za3lpa$(i).visivel) {
        if (tab.celulasT.get_za3lpa$(i).navio)
          cor.style.backgroundColor = 'black';
        else
          cor.style.backgroundColor = 'blue';
      }idBotao = escritaID;
    }
  }
  function atualizarFimDeJogo(tab, escritaID) {
    var tmp$;
    var idBotao = escritaID;
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var cor = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      if (tab.celulasT.get_za3lpa$(i).navio)
        cor.style.backgroundColor = 'black';
      else
        cor.style.backgroundColor = 'blue';
      idBotao = escritaID;
    }
  }
  function atualizarJogadorPerdeu(tab) {
    var tmp$;
    var idBotao = '#botaoIA';
    for (var i = 0; i <= 63; i++) {
      idBotao = idBotao + i.toString();
      var cor = Kotlin.isType(tmp$ = document.querySelector(idBotao), HTMLButtonElement) ? tmp$ : throwCCE();
      if (tab.celulasT.get_za3lpa$(i).navio && !tab.celulasT.get_za3lpa$(i).visivel) {
        cor.style.backgroundColor = 'red';
      }idBotao = '#botaoIA';
    }
  }
  function atualizarCelulasEspecificaDoTabuleiroJ(tab, idCelula) {
    var tmp$;
    var cor = Kotlin.isType(tmp$ = document.querySelector('#botaoJ' + idCelula.toString()), HTMLButtonElement) ? tmp$ : throwCCE();
    if (tab.celulasT.get_za3lpa$(idCelula).navio)
      cor.style.backgroundColor = 'black';
    else
      cor.style.backgroundColor = 'blue';
  }
  function atualizarDevagar$lambda(closure$t1, closure$aux, closure$i) {
    return function () {
      atualizarCelulasEspecificaDoTabuleiroJ(closure$t1, closure$aux.iaQuerMostrarDevagar.get_za3lpa$(closure$i));
    };
  }
  function atualizarDevagar$lambda_0(closure$t1, closure$tabuleiroIA) {
    return function () {
      var tmp$;
      atualizarTabuleiroIAouJogador(closure$t1, '#botaoJ');
      ativarBotoes(closure$tabuleiroIA, '#botaoIA');
      fimDeJogo(closure$t1, closure$tabuleiroIA);
      var vezDeQuem = Kotlin.isType(tmp$ = document.getElementById('vezDeQuem'), HTMLDivElement) ? tmp$ : throwCCE();
      vezDeQuem.innerHTML = 'VEZ DO JOGADOR';
    };
  }
  function atualizarDevagar(t1, tabuleiroIA, aux) {
    var tmp$;
    tmp$ = aux.iaQuerMostrarDevagar.size - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      window.setTimeout(atualizarDevagar$lambda(t1, aux, i), 800 * (i + 1 | 0) | 0);
    }
    window.setTimeout(atualizarDevagar$lambda_0(t1, tabuleiroIA), 800 * (aux.iaQuerMostrarDevagar.size + 1 | 0) | 0);
  }
  function main$lambda(closure$t1, closure$podeIniciar) {
    return function (it) {
      closure$t1.v = criarTabuleiro();
      closure$t1.v = organizarNaviosEmTabuleiro(closure$t1.v);
      limparTabuleiroHTML('#botaoJ');
      jogadorDecidindoTabuleiroPraIA(closure$t1.v);
      desativarBotoes('#botaoJ');
      closure$podeIniciar.v = true;
      return Unit;
    };
  }
  function main$lambda$lambda(closure$tabuleiroIA, closure$i, closure$t1, closure$iaJogadora) {
    return function (it) {
      var tmp$;
      if (!closure$tabuleiroIA.v.celulasT.get_za3lpa$(closure$i).visivel) {
        closure$tabuleiroIA.v = algoClicouEmUmaCelula(closure$tabuleiroIA.v, closure$i);
        limparTabuleiroHTML('#botaoIA');
        atualizarTabuleiroIAouJogador(closure$tabuleiroIA.v, '#botaoIA');
        fimDeJogo(closure$t1.v, closure$tabuleiroIA.v);
        if (!closure$tabuleiroIA.v.celulasT.get_za3lpa$(closure$i).navio) {
          desativarBotoes('#botaoIA');
          var vezDeQuem = Kotlin.isType(tmp$ = document.getElementById('vezDeQuem'), HTMLDivElement) ? tmp$ : throwCCE();
          vezDeQuem.innerHTML = 'VEZ DA IA';
          var aux = iaJogando(closure$t1.v, closure$iaJogadora.v);
          closure$iaJogadora.v = aux.ia;
          closure$t1.v = aux.tabuleiro;
          atualizarDevagar(closure$t1.v, closure$tabuleiroIA.v, aux);
        }}return Unit;
    };
  }
  function main$lambda_0(closure$podeIniciar, closure$tabuleiroIA, closure$t1, closure$iaJogadora) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8;
      var removerBotao1 = Kotlin.isType(tmp$ = document.querySelector('#mudar_navio'), HTMLButtonElement) ? tmp$ : throwCCE();
      var removerBotao2 = Kotlin.isType(tmp$_0 = document.querySelector('#iniciar'), HTMLButtonElement) ? tmp$_0 : throwCCE();
      var removerPularLinha = Kotlin.isType(tmp$_1 = document.querySelector('#pularLinha'), HTMLBRElement) ? tmp$_1 : throwCCE();
      if (closure$podeIniciar.v) {
        removerBotao1.remove();
        removerBotao2.remove();
        removerPularLinha.remove();
        var identificadorIA = Kotlin.isType(tmp$_2 = document.querySelector('#identificadorIA'), HTMLDivElement) ? tmp$_2 : throwCCE();
        identificadorIA.innerHTML = 'Tabuleiro I.A.';
        var identificadorJogador = Kotlin.isType(tmp$_3 = document.querySelector('#identificadorJogador'), HTMLDivElement) ? tmp$_3 : throwCCE();
        identificadorJogador.innerHTML = 'Seu Tabuleiro';
        var vezDeQuem = Kotlin.isType(tmp$_4 = document.getElementById('vezDeQuem'), HTMLDivElement) ? tmp$_4 : throwCCE();
        vezDeQuem.innerHTML = 'VEZ DO JOGADOR';
        var texto1 = Kotlin.isType(tmp$_5 = document.getElementById('texto1'), HTMLDivElement) ? tmp$_5 : throwCCE();
        texto1.innerHTML = 'As casas do tabuleiro da I.A. ficam invis\xEDveis at\xE9 voc\xEA escolher aquela posi\xE7\xE3o, se virar azul siginifica que voc\xEA acertou um mar, preto siginifica parte de um navio.';
        var texto2 = Kotlin.isType(tmp$_6 = document.getElementById('texto2'), HTMLDivElement) ? tmp$_6 : throwCCE();
        texto2.innerHTML = 'Ao redor de um navio completo n\xE3o podem existir outros navios. Assim que um navio for totalmente descoberto as casas ao redor dele ir\xE3o ser expostas como mar.';
        var texto3 = Kotlin.isType(tmp$_7 = document.getElementById('texto3'), HTMLDivElement) ? tmp$_7 : throwCCE();
        texto3.innerHTML = 'Ao acertar um navio voc\xEA continua jogando, por\xE9m se acertar um mar passa sua vez. O mesmo vale para sua oponente I.A, ao acertar um mar a vez \xE9 passada para voc\xEA';
        var idBotao = 'botaoIA';
        for (var i = 0; i <= 63; i++) {
          idBotao = idBotao + i.toString();
          var botoes = document.createElement('BUTTON');
          botoes.addEventListener('click', main$lambda$lambda(closure$tabuleiroIA, i, closure$t1, closure$iaJogadora));
          botoes.setAttribute('id', idBotao);
          var tabuleiroDinamico = Kotlin.isType(tmp$_8 = document.getElementById('tabuleiroDinamico'), HTMLDivElement) ? tmp$_8 : throwCCE();
          tabuleiroDinamico.appendChild(botoes);
          idBotao = 'botaoIA';
        }
      }return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0;
    var iaJogadora = {v: new IA(-1, ArrayList_init(), ArrayList_init())};
    var t1 = {v: criarTabuleiro()};
    for (var i = 0; i <= 63; i++) {
      iaJogadora.v.celulasRestantesEscolhiveis.add_11rb$(i);
    }
    var podeIniciar = {v: false};
    var tabuleiroIA = {v: null};
    tabuleiroIA.v = criarTabuleiro();
    tabuleiroIA.v = organizarNaviosEmTabuleiro(tabuleiroIA.v);
    var mudarNavios = Kotlin.isType(tmp$ = document.querySelector('[mudar-navios]'), HTMLButtonElement) ? tmp$ : throwCCE();
    mudarNavios.addEventListener('click', main$lambda(t1, podeIniciar));
    var iniciar = Kotlin.isType(tmp$_0 = document.querySelector('[iniciar]'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    iniciar.addEventListener('click', main$lambda_0(podeIniciar, tabuleiroIA, t1, iaJogadora));
  }
  _.Tabuleiro = Tabuleiro;
  _.fimDeJogo_coryxe$ = fimDeJogo;
  _.Celula = Celula;
  _.Navio = Navio;
  _.IA = IA;
  _.mudarIA_ultultimaCelulaClicada_4c1nqu$ = mudarIA_ultultimaCelulaClicada;
  _.menor_e5jm6p$ = menor;
  _.maior_e5jm6p$ = maior;
  _.iaPensando_pksyh5$ = iaPensando;
  _.Auxiliar = Auxiliar;
  _.iaJogando_pksyh5$ = iaJogando;
  _.criarTabuleiro = criarTabuleiro;
  _.rand_vux9f0$ = rand;
  _.gerarValoresNavioAleatorio_3yfhhb$ = gerarValoresNavioAleatorio;
  _.verificarDisponibilidadeNavio_y4vrkt$ = verificarDisponibilidadeNavio;
  _.implementarDeFatoNavio_3jqjxg$ = implementarDeFatoNavio;
  _.criarBordas_3yfhhb$ = criarBordas;
  _.organizarNaviosEmTabuleiro_4mqvn1$ = organizarNaviosEmTabuleiro;
  _.gerarID_Array_0_vux9f0$ = gerarID_Array_0;
  _.gerarColunaLinha_Array_0_za3lpa$ = gerarColunaLinha_Array_0;
  _.gerarIDdoNavio_Array_0_3yfhhb$ = gerarIDdoNavio_Array_0;
  _.mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel_8yuy0i$ = mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel;
  _.mudarNavio_alterarUnicaCelulaVisibilidade_3yfhhb$ = mudarNavio_alterarUnicaCelulaVisibilidade;
  _.tornarTabuleiro_2Visivel_4NaoVisivel_3yfhhb$ = tornarTabuleiro_2Visivel_4NaoVisivel;
  _.algoClicouEmUmaCelula_3yfhhb$ = algoClicouEmUmaCelula;
  _.mostrarBordasQueDevemSerVistas_3yfhhb$ = mostrarBordasQueDevemSerVistas;
  _.resto_vux9f0$ = resto;
  _.tabuleiroToPrint_4mqvn1$ = tabuleiroToPrint;
  _.desativarBotoes_61zpoe$ = desativarBotoes;
  _.ativarBotoes_jt3sox$ = ativarBotoes;
  _.limparTabuleiroHTML_61zpoe$ = limparTabuleiroHTML;
  _.jogadorDecidindoTabuleiroPraIA_4mqvn1$ = jogadorDecidindoTabuleiroPraIA;
  _.atualizarTabuleiroIAouJogador_jt3sox$ = atualizarTabuleiroIAouJogador;
  _.atualizarFimDeJogo_jt3sox$ = atualizarFimDeJogo;
  _.atualizarJogadorPerdeu_4mqvn1$ = atualizarJogadorPerdeu;
  _.atualizarCelulasEspecificaDoTabuleiroJ_3yfhhb$ = atualizarCelulasEspecificaDoTabuleiroJ;
  _.atualizarDevagar_8oilyp$ = atualizarDevagar;
  _.main = main;
  main();
  Kotlin.defineModule('main', _);
  return _;
}(typeof main === 'undefined' ? {} : main, kotlin);
