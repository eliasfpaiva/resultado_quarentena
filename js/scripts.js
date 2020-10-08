// Classe para padronização do conteúdo de modal
class ConteudoModal {
    constructor(titulo, texto) {
        this.titulo = titulo;
        this.texto = texto;
    }
}

// Classe para padronização de dados I.M.C.
class IMC {

    constructor(peso, altura, sexo) {
        let data = new Date();
        // Armazenda a altura par facilitar novos lançamentos.
        localStorage.setItem('altura', new Number(altura));

        // Gera um ID a partir da data no momento do registro
        this.id = data.getTime();
        this.peso = new Number(peso);
        this.altura = new Number(altura);
        // Monta uma data no formato mais comum para exibição
        this.data = data.getDate() + '/' + ((data.getMonth() + 1).toString().padStart(2, '0')) + '/' + data.getFullYear();
        // Calcula e armazena o I.M.C.
        this.imc = new Number((new Number(this.peso) / (new Number(this.altura) * new Number(this.altura))).toFixed(2));
    }
}

// Deixa visível a página nescessária à interação que a pessoa deseja realizar
const mostrarPagina = (numeroPagina) => {
    // Esconde todas as páginas
    document.querySelectorAll('.pagina').forEach(
        (pagina) => { pagina.classList.add('hidden'); }
    );
    // Deixa visível a página desejada.
    document.getElementById('pagina' + numeroPagina).classList.remove('hidden');
}

// Bloqueia toda a tela para a exibição do modal
const mostrarModal = (conteudo) => {
    tituloModal.innerText = conteudo.titulo;
    textoModal.innerText = conteudo.texto;
    modal.parentElement.classList.remove('hidden');
}

// Remove o modal exibido da frente dos outros elementos de tela
const fecharmodal = () => {
    tituloModal.innerText = '';
    textoModal.innerText = '';
    modal.parentElement.classList.add('hidden');
}

// Realiza verificações pra validar os dados informados no formulário
const validarFormulario = () => {
    let msg = "";

    if (peso.value === "")
        msg += "O campo 'Peso' deve ser preenchido!\n";

    if (altura.value === "")
        msg += "O campo 'Altura' deve ser preenchido!\n";

    if (isNaN(new Number(peso.value))) {
        msg += "O campo 'Peso' deve ser numérico!\n";
    } else if (new Number(peso.value) < 0) {
        msg += "O campo 'Peso' deve ser positivo!\n";
    }

    if (isNaN(new Number(altura.value))) {
        msg += "O campo 'Altura' deve ser numérico!\n";
    } else if (new Number(altura.value) < 0) {
        msg += "O campo 'Altura' deve ser positivo!\n";
    } else if (new Number(altura.value) > 4) {
        msg += "A altura deve ser dada em metros.\nExemplo: 1,75.\nA Altura deve ser, no máximo, 4m.";
    }

    mostrarModal(new ConteudoModal('Preenchimento inválido', msg));

    return msg === "";
}

// Limpa os campos do formulário
const limparCampos = () => {
    peso.value = '';
    altura.value = '';
}

// Verifica a validação do formulário, se tudo estiver corretamente preenchido
// salva o conteúdo no localStorage e retorna à tela de listagem
const salvar = () => {
    if (validarFormulario()) {
        let _peso = peso.value;
        let _altura = altura.value;

        let _imc = new IMC(_peso, _altura);

        localStorage.setItem(_imc.id, JSON.stringify(_imc));

        limparCampos();
        mostrarModal(new ConteudoModal('Sucesso!', 'Dados salvos!'));
        mostrarPagina(1);
        carregaLista();
    }
}

// Remove um registro específico do localStorage
const excluirIMC = (event) => {
    let itemExcluido = event.target.parentElement;
    localStorage.removeItem(itemExcluido.getAttribute('data-id'));

    if (localStorage.length === 1) {
        localStorage.clear();
    }

    carregaLista();
}

