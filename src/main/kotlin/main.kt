import kotlinx.browser.*
import org.w3c.dom.HTMLBRElement
import org.w3c.files.*
import org.w3c.dom.Window
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.window


// apenas funcoes que verificam valores foram colocadas dentro de classes
class Tabuleiro(
    var celulasT : ArrayList<Celula>,
    var naviosT : ArrayList<Navio>
){
}
//@JsName("fimDeJogo")
fun fimDeJogo(tabEsquerda: Tabuleiro,tabDireita: Tabuleiro){ // se todos os navios forem descobertos
    var esquerda : Boolean = true
    var direita : Boolean = true
    for (i in 0..6){
        if(!tabDireita.naviosT[i].descoberto) direita = false
    }
    for (i in 0..6){
        if(!tabEsquerda.naviosT[i].descoberto)  esquerda = false
    }
    if (direita){
        desativarBotoes("#botaoIA") //tabela da direita
        atualizarFimDeJogo(tabDireita,"#botaoIA") //mostra o resto do tabuleiro da direita
        window.alert("Você teve sorte dessa vez, mas ganharei na próxima... As máquinas sempre serão superiores. ass: IA")
    }
    if (esquerda){
        desativarBotoes("#botaoIA") //tabela da direita
        atualizarJogadorPerdeu(tabDireita) //mostrar quais botoes o jogador n achou
        atualizarFimDeJogo(tabEsquerda,"#botaoJ")  //mostra o resto do tabuleiro da esquerda
        window.alert("EU ganhei de você! 1x0 PARA AS MÁQUINAS!" + " Melhore seu sistema operacional para me enfrentar, humano")
    }
}
//coluna + (linha - 1)* 8 = id
//coluna = id - (linha-1)*8

class Celula (
    val id : Int,
    val navio : Boolean,
    val visivel : Boolean,
    val ehBorda : Boolean
){  // ehBorda é vdd se a celula n for navio E n tiver navio prox (range de 1 casa)
}

class Navio(
    val tamanho : Int,
    val celulas : ArrayList <Celula>

){
    val bordas : ArrayList <Int>
        get(){return this.retornoDeBorda()}

    fun retornoDeBorda() : ArrayList <Int>{
        var retornoDeBorda : ArrayList <Int> = arrayListOf()
        var c : Int
        var l : Int
        for (x in 0..tamanho-1){ //x equivale a posicao das celulas do navio
            c = gerarColunaLinha_Array_0(celulas[x].id)[0]
            l = gerarColunaLinha_Array_0(celulas[x].id)[1]
            for (i in l-1..l+1){
                for (j in c-1..c+1){
                    if(j>-1 && j<8 && i>-1 && i<8){
                        if(!retornoDeBorda.contains(gerarID_Array_0(j,i))) retornoDeBorda.add(gerarID_Array_0(j, i))
                    }
                }
            }
        }
        for (x in 0..tamanho-1){
            if (retornoDeBorda.contains(celulas[x].id)) retornoDeBorda.remove(celulas[x].id)
        }
        return retornoDeBorda
    }

    val descoberto : Boolean
        get(){ return this.celulasNavioVisiveis()}
    //ao criar/recriar o navio, ele vai automaticamente definir se o navio foi descoberto

    //@JsName("celulasNavioVisiveis")
    fun celulasNavioVisiveis (): Boolean{
        for(i in 0 .. tamanho-1){
            if(!celulas[i].visivel){
                return false
            }
        }
        return true
    }
    val ehHorizontal : Boolean
        get() {
            if(tamanho>1){
                if((celulas[1].id - celulas[0].id) >1) return false
            }
            return true
        }
}

class IA(
    val ultimaCelulaClicada : Int,
    val idCelulasNaviosSendoDescoberto : ArrayList<Int>,
    val celulasRestantesEscolhiveis : ArrayList<Int>
){
    val tentandoDescobrirNavio : Boolean
        get (){return idCelulasNaviosSendoDescoberto.size!=0}
}
fun mudarIA_ultultimaCelulaClicada (ia : IA, novaUltimaCelulaClicada : Int): IA{
    return IA(novaUltimaCelulaClicada, ia.idCelulasNaviosSendoDescoberto, ia.celulasRestantesEscolhiveis)
}

