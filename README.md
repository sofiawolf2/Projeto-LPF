# 🎮 Batalha Naval 
## Projeto de Linguagem de Programação Funcional 

## 📄 Descrição breve do Projeto

O projeto simula um jogo de batalha naval de um usuário contra a IA. Batalha naval é um jogo em que os jogadores escolhem posições do mapa adversário a fim de acertar os navios inimigos e quem derrubar todos os navios primeiro será o vencedor. 
* Exemplo visual do jogo:
![image](https://user-images.githubusercontent.com/53493002/132416153-5feefd5a-3bf8-45fd-b6f7-2e2fb4d00969.png)

## 🚢 Lógica e estrutura do código

Para a construção do projeto, foram criados duas malhas de botões ligados à dois tabuleiros, cada um contendo uma lista de 64 Células. As células contêm informações como: se a célula é navio ou mar, borda, visivel ou não visivel. Os tabuleiros também contêm listas de Navios, os quais podem possuir de 1 a 4 células. No inicio do jogo são criados 7 navios e posicionados aleatóramente em cada um dos tabuleiros, tendo uma margem de 1 célula entre os navios (isso equivale a ser uma borda). Após isso, as células da lista serão atualizadas de acordo com seu tipo (navio, borda ou mar), sendo todas elas não visíveis.
O tabuleiro da esquerda tem seus navios posicionados de acordo com a escolha do usuário para que a IA joague. Nesse tabuleiro, os navios ficam visíveis para o usuário mas não para a IA. O tabuleiro da direita contém as informações sobre a posição dos navios mas inicialmente não são visíveis para o usuário. O jogo funciona em forma de turnos: ao acertar um navio, sua vez é repetida e ao errar, sua vez é passada. Ao decorrer desses turnos as células escolhidas serão reveladas tendo seu atributo modificado de não visível para visível, tanto para o usuário quanto para a IA. O jogo se encerra quando um dos tabuleiros tem todos seus navios completamente revelados. O vencedor é quem achou todos os navios e, após isso, aparecerá na tela uma mensagem indicando o vencedor. 

### 🤖 Lógica da IA

A IA possui os seguintes atributos: lista de células que compõem um navio parcialmente descoberto, lista de células restantes ainda não escolhidas e um inteiro que armazena o valor da ultima célula clicada. Ao jogar, a IA se encontra em duas principais situações. A primeira situação é quando não há nenhum navio parcialmente sendo descoberto, nesse caso a IA vai escolher uma célula aleatoria dentre as células que ainda não foram escolhidas e chamar a função que faz a jogada. A segunda situação se divide novamente em outras duas situações: quando há apenas uma célula de navio parcialmente descoberto (não tendo a informação sobre o navio ser vertical ou horizontal no tabuleiro) e quando há mais de uma célula de navio parcialmente descoberto (a IA vai interpretar a posição das células e concluir se é um navio vertical ou horizontal). 
No caso de haver apenas uma célula de navio parcialmente descoberto, a IA terá que escolher entre 4 possíveis células ao redor do navio para jogar, sendo estas em cima, embaixo, direita ou à esquerda da célula atual. Ao sorter uma dessas 4 possibilidades, a IA verifica se a célula pode ser clicada. No caso da escolha ser possível, a IA irá adcionar essa célula na lista que compõem o navio sendo descoberto para a próxima jogada. Caso contrário, ela irá tentar novamente até escolher uma célula clicável. 
No caso da IA ter mais de uma célula de navio parcialmente descoberto, ela irá verificar se o navio é vertical ou horizontal. Nesse caso existem apenas duas possibilidades para serem escolhidas: em cima ou embaixo, caso seja vertical, e direita ou esquerda, caso seja horizontal. Após isso, a IA irá verificar se a cécula pode ser clicada, assim como descrito no caso anterior. 

### 💻 Lógica da apresentação do tabuleiro

As malhas de botões terão suas cores atualizadas conforme se passam as jogadas. Cada botão receberá uma cor de acordo com o tipo de célula que ele corresponde: branco representa as células ainda não visíveis, preto representa os navios revelados, azul representa o mar e vermelho representa os navios não revelados. A cor vermelha é utlizada para que o usuário possa ver a posição dos navios do seu tabuleiro (o tabuleiro que a IA irá jogar) ou para ver quais navios o usuário faltou encontrar no final do jogo. 
O tabuleiro da esquerda estará sempre com os botões desativados, pois a IA não clica nos botões. O tabuleiro da direita terá seus botões sendo ativados e desativados de acordo com as jogadas, ficando ativado apenas quando for a vez do usuário. 
Foi implementado um tipo de delay para mostrar por etapas as joagas da IA. Após a IA fazer sua joagada completa, ficará armazenado todas as células que foram escolhidas pela IA numa lista. Essa lista será utilizada dentro do delay para atualizar uma célula por vez a cada 0,8 segundos. Ao terminar o jogo, todos os botões serão atualizados novamente.

## 👀 Exemplos visuais de aplicação
* Tela incial do usuário escolhendo navios para a IA jogar:
![image](https://user-images.githubusercontent.com/53493002/132403309-da8406a3-de31-4391-bd53-26fd8d76ad0a.png)

* Tela durante o jogo:
![image](https://user-images.githubusercontent.com/53493002/132415888-4005a21f-9660-4a95-9805-f946c51d6eec.png)

* Tela no final do jogo:
![image](https://user-images.githubusercontent.com/53493002/132403248-44605f94-8eb5-4de3-8da2-a67180241e9d.png)

## Link jogável
https://batalha-naval-projeto-lpf-lss.vercel.app/

## Tecnologias 

Aqui estão as tecnologias usadas neste projeto.

* IntelliJ IDEA Community Versão: 2021.2.1 
* Linguagem: Kotlin 

## Serviços usados

* GitHub
* Replit
* Vercel

## Status do projeto
Concluído 

## 🚀 Instalando e compilando o projeto do Jogo
* Baixe o IntelliJ IDEA e o Git 
* Digite ```git clone https://github.com/sofiawolf2/Projeto-LPF ```  no terminal do pc
* No terminal do IntelliJ IDEA digite ```./gradlew run```

## Projeto do jogo por meio de máquina virtual (gitpod)
* Link para acessar o projeto no gitpod:
http://gitpod.io/#https://github.com/sofiawolf2/Projeto-LPF


## Contribuidores 