// Monta um ítem da lista de I.M.C. na tela
// carregandos os dados fornecidos em cada elemento inserido
// criando cada elemento de tela conforme necessário
const montaListaItem = (imc) => {
    let li = document.createElement('li');
    li.setAttribute('data-id', imc.id);
    li.classList.add('listaitem');

    let spanIMC = document.createElement('span');
    spanIMC.innerText = imc.imc.toFixed(2);
    spanIMC.addEventListener('click', exibirItemIMC);
    li.appendChild(spanIMC);

    let spanData = document.createElement('span');
    spanData.innerText = imc.data;
    spanData.addEventListener('click', exibirItemIMC);
    li.appendChild(spanData);

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('perigo');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', excluirIMC);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
}

// Monta o cabeçalho da lista de I.M.C.
// criando cada elemento de tela conforme necessário
const montaCabecalho = () => {
    lista.textContent = '';

    let li = document.createElement('li');
    li.classList.add('listaheader');

    let spanIMC = document.createElement('span');
    spanIMC.innerText = 'I.M.C.';
    li.appendChild(spanIMC);

    let spanData = document.createElement('span');
    spanData.innerText = 'Data';
    li.appendChild(spanData);

    let colunaExcluir = document.createElement('span');
    li.appendChild(colunaExcluir);

    lista.appendChild(li);
}

// Percorre a lista de I.M.C. registrados
// incluindo cada item da lista com seus respectivos dados
// caso a lista esteja vazia ocunta o elemento de lista da página
// e exibe a imagem com mensagem de lista vazia
// atualiza o valor do gráfico conforme dados da lista de I.M.C.
const carregaLista = () => {
    let listaImc = listarIMCs();

    if (listaImc.length > 0) {

        lista.classList.remove('hidden');
        listavazia.classList.add('hidden');
        montaCabecalho();

        listaImc.forEach((imc) => { montaListaItem(imc); });

        media.textContent = ('Média: ' + calcularMedia().toFixed(2));
    } else {
        lista.classList.add('hidden');
        listavazia.classList.remove('hidden');
        media.textContent = 'Média';
    }

    calcularValorGrafico();
}

// Carrega os dados de um registro de I.M.C. selecionado
// e exibe a página de visualização com estas informações
const exibirItemIMC = (event) => {
    let itemEscolhido = event.target.parentElement;
    let data_id = itemEscolhido.getAttribute('data-id');
    let imcEscolhido = localStorage.getItem(data_id);
    let imcCarregado = JSON.parse(imcEscolhido);

    valorpeso.value = imcCarregado.peso.toFixed(2);
    valoraltura.value = imcCarregado.altura.toFixed(2);
    valordata.textContent = imcCarregado.data;
    valorimc.textContent = imcCarregado.imc.toFixed(2);

    btn_excluir.parentElement.setAttribute('data-id', data_id);

    mostrarPagina(3);
}

// Percorre os registros presentes no localStorage
// monta uma lista de objetos IMC com do dados de I.M.C.
// encontrados e retorna a lista
const listarIMCs = () => {
    let listaImc = [];

    let chaves = Object.keys(localStorage).sort();

    for (i = 0; i < chaves.length; i++) {
        if (chaves[i] !== "altura")
            listaImc.push(JSON.parse(localStorage.getItem(chaves[i])));
    }
    return listaImc;
}

// Percorre a lista de I.M.C. e calcula e retorn
// a média do valor dos registros encontrados
const calcularMedia = () => {
    let soma = 0;

    let listaImc = listarIMCs();

    if (listaImc.length == 0) return 0;

    listaImc.forEach((imc) => { soma += imc.imc; });

    return (new Number(soma / listaImc.length));
}