fun menor( lista : ArrayList<Int>) : Int{
    var menor : Int = 63
    for (i in 0..lista.size-1){
        if (lista[i]<menor) menor = lista[i]
    }
    return menor
}

fun maior( lista : ArrayList<Int>) : Int{
    var maior : Int = 0
    for (i in 0..lista.size-1){
        if (lista[i]>maior) maior = lista[i]
    }
    return maior
}

//TESTAR
fun iaPensando(tab: Tabuleiro, ia: IA): Int{
    var c : Int = 0
    var l : Int = 0

    if(ia.tentandoDescobrirNavio){
        if(ia.idCelulasNaviosSendoDescoberto.size==1){
            do {
                c = gerarColunaLinha_Array_0(ia.idCelulasNaviosSendoDescoberto[0])[0]
                l = gerarColunaLinha_Array_0(ia.idCelulasNaviosSendoDescoberto[0])[1]
                val aleatorio : Int = rand(1,4)
                when(aleatorio) {
                    1 -> l = l - 1
                    2 -> c = c + 1
                    3 -> l = l + 1
                    4 -> c = c - 1
                }
            } while (c<0 || c>7 || l<0 || l>7 || !ia.celulasRestantesEscolhiveis.contains(gerarID_Array_0(c,l)))
            //no while escrevemos as opçoes que NAO queremos que aconteça

        }else{

            val cMenor : Int = gerarColunaLinha_Array_0(menor(ia.idCelulasNaviosSendoDescoberto))[0]
            val lMenor : Int = gerarColunaLinha_Array_0(menor(ia.idCelulasNaviosSendoDescoberto))[1]

            val cMaior : Int = gerarColunaLinha_Array_0(maior(ia.idCelulasNaviosSendoDescoberto))[0]
            val lMaior : Int = gerarColunaLinha_Array_0(maior(ia.idCelulasNaviosSendoDescoberto))[1]

            do {
                val aleatorio : Int = rand(1,2)
                when(aleatorio){
                    1 -> {
                        if (tab.naviosT[gerarIDdoNavio_Array_0(tab,ia.idCelulasNaviosSendoDescoberto[0])].ehHorizontal) {
                            c = cMenor - 1
                            l = lMenor
                        }
                        else {
                            c = cMenor
                            l = lMenor-1
                        }
                    }
                    2 -> {
                        if (tab.naviosT[gerarIDdoNavio_Array_0(tab,ia.idCelulasNaviosSendoDescoberto[0])].ehHorizontal){
                            c = cMaior+1
                            l = lMaior
                        }
                        else {
                            c = cMaior
                            l = lMaior + 1
                        }
                    }
                }

            }while (c<0 || c>7 || l<0 || l>7 || !ia.celulasRestantesEscolhiveis.contains(gerarID_Array_0(c,l)))
        }
        return gerarID_Array_0(c,l)
    }
    if (ia.celulasRestantesEscolhiveis.size==0) return 0
    return ia.celulasRestantesEscolhiveis[rand(0,ia.celulasRestantesEscolhiveis.size-1)]

}

class Auxiliar(
    val tabuleiro : Tabuleiro,
    val ia : IA,
    val iaQuerMostrarDevagar : ArrayList<Int>
){}

