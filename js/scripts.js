class ConteudoModal {
    constructor(titulo, texto) {
        this.titulo = titulo;
        this.texto = texto;
    }
}

class IMC {

    constructor(peso, altura, sexo) {
        let data = new Date();
        // localStorage.setItem('sexo', sexo);
        localStorage.setItem('altura', new Number(altura));

        this.id = data.getTime();
        this.peso = new Number(peso);
        this.altura = new Number(altura);
        this.data = data.getDate() + '/' + ((data.getMonth() + 1).toString().padStart(2, '0')) + '/' + data.getFullYear();
        // this.sexo = sexo;
        this.imc = new Number((new Number(this.peso) / (new Number(this.altura) * new Number(this.altura))).toFixed(2));
    }
}

const mostrarPagina = (numeroPagina) => {
    document.querySelectorAll('.pagina').forEach(
        (pagina) => { pagina.classList.add('hidden'); }
    );
    document.getElementById('pagina' + numeroPagina).classList.remove('hidden');
}

const mostrarModal = (conteudo) => {
    tituloModal.innerText = conteudo.titulo;
    textoModal.innerText = conteudo.texto;
    modal.parentElement.classList.remove('hidden');
}

const fecharmodal = () => {
    tituloModal.innerText = '';
    textoModal.innerText = '';
    modal.parentElement.classList.add('hidden');
}

const validarFormulario = () => {
    let msg = "";

    if (peso.value === "")
        msg += "O campo 'Peso' deve ser preenchido!\n";

    if (altura.value === "")
        msg += "O campo 'Altura' deve ser preenchido!\n";

    // if (document.querySelector('input[name="sexo"]:checked') === null)
    //     msg += "É necessário selecionar o sexo!\n";

    mostrarModal(new ConteudoModal('Campos em branco', msg));

    return msg === "";
}

const limparCampos = () => {
    peso.value = '';
    altura.value = '';

    // if (localStorage.getItem('sexo')) {
    //     document.querySelector('input[name="sexo"]:checked').checked = false;
    // }
}

const salvar = () => {
    if (validarFormulario()) {
        let _peso = peso.value;
        let _altura = altura.value;
        // let _sexo = document.querySelector('input[name="sexo"]:checked').value;

        let _imc = new IMC(_peso, _altura) //, _sexo);

        localStorage.setItem(_imc.id, JSON.stringify(_imc));

        limparCampos();
        mostrarModal(new ConteudoModal('Sucesso!', 'Dados salvos!'));
        mostrarPagina(1);
        carregaLista();
    }
}

const excluirIMC = (event) => {
    let itemExcluido = event.target.parentElement;
    localStorage.removeItem(itemExcluido.getAttribute('data-id'));

    if (localStorage.length === 1) {
        localStorage.clear();
    }

    carregaLista();
}

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

const carregaLista = () => {
    montaCabecalho();
    let listaImc = listarIMCs();

    if (listaImc.length > 0) {

        lista.classList.remove('hidden');
        listavazia.classList.add('hidden');

        listaImc.forEach((imc) => { montaListaItem(imc); });

        media.textContent = ('Média: ' + calcularMedia().toFixed(2));
    } else {
        lista.classList.add('hidden');
        listavazia.classList.remove('hidden');
        media.textContent = 'Média';
    }

    calcularValorGrafico();
}

const exibirItemIMC = (event) => {
    let itemEscolhido = event.target.parentElement;
    let imcEscolhido = localStorage.getItem(itemEscolhido.getAttribute('data-id'));
    let imcCarregado = JSON.parse(imcEscolhido);

    valorpeso.value = imcCarregado.peso.toFixed(2);
    valoraltura.value = imcCarregado.altura.toFixed(2);
    valordata.textContent = imcCarregado.data;
    valorimc.textContent = imcCarregado.imc.toFixed(2);

    // document.querySelector('#valorsexo' + imcCarregado.sexo).checked = true;

    mostrarPagina(3);
}

const listarIMCs = () => {
    let listaImc = [];

    let chaves = Object.keys(localStorage).sort();

    for (i = 0; i < chaves.length; i++) {
        if (chaves[i] !== "altura")
            listaImc.push(JSON.parse(localStorage.getItem(chaves[i])));
    }
    return listaImc;
}

const calcularMedia = () => {
    let soma = 0;

    let listaImc = listarIMCs();

    if (listaImc.length == 0) return 0;

    listaImc.forEach((imc) => { soma += imc.imc; });

    return (new Number(soma / listaImc.length));
}

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

onload = () => {
    btn_novoimc.onclick = () => {
        mostrarPagina(2);
        altura.value = localStorage.getItem('altura');
    }
    btn_cancelar.onclick = () => {
        limparCampos();
        mostrarPagina(1);
    }
    btn_voltar.onclick = () => { mostrarPagina(1); }
    btn_salvar.onclick = () => { salvar(); }
    btn_voltarmodal.onclick = () => { fecharmodal(); }

    inserirChamadasModalGraduacao();
    carregaLista();
}