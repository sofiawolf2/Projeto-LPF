function iniciandoOJogo() {
    criandoBotoes("tabuleiroJogador", "botaoJ")
    configuracoesIniciais()
}

function criandoBotoes(idNome, nomeBotao){
    var tabuleiroJogador = document.getElementById(idNome)

    for(var i=0; i<64; i++){
        var botoes = document.createElement("BUTTON")
        botoes.setAttribute("id", nomeBotao + i)
        
        tabuleiroJogador.appendChild(botoes)
    }
}

function configuracoesIniciais(){
    var tabuleiroDinamico = document.getElementById("tabuleiroDinamico")
       
    var mudarPosicaoNavios = document.createElement("BUTTON")
    mudarPosicaoNavios.setAttribute("id", "posicaoNavios")
    mudarPosicaoNavios.onclick = ()=> {
        mudarNavios()
    }

    mudarPosicaoNavios.style.width = "65px"
    mudarPosicaoNavios.style.height = "65px"
    mudarPosicaoNavios.style.marginRight = "20px"
    mudarPosicaoNavios.innerHTML = "Mudar Navios"

    var iniciarJogos = document.createElement("BUTTON")
    iniciarJogos.setAttribute("id", "iniciarJogo")
    iniciarJogos.onclick = ()=>{
        iniciarJogo()
    }

    iniciarJogos.style.width = "65px"
    iniciarJogos.style.height = "65px"
    iniciarJogos.style.marginLeft = "20px"
    iniciarJogos.innerHTML = "Iniciar Jogo"

    tabuleiroDinamico.appendChild(mudarPosicaoNavios)
    tabuleiroDinamico.appendChild(iniciarJogos)
}

function iniciarJogo(){
    var removerBotoes = document.getElementById("tabuleiroDinamico")
    removerBotoes.removeChild(removerBotoes.children[0])
    removerBotoes.removeChild(removerBotoes.children[0])
    //Remove os dois botões Iniciar jogo e Mudar navios de Posição

    criarTabuleiroIA()
    //Essa função cria uma grade 8X8 com as mesmas definições da matriz tabuleiroJogador

    criandoBotoes("tabuleiroDinamico", "botaoIA")
    //Mesma função que cria os botões no inicio do arquivo
    colocaNaviosIA()
}

function criarTabuleiroIA(){
    var tabuleiroIA = document.getElementById("tabuleiroDinamico")
    tabuleiroIA.style.display = "grid"
    tabuleiroIA.style.gridTemplateColumns = "30px 30px 30px 30px 30px 30px 30px 30px"
    tabuleiroIA.style.gridTemplateRows = "30px 30px 30px 30px 30px 30px 30px 30px"
    tabuleiroIA.style.gridGap = "3px"
}

function colocaNaviosIA(){
    for(var i=0; i<5; i++){
        var identificadorBotao = Math.floor(Math.random() * 64)
        var botaoSeleconado = document.getElementById(`${"botaoIA"+identificadorBotao}`)
    
        botaoSeleconado.style.backgroundColor = "blue"
    
        console.log(identificadorBotao + ": identificadorBotao IA")
        }
}

function mudarNavios(){
    
    for(var j=0; j<64; j++){
        var botaoSeleconado = document.getElementById(`${"botaoJ"+j}`)
        botaoSeleconado.style.backgroundColor = "white"    
    }

    for(var i=0; i<5; i++){
    var identificadorBotao = Math.floor(Math.random() * 64)
    var botaoSeleconado = document.getElementById(`${"botaoJ"+identificadorBotao}`)

    botaoSeleconado.style.backgroundColor = "green"
    }

}