fun iaJogando (t1: Tabuleiro, ia: IA) : Auxiliar{
    var iaJogar : IA = ia
    var tab : Tabuleiro = t1
    var iaPensou : Int = 0
    val iaQuerMostrarDevagarA : ArrayList<Int> = arrayListOf()

    do {
        iaPensou = iaPensando(tab,iaJogar)
        //delay(500)
        if (ia.celulasRestantesEscolhiveis.size<=0){
            break
        }
        tab = algoClicouEmUmaCelula(tab,iaPensou)
        iaQuerMostrarDevagarA.add(iaPensou)

        //atualizar a ia
        iaJogar.celulasRestantesEscolhiveis.remove(iaPensou) // removi a celula escolhida pela ia
        if (tab.celulasT[iaPensou].navio) {
            if (tab.naviosT[gerarIDdoNavio_Array_0(tab, iaPensou)].descoberto) {
                iaJogar.idCelulasNaviosSendoDescoberto.clear() // achamos um navio completo, vamo resetar o array
                for (i in 0..tab.naviosT[gerarIDdoNavio_Array_0(tab, iaPensou)].bordas.size -1){
                    //esse if de baixo serve pra garantir que vou remover apenas se existir
                    if(iaJogar.celulasRestantesEscolhiveis.contains(tab.naviosT[gerarIDdoNavio_Array_0(tab, iaPensou)].bordas[i])){
                        iaJogar.celulasRestantesEscolhiveis.remove(tab.naviosT[gerarIDdoNavio_Array_0(tab, iaPensou)].bordas[i])
                        }
                }
            } else {
                iaJogar.idCelulasNaviosSendoDescoberto.add(iaPensou) //se o navio n foi descoberto, vamo salvar essa parcela do navio
            }
        }
        iaJogar = mudarIA_ultultimaCelulaClicada(iaJogar,iaPensou) // atualizar ultimaCelulaClicada


    }while (tab.celulasT[iaJogar.ultimaCelulaClicada].navio) //se nao for navio quebra o while
    return Auxiliar(tab,iaJogar,iaQuerMostrarDevagarA)
}

//id é a posição do array
//@JsName("criarTabuleiro")
fun criarTabuleiro () : Tabuleiro{ //cria um tabuleiro novo nao visivel
    val tabuleiroOficial : Tabuleiro = Tabuleiro(arrayListOf(), arrayListOf())//arrayListOf() eh um arraylist vazio
    for(i in 0 .. 63){
        tabuleiroOficial.celulasT.add(Celula(i,false,false,false)) // tabulero sem navio nem nada limpo (eh o do jogador)
    }
    return tabuleiroOficial
}
//@JsName("rand")
fun rand(start: Int, end: Int): Int {

    require(start <= end) { "Illegal Argument" }
    return (start..end).random()
}
//@JsName("gerarValoresNavioAleatorio")
fun gerarValoresNavioAleatorio(tabuleiro : Tabuleiro, tamanho : Int) : ArrayList<Int>{
    // retorna os ingredientes pra criar o navio
    var coluna : Int
    var linha : Int
    var verticalOuHorizontal : Int
    do {
        verticalOuHorizontal = rand(0,1)
        if (verticalOuHorizontal==0){ // 0 = vertical | 1 = horizontal
            coluna = rand(0,7) // gera entre 0 e 7
            linha = rand(0,(8-tamanho))
        }else{
            linha = rand(0,7)
            coluna = rand(0,(8-tamanho))
        }
        //println("coluna: "+ coluna + " | linha: " + linha + " | V=0 H=1 : " + verticalOuHorizontal)
    }while (!verificarDisponibilidadeNavio(gerarID_Array_0(coluna, linha), verticalOuHorizontal, tamanho, tabuleiro))
    //println("criei meu primeiro navio yeay")
    return (arrayListOf(gerarID_Array_0(coluna, linha), verticalOuHorizontal))
}
//@JsName("verificarDisponibilidadeNavio")
fun verificarDisponibilidadeNavio(id : Int, verticalOuHorizontal : Int ,tamanhoNavio : Int, tabuleiroSendoVerificado : Tabuleiro ) : Boolean{
    //println("entrou no verificar")
    var novoId : Int = id
    for(i in 0 .. tamanhoNavio-1){
        if (tabuleiroSendoVerificado.celulasT[novoId].ehBorda || tabuleiroSendoVerificado.celulasT[novoId].navio){
            return false
        }
        if (verticalOuHorizontal == 0){// 0 = vertical | 1 = horizontal
            novoId = novoId+8
        }else{
            novoId = novoId+1
        }

    }
    //println("true")
    return true
}

//@JsName("implementarDeFatoNavio")
fun implementarDeFatoNavio ( tabulei : Tabuleiro, tamanhoNavio : Int , valoresNavio : ArrayList<Int>) : Tabuleiro{
    var tabuleiroO : Tabuleiro = tabulei
    var celulasNavio : ArrayList<Celula> = arrayListOf()
    for (i in 0..tamanhoNavio-1){
        if(valoresNavio[1]==1){// 0 = vertical | 1 = horizontal
            celulasNavio.add(Celula(valoresNavio[0]+i,true, false, false))
            tabuleiroO.celulasT[valoresNavio[0]+i] = celulasNavio[i]
        }
        else {
            celulasNavio.add(Celula(valoresNavio[0]+ i*8 ,true, false, false))
            tabuleiroO.celulasT[valoresNavio[0]+(8*i)] = celulasNavio[i]
        }
        tabuleiroO = criarBordas(tabuleiroO,celulasNavio[i].id)
    }
    var navioFinalizado : Navio = Navio(tamanhoNavio,celulasNavio)
    tabuleiroO.naviosT.add(navioFinalizado)
    return tabuleiroO
}

//@JsName("criarBordas")
fun criarBordas( tabuleiroO: Tabuleiro, idCelulaDoNavioUND : Int) : Tabuleiro{
    var id : Int
    val c : Int = gerarColunaLinha_Array_0(idCelulaDoNavioUND)[0]
    val l : Int = gerarColunaLinha_Array_0(idCelulaDoNavioUND)[1]
    val novoTabul : Tabuleiro = tabuleiroO

    for (i in l-1..l+1){
        for (j in c-1..c+1){
            if(j>-1 && j<8 && i>-1 && i<8){
                id = gerarID_Array_0(j,i)
                if (!novoTabul.celulasT[id].navio) {
                    novoTabul.celulasT[id] = mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(novoTabul.celulasT[id], 3)
                }
            }
        }
    }
    return novoTabul
}

//@JsName("organizarNaviosEmTabuleiro")
fun organizarNaviosEmTabuleiro (tab : Tabuleiro) : Tabuleiro{
    var t1 : Tabuleiro = tab
    t1 = implementarDeFatoNavio(t1,4,gerarValoresNavioAleatorio(t1,4))
    t1 = implementarDeFatoNavio(t1,3,gerarValoresNavioAleatorio(t1,3))
    t1 = implementarDeFatoNavio(t1,2,gerarValoresNavioAleatorio(t1,2))
    t1 = implementarDeFatoNavio(t1,2,gerarValoresNavioAleatorio(t1,2))
    t1 = implementarDeFatoNavio(t1,1,gerarValoresNavioAleatorio(t1,1))
    t1 = implementarDeFatoNavio(t1,1,gerarValoresNavioAleatorio(t1,1))
    t1 = implementarDeFatoNavio(t1,1,gerarValoresNavioAleatorio(t1,1))
    return t1
}

//@JsName("gerarID_Array_0")
fun gerarID_Array_0 (coluna : Int, linha : Int) : Int{
    return coluna + (linha)* 8
}
//@JsName("gerarColunaLinha_Array_0")
fun gerarColunaLinha_Array_0 (a : Int) : ArrayList<Int>{
    if (a<8) return arrayListOf(a,0)
    else return arrayListOf(resto(a, 8),a/8)
    //7-(7+(a/8)*8-a)  equivalente ao resto
}
//@JsName("gerarIDdoNavio_Array_0")
fun gerarIDdoNavio_Array_0(tab : Tabuleiro, idCelula : Int) : Int{

    for (i in 0..6){
        for (j in 0..tab.naviosT[i].tamanho-1){
            if (idCelula == tab.naviosT[i].celulas[j].id) return i
        }
    }
    return -1 //retornar -1 significa q essa celula n eh um navio
}
//@JsName("mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel")
fun mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel (celula : Celula, opcao : Int) : Celula{

    if (opcao == 1) return Celula(celula.id,true,celula.visivel, celula.ehBorda) // se torna navio
    if (opcao == 2) return Celula(celula.id,celula.navio,true,celula.ehBorda) // inverte visivel
    if (opcao == 3) return Celula(celula.id,celula.navio,celula.visivel,true) // se torna ehBorda
    if (opcao == 4) return Celula(celula.id,celula.navio,false,celula.ehBorda) // inverte visivel
    return celula
}
//TESTAR
//@JsName("mudarNavio_alterarUnicaCelulaVisibilidade")
fun mudarNavio_alterarUnicaCelulaVisibilidade (tab : Tabuleiro, idCelula: Int ) : Navio{
    val idNavio : Int = gerarIDdoNavio_Array_0(tab,idCelula)
    val arrayCelulas : ArrayList<Celula> = arrayListOf()
    for (i in 0..tab.naviosT[idNavio].tamanho-1){
        if (idCelula==tab.naviosT[idNavio].celulas[i].id){
            for (j in 0..tab.naviosT[idNavio].tamanho-1){
                if (j==i){
                    arrayCelulas.add(mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.naviosT[idNavio].celulas[j],2))
                }else{
                    arrayCelulas.add(tab.naviosT[idNavio].celulas[j])
                }
            }
        }
    }
    return Navio(tab.naviosT[idNavio].tamanho,arrayCelulas)
}
//@JsName("tornarTabuleiroNaoVisivel")
fun tornarTabuleiro_2Visivel_4NaoVisivel(tab: Tabuleiro, opcao : Int) : Tabuleiro{
    for (i in 0..63){
        tab.celulasT[i] = mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT[i],opcao)
    }
    return tab
}