// Insere função que exibe modal informativo para cada
// um dos itens da escala de classificação de I.M.C.
const inserirChamadasModalGraduacao = () => {
    let escalas = graduacao.children;
    escalas[0].addEventListener('click', () => { mostrarModal(new ConteudoModal('Muito abaixo do peso', 'Abaixo de 17')) });
    escalas[1].addEventListener('click', () => { mostrarModal(new ConteudoModal('Abaixo do peso', 'Entre 17 e 18,49')) });
    escalas[2].addEventListener('click', () => { mostrarModal(new ConteudoModal('Peso normal', 'Entre 18,50 e 24,99')) });
    escalas[3].addEventListener('click', () => { mostrarModal(new ConteudoModal('Acima do peso', 'Entre 25 e 29,99')) });
    escalas[4].addEventListener('click', () => { mostrarModal(new ConteudoModal('Obesidade I', 'Entre 30 e 34,99')) });
    escalas[5].addEventListener('click', () => { mostrarModal(new ConteudoModal('Obesidade II (Severa)', 'Entre 35 e 39,99')) });
    escalas[6].addEventListener('click', () => { mostrarModal(new ConteudoModal('Obesidade III (Mórbida)', '40 ou mais')) });
}

// Calcula o valor que o gráfico deve indicar
// apesar das faixas possuírem laguras diferentes,
// o gráfico trata todas com a mesma largura para visualização
// respeitando os valores correspondentes.
const calcularValorGrafico = () => {
    document.querySelectorAll('.graduacao> div').forEach((div) => {
        div.style.background = 'none';
        div.style.color = 'white'
    });

    let media = calcularMedia();

    if (media === 0)
        grafico.removeAttribute('value');
    else {
        let cor = 0;
        let numeroFaixa = 0;

        if (media >= 40) {
            grafico.value = 100;
            cor = 'red';
            numeroFaixa = 6;
        } else {
            let baseFaixa = 0;
            let larguraFaixa = 0;
            let larguraColuna = 100 / 7;

            if (media >= 35) {
                baseFaixa = 35;
                larguraFaixa = 39.99 - baseFaixa;
                numeroFaixa = 5;
                cor = 'orange';
            } else if (media >= 30) {
                baseFaixa = 30;
                larguraFaixa = 34.99 - baseFaixa;
                numeroFaixa = 4;
                cor = 'orange';
            } else if (media >= 25) {
                baseFaixa = 25;
                larguraFaixa = 29.99 - baseFaixa;
                numeroFaixa = 3;
                cor = 'yellow';
            } else if (media >= 18.50) {
                baseFaixa = 18.50;
                larguraFaixa = 24.99 - baseFaixa;
                numeroFaixa = 2;
                cor = 'lightblue';
            } else if (media >= 17) {
                baseFaixa = 17;
                larguraFaixa = 18.49 - baseFaixa;
                numeroFaixa = 1;
                cor = 'lightgreen';
            } else {
                larguraFaixa = 17;
                numeroFaixa = 0;
                cor = 'limegreen';
            }

            let valorIncremento = media - baseFaixa;
            let preenchimentoIncremento = ((valorIncremento / larguraFaixa) * larguraColuna);
            grafico.value = ((numeroFaixa * larguraColuna) + preenchimentoIncremento);
        }

        document.querySelector('.graduacao').children[numeroFaixa].style.background = '#4f6d7f';
        document.querySelector('.graduacao').children[numeroFaixa].style.color = cor;
    }
}

// Insere funções principais, ao carregar a aplicação
// e executa chamadas para inicialização do sistema.
onload = () => {
    nome.onclick = () => { mostrarPagina(4); }
    btn_novoimc.onclick = () => {
        mostrarPagina(2);
        altura.value = localStorage.getItem('altura');
    }
    btn_cancelar.onclick = () => {
        limparCampos();
        mostrarPagina(1);
    }
    btn_voltar.onclick = () => { mostrarPagina(1); }
    btn_voltar2.onclick = () => { mostrarPagina(1); }
    btn_salvar.onclick = () => { salvar(); }
    btn_voltarmodal.onclick = () => { fecharmodal(); }
    btn_excluir.addEventListener('click', (event) => {
        excluirIMC(event);
        mostrarPagina(1);
    });

    inserirChamadasModalGraduacao();
    carregaLista();
}

// Registro do service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./serviceworker.js');
}