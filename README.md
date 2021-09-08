# 🚢 Batalha Naval 
## Projeto de Linguagem de Programação Funcional 

## 📄 Descrição breve do Projeto

O projeto simula um jogo de batalha naval de um usuário contra a IA. Batalha naval é um jogo em que os jogadores escolhem posições do mapa adversário a fim de acertar os navios inimigos e quem derrubar todos os navios primeiro será o vencedor. 
* Exemplo visual do jogo:
![image](https://user-images.githubusercontent.com/53493002/132416153-5feefd5a-3bf8-45fd-b6f7-2e2fb4d00969.png)

## ♟️ Lógica e estrutura do código

Para a construção do projeto, foram criados duas malhas de botões ligados à dois tabuleiros, cada um contendo uma lista de 64 Células. As células contêm informações como: se a célula é navio ou mar, borda, visivel ou não visivel. Os tabuleiros também contêm listas de Navios, os quais podem possuir de 1 a 4 células. No inicio do jogo são criados 7 navios e posicionados aleatóramente em cada um dos tabuleiros, tendo uma margem de 1 célula entre os navios (isso equivale às bordas). Após isso, as células da lista serão atualizadas de acordo com seu tipo (navio, borda ou mar), sendo todas elas não visíveis.

O tabuleiro da esquerda tem seus navios posicionados de acordo com a escolha do usuário para que a IA jogue. Nesse tabuleiro, os navios ficam visíveis para o usuário, mas não para a IA. O tabuleiro da direita contém as informações sobre as posições dos navios, mas inicialmente não são visíveis para o usuário. O jogo funciona em forma de turnos: ao acertar um navio, sua vez é repetida e ao errar, sua vez é passada. Ao decorrer desses turnos as células escolhidas serão reveladas tendo seu atributo modificado de não visível para visível, tanto para o usuário quanto para a IA. O jogo se encerra quando um dos tabuleiros tem todos seus navios completamente revelados. O vencedor é quem achou todos os navios e, após isso, aparecerá na tela uma mensagem indicando o vencedor. 

### 🤖 Lógica da IA

A IA possui os seguintes atributos: lista de células que compõem um navio parcialmente descoberto, lista de células restantes ainda não escolhidas e um inteiro que armazena o valor da ultima célula clicada. Ao jogar, a IA se encontra em duas principais situações. A primeira situação é quando não há nenhum navio parcialmente sendo descoberto, nesse caso a IA vai escolher uma célula aleatoria dentre as células que ainda não foram escolhidas e chamar a função que faz a jogada. A segunda situação se divide novamente em outras duas situações: quando há apenas uma célula de navio parcialmente descoberto (não tendo a informação sobre o navio ser vertical ou horizontal no tabuleiro) e quando há mais de uma célula de navio parcialmente descoberto (a IA vai interpretar a posição das células e concluir se é um navio vertical ou horizontal). 

No caso de haver apenas uma célula de navio parcialmente descoberto, a IA terá que escolher entre 4 possíveis células ao redor do navio para jogar, sendo estas em cima, embaixo, direita ou à esquerda da célula atual. Ao sorter uma dessas 4 possibilidades, a IA verifica se a célula pode ser clicada. No caso da escolha ser possível, a IA irá adicionar essa célula na lista que compõem o navio sendo descoberto para a próxima jogada. Caso contrário, ela irá tentar novamente até escolher uma célula clicável. 
No caso da IA ter mais de uma célula de navio parcialmente descoberto, ela irá verificar se o navio é vertical ou horizontal. Nesse caso existem apenas duas possibilidades para serem escolhidas: em cima ou embaixo, caso seja vertical, e direita ou esquerda, caso seja horizontal. Após isso, a IA irá verificar se a cécula pode ser clicada, assim como descrito no caso anterior. Caso seja revelado um navio por completo, a IA vai limpar a lista de células que compõem um navio parcialmente descoberto, reiniciando o processo de procurar navios.

### 💻 Lógica da apresentação do tabuleiro

As malhas de botões terão suas cores atualizadas conforme se passam as jogadas. Cada botão receberá uma cor de acordo com o tipo de célula que ele corresponde: branco representa as células ainda não visíveis, preto representa os navios revelados, azul representa o mar e vermelho representa os navios não revelados. A cor vermelha é utlizada para que o usuário possa ver a posição dos navios do seu tabuleiro (o tabuleiro que a IA irá jogar) ou para ver quais navios o usuário faltou encontrar no final do jogo. 
O tabuleiro da esquerda estará sempre com os botões desativados, pois a IA não clica nos botões. O tabuleiro da direita terá seus botões sendo ativados e desativados de acordo com as jogadas, ficando ativado apenas quando for a vez do usuário. 

Foi implementado um tipo de delay para mostrar por etapas as jogadas da IA. Após a IA fazer sua joagada completa, ficará armazenado todas as células que foram escolhidas pela IA numa lista. Essa lista será utilizada dentro do delay para atualizar uma célula por vez a cada 0,8 segundos. Ao terminar o jogo, todos os botões serão atualizados novamente.

obs: Regras são mostradas na tela incial sobre como funciona o jogo e elas são atualizadas ao iniciar o jogo. 

## 👀 Exemplos visuais de aplicação
* Tela incial do usuário escolhendo navios para a IA jogar:
![image](https://user-images.githubusercontent.com/53493002/132403309-da8406a3-de31-4391-bd53-26fd8d76ad0a.png)

* Tela durante o jogo:
![image](https://user-images.githubusercontent.com/53493002/132415888-4005a21f-9660-4a95-9805-f946c51d6eec.png)

* Tela no final do jogo:
![image](https://user-images.githubusercontent.com/53493002/132403248-44605f94-8eb5-4de3-8da2-a67180241e9d.png)

## 🎮 Link jogável
https://batalha-naval-projeto-lpf-lss.vercel.app/

## 🚀 Tecnologias 

Aqui estão as tecnologias usadas neste projeto.

* IntelliJ IDEA Community Versão: 2021.2.1 
* Linguagem: Kotlin 

## 🦾 Serviços usados

* GitHub
* Replit
* Vercel

O Replit foi usado para fazer a tradução do arquivo kotlin para javascript. No site replit.com, crie um novo projeto para a tradução e escolha a linguaguem kotlin. Depois de criar o seu aquivo .kt , crie um novo arquivo com o nome ```compile_run.sh``` e adicione seu conteúdo como no da imagem. 

Para efetuar a tradução clique em ```Shell``` (no canto superior direito, ao lado de "console") e digite ```bash compile_run.sh```. Ao filanizar, será criado um arquivo .js de mesmo nome que o arquivo .kt , assim como mostrado na imagem:

![image](https://user-images.githubusercontent.com/53493002/132432969-87c200f8-f6b4-4980-8d3c-a46aa4e90cda.png)

O Vercel foi utilizado para gerar o link jogável do projeto. 

## ✔️ Status do projeto
Concluído 

## 🖥️ Instalando e compilando o projeto do Jogo
* Baixe o IntelliJ IDEA e o Git 
* Digite ```git clone https://github.com/sofiawolf2/Projeto-LPF ```  no terminal do pc
* No terminal do IntelliJ IDEA digite ```./gradlew run```

## 🖱️ Projeto do jogo por meio de máquina virtual
* Link para acessar o projeto no gitpod:
https://gitpod.io/#/github.com/sofiawolf2/Projeto-LPF
* No terminal digite ```cd src/main/resources/```
* Ainda no terminal digite ```php -S 0.0.0.0:10000```

![image](https://user-images.githubusercontent.com/53493002/132428855-02248ece-8c82-4de4-8040-de42e4563489.png)

* Imagem mostrando o terminal de perto:

![image](https://user-images.githubusercontent.com/53493002/132428957-71ae5f24-1536-4446-bfbe-ab6a844b0bd9.png)

* Irá aparecer uma mensagem no canto inferior direito da tela. Clique em ```Make Public```:

![image](https://user-images.githubusercontent.com/53493002/132429005-d16f2a6f-904d-4bab-87b0-8e9bd7b67b72.png)

* Em seguida clique no penúltimo ícone do lado esquerdo superior da tela:

![image](https://user-images.githubusercontent.com/53493002/132429159-4229a2f6-b78f-4409-b58f-8205f37f8f65.png)

* Depois clique em ```Open Browser``` assim como mostrado na imagem:

![image](https://user-images.githubusercontent.com/53493002/132429073-04269e9c-9aa7-49e7-91fa-ddc2bddca83c.png)

* Você será levado para a seguinte aba e agora poderá jogar normalmente:

![image](https://user-images.githubusercontent.com/53493002/132429659-f951f762-3554-4f3c-87fe-627bea92d675.png)

## 😎 Contribuidores 
* Levi Vidal Feitosa: @levi0112 (https://github.com/levi0112)
* Sofia Alencar Uchôa de Queiroz: @sofiawolf2 (https://github.com/sofiawolf2)
* Silas Nunes Nascimento: @nunessilas (https://github.com/nunessilas)

## 📄 Licença

Esse projeto está sob a [LICENÇA](LICENSE).