//TESTAR
//@JsName("jogadorClicouEmUmaCelula")
fun algoClicouEmUmaCelula( t1 : Tabuleiro, idCelula: Int) : Tabuleiro {
    var tab : Tabuleiro = t1
    if (tab.celulasT[idCelula].visivel) return tab
    tab.celulasT[idCelula] = mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT[idCelula],2) //tornar celula visivel

    if (tab.celulasT[idCelula].navio){
        tab.naviosT[gerarIDdoNavio_Array_0(tab, idCelula)] = mudarNavio_alterarUnicaCelulaVisibilidade(tab,idCelula) //atualizar navio
        if (tab.naviosT[gerarIDdoNavio_Array_0(tab,idCelula)].descoberto){

            tab = mostrarBordasQueDevemSerVistas(tab, gerarIDdoNavio_Array_0(tab, idCelula))
        }
    }
    return tab
}

fun mostrarBordasQueDevemSerVistas(tab: Tabuleiro, idNavio : Int) : Tabuleiro{
    for (i in 0..tab.naviosT[idNavio].bordas.size-1){
        tab.celulasT[tab.naviosT[idNavio].bordas[i]] = mudarCelula_1navio_2visivel_3ehBorda_4NaoVisivel(tab.celulasT[tab.naviosT[idNavio].bordas[i]],2)
    }
    return tab
}


//@JsName("resto")
fun resto(num:Int, div:Int): Int{ //sim criamos uma funcao pra resto
    if (num<div)return num-1
    else return num - ((num/div)*div)
}
fun tabuleiroToPrint(tab : Tabuleiro){
    for (i in 0..63) {
        if (tab.celulasT[i].visivel) {
            if (tab.celulasT[i].navio) print("N ")
            else if (tab.celulasT[i].ehBorda) print("* ")
            else print(". ")
        }else{
            print(". ")
        }
        if (resto(i + 1, 8) == 0 && i != 0) println()
    }
}

//FUNCOES HTML

fun desativarBotoes(escritaID : String){
    var idBotao : String = escritaID
    for (i in 0..63){
        idBotao = idBotao + i.toString()
        var botoes = document.querySelector(idBotao) as HTMLButtonElement
        botoes.setAttribute("disabled", "disabled")
        idBotao = escritaID
    }
}

fun ativarBotoes(tab: Tabuleiro, escritaID : String){
    var idBotao : String = escritaID
    for (i in 0..63){
        idBotao = idBotao + i.toString()
        if(!tab.celulasT[i].visivel){
            var botoes = document.querySelector(idBotao) as HTMLButtonElement
            botoes.removeAttribute("disabled")
        }
        idBotao = escritaID
    }
}


