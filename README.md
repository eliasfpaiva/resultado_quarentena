# Resultado da quarentena
 
**Elias Flávio de Paiva**
### Repl.it https://repl.it/@eliasfpaiva
 
O objetivo desta aplicação é permitir o cadastro de medições de características corporais para acompanhamento do IMC de quem utiliza a aplicação.
 
## 1. Interfaces
 
### Tela principal
 
Esta tela exibe uma barra de cabeçalho com informações sobre os dados fornecidos e a classificação do I.M.C.. Também fornece um link para a página da OMS onde se pode obter o relatório que contém uma tabela de referência para a classificação do I.M.C.. Todas as telas contam com esta barra de cabeçalho de igual modo.
 
Em seguida, caso a lista de I.M.C. esteja vazia, uma imagem será exibida com mensagem informando não haver registros e convidando a iniciar o processo. Caso a lista contenha registros, ela será exibida com o valor do I.M.C. registrado, a data do registro e um botão para exclusão do registro. Clicando no valor do I.M.C. ou na data, será exibida a tela de visualização do registro lançado. Se todos os registros forem excluídos a imagem de lista vazia volta a ser exibida.
 
Ao pé da página há:
- O botão para "chamar" a tela que permite um novo cadastro.
- Uma label de média, que, se a lista de registros estiver vazia exibe apenas o texto "Média", mas, caso a lista contenha registros exibirá "Média: " seguida do valor da média dos I.M.C. registrados.
- Uma barra que indica graficamente a classificação da média dos I.M.C. registrados. Na graduação deste gráfico pode-se ver em qual classificação a média do I.M.C. se encaixa e clicando sobre a sigla, uma janela explicativa sobre o valor indicado.
 
### Tela de cadastro
 
Nesta tela encontramos os campos para preenchimento, são apenas 2 campos, sendo:
- Peso: que deve ser informado em quilogramas, não podendo ser negativo.
- Altura: que deve ser informada em metros, deve ser maior que zero e é aceito o limite máximo de 4 metros.
 
O campo altura, já vem preenchido após o primeiro cadastro com a última altura informada, podendo ser atualizada.
 
Também temos o botão cancelar, que retorna à página inicial e o botão salvar que grava o registro.
 
Ao clicar em salvar, uma mensagem de sucesso é exibida.
 
### Tela de visualização
 
Nesta tela, é possível apenas visualizar os dados de um registro contando com os valores de peso e altura informados no dados registrados e também com a data e o I.M.C. do registro específico. Todos os dados apenas para leitura, não são permitidas edições neste caso.
 
Também são exibidos dois botões sendo um para exclusão do registro e retorno à listagem e outro apenas para retorno à lista de registros.
 
## 2. Dados do usuário
 
Nesta aplicação, os dados do usuário que são armazenados são: peso e altura informados, data dos registros, e I.M.C. calculado ao longo dos registros. Todos os dados ficam armazenados no dispositivo da pessoa usuária.
 
## 3. Checklist de implementação
 
- A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente? **Sim**
- A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes? **Sim**
- A aplicação armazena e usa de forma relevante dados complexos do usuário? **Sim**
- A aplicação possui um manifesto para instalação no dispositivo do usuário? **Sim**
- A aplicação possui um service worker que permite o funcionamento off-line? **Sim**
- O código da minha aplicação possui comentários explicando cada operação? **Sim**
- A aplicação está funcionando corretamente? **Sim**
- A aplicação está completa? **Sim**
 
## 4. Observação
 
- No wireframe, temos os campos para sexo e idade, ao pesquisar mais sobre o calculo de I.M.C. cheguei à conclusão de que estes campos possuem pouca relevancia no cálculo, e por isso foram removidos, deixando a interface ainda mai simples.