fun limparTabuleiroHTML(escritaID : String){
    var idBotao : String = escritaID
    for (i in 0..63){
        idBotao = idBotao + i.toString()

        var cor = document.querySelector(idBotao) as HTMLButtonElement
        cor.style.backgroundColor = "white"
        idBotao = escritaID
    }
}

fun jogadorDecidindoTabuleiroPraIA(tab: Tabuleiro){
    var idBotao : String = "#botaoJ"
    for (i in 0..63){
        idBotao = idBotao + i.toString()

        var cor = document.querySelector(idBotao) as HTMLButtonElement
        if (tab.celulasT[i].navio){
            cor.style.backgroundColor = "red"
        }
        idBotao = "#botaoJ"
    }
}

fun atualizarTabuleiroIAouJogador(tab: Tabuleiro, escritaID : String){
    var idBotao : String = escritaID
    for (i in 0..63){
        idBotao = idBotao + i.toString()

        var cor = document.querySelector(idBotao) as HTMLButtonElement
        if(tab.celulasT[i].visivel){
            if (tab.celulasT[i].navio) cor.style.backgroundColor = "black"
            else cor.style.backgroundColor = "blue"
        }
        idBotao = escritaID
    }
}

fun atualizarFimDeJogo(tab: Tabuleiro, escritaID : String){
    var idBotao : String = escritaID
    for (i in 0..63){
        idBotao = idBotao + i.toString()

        var cor = document.querySelector(idBotao) as HTMLButtonElement
        if (tab.celulasT[i].navio) cor.style.backgroundColor = "black"
        else cor.style.backgroundColor = "blue"
        idBotao = escritaID
    }
}

fun atualizarJogadorPerdeu(tab: Tabuleiro){
    var idBotao : String = "#botaoIA"
    for (i in 0..63){
        idBotao = idBotao + i.toString()

        var cor = document.querySelector(idBotao) as HTMLButtonElement
        if (tab.celulasT[i].navio && !tab.celulasT[i].visivel){ //vamos pintar quem n achamos se a ia ganhar
            cor.style.backgroundColor = "red"
        }
        idBotao = "#botaoIA"
    }
}

fun atualizarCelulasEspecificaDoTabuleiroJ (tab: Tabuleiro, idCelula: Int){
    var cor = document.querySelector("#botaoJ"+idCelula.toString()) as HTMLButtonElement
    if (tab.celulasT[idCelula].navio) cor.style.backgroundColor = "black"
    else cor.style.backgroundColor = "blue"
}

fun atualizarDevagar(t1: Tabuleiro,tabuleiroIA : Tabuleiro, aux : Auxiliar){
    for (i in 0..aux.iaQuerMostrarDevagar.size-1){
        window.setTimeout(fun(){
            atualizarCelulasEspecificaDoTabuleiroJ(t1,aux.iaQuerMostrarDevagar[i])
        },
            timeout = 800*(i+1))
    }
    window.setTimeout(fun(){
        atualizarTabuleiroIAouJogador(t1,"#botaoJ") //tabela da esquerda
        ativarBotoes(tabuleiroIA,"#botaoIA") //tabela da direita
        fimDeJogo(t1,tabuleiroIA)
        val vezDeQuem = document.getElementById("vezDeQuem") as HTMLDivElement
        vezDeQuem.innerHTML = "VEZ DO JOGADOR"
    },
        timeout = 800*(aux.iaQuerMostrarDevagar.size+1))
}

fun main (){

    //o tabuleiro pode ser var ate que o jogador confirme a posicao dos navios
    //quando ele confirmar, podemos tranformar o tabuleiro em val
    //isso acontece quando o jogador apertar o botao "iniciar"
    //se o jogador quiser mudar a posicao dos navios, t1 recebe um criarTabuleiro pra "reiniciar"
    //isso acontece quando o jogador apertar o botao "mudar posicao dos navios"

    var iaJogadora : IA = IA(-1, arrayListOf(), arrayListOf())
    var t1 : Tabuleiro = criarTabuleiro() //so pra inicializar
    for (i in 0..63){
        iaJogadora.celulasRestantesEscolhiveis.add(i)
    }
    var podeIniciar : Boolean = false

    var tabuleiroIA : Tabuleiro //o tabuleiro q a IA criou pra gente jogar
    tabuleiroIA = criarTabuleiro()
    tabuleiroIA = organizarNaviosEmTabuleiro(tabuleiroIA)

    val mudarNavios = document.querySelector("[mudar-navios]") as HTMLButtonElement
    mudarNavios.addEventListener("click", {
        t1 = criarTabuleiro()
        t1 = organizarNaviosEmTabuleiro(t1)
        limparTabuleiroHTML("#botaoJ")
        jogadorDecidindoTabuleiroPraIA(t1)
        desativarBotoes("#botaoJ")
        podeIniciar = true
    })

    //AGORA COMECA O JOGO
    val iniciar = document.querySelector("[iniciar]") as HTMLButtonElement
    iniciar.addEventListener("click", {
        val removerBotao1 = document.querySelector("#mudar_navio") as HTMLButtonElement
        val removerBotao2 = document.querySelector("#iniciar") as HTMLButtonElement
        val removerPularLinha = document.querySelector("#pularLinha") as HTMLBRElement
        if (podeIniciar) {
            removerBotao1.remove()
            removerBotao2.remove()
            removerPularLinha.remove()
            //atualizar as regras
            val identificadorIA = document.querySelector("#identificadorIA")  as HTMLDivElement
            identificadorIA.innerHTML = "Tabuleiro I.A."

            val identificadorJogador = document.querySelector("#identificadorJogador")  as HTMLDivElement
            identificadorJogador.innerHTML = "Seu Tabuleiro"

            val vezDeQuem = document.getElementById("vezDeQuem") as HTMLDivElement
            vezDeQuem.innerHTML = "VEZ DO JOGADOR"

            val texto1 = document.getElementById("texto1") as HTMLDivElement
            texto1.innerHTML = "As casas do tabuleiro da I.A. ficam invisíveis até você escolher aquela posição, se virar azul siginifica que você acertou um mar, preto siginifica parte de um navio."

            val texto2 = document.getElementById("texto2") as HTMLDivElement
            texto2.innerHTML = "Ao redor de um navio completo não podem existir outros navios. Assim que um navio for totalmente descoberto as casas ao redor dele irão ser expostas como mar."

            val texto3 = document.getElementById("texto3") as HTMLDivElement
            texto3.innerHTML = "Ao acertar um navio você continua jogando, porém se acertar um mar passa sua vez. O mesmo vale para sua oponente I.A, ao acertar um mar a vez é passada para você"

            //criar botoes e criar um espera por click (querySelector)
            var idBotao : String = "botaoIA"
            for (i in 0..63){
                idBotao = idBotao + i.toString()
                val botoes = document.createElement("BUTTON")

                //espera por click:
                botoes.addEventListener("click", {
                    if (!tabuleiroIA.celulasT[i].visivel){
                        tabuleiroIA = algoClicouEmUmaCelula(tabuleiroIA,i) //i do for eh a celula
                        limparTabuleiroHTML("#botaoIA") //atualizar tabuleiro (cores)
                        atualizarTabuleiroIAouJogador(tabuleiroIA,"#botaoIA") //tabuleiro da direita
                        fimDeJogo(t1,tabuleiroIA)

                        if(!tabuleiroIA.celulasT[i].navio){
                            desativarBotoes("#botaoIA") //tabela da direita
                            val vezDeQuem = document.getElementById("vezDeQuem") as HTMLDivElement
                            vezDeQuem.innerHTML = "VEZ DA IA"
                            val aux : Auxiliar = iaJogando(t1,iaJogadora)
                            iaJogadora = aux.ia
                            t1 = aux.tabuleiro
                            atualizarDevagar(t1, tabuleiroIA, aux)

                        }
                    }
                })
                botoes.setAttribute("id", idBotao)

                val tabuleiroDinamico = document.getElementById("tabuleiroDinamico") as HTMLDivElement
                tabuleiroDinamico.appendChild(botoes)
                idBotao = "botaoIA"
            }//for acaba aqui
        }
    }) // fim do evento click do botao iniciar

}// fim da main