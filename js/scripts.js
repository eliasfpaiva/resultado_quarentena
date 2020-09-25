class ConteudoModal {
    constructor(titulo, texto) {
        this.titulo = titulo;
        this.texto = texto;
    }
}

class IMC {

    constructor(peso, altura, sexo) {
        let data = new Date();
        localStorage.setItem('sexo', sexo);
        localStorage.setItem('altura', altura);

        this.id = data.getTime();
        this.peso = new Number(peso);
        this.altura = new Number(altura);
        this.data = data.getDate() + '/' + ((data.getMonth() + 1).toString().padStart(2, '0')) + '/' + data.getFullYear();
        this.sexo = sexo;
        this.imc = (this.peso / (this.altura * this.altura)).toFixed(2);
    }
}

const MODAL_DADOS_SALVOS = new ConteudoModal('Sucesso!', 'Dados salvos!');

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

    if (document.querySelector('input[name="sexo"]:checked') === null)
        msg += "É necessário selecionar o sexo!\n";

    mostrarModal(new ConteudoModal('Campos em branco', msg));

    return msg === "";
}

const limparCampos = () => {
    peso.value = '';
    altura.value = '';

    if (localStorage.getItem('sexo')) {
        document.querySelector('input[name="sexo"]:checked').checked = false;
    }
}

const salvar = () => {
    if (validarFormulario()) {
        let _peso = peso.value;
        let _altura = altura.value;
        let _sexo = document.querySelector('input[name="sexo"]:checked').value;

        let _imc = new IMC(_peso, _altura, _sexo);

        localStorage.setItem(_imc.id, JSON.stringify(_imc));

        limparCampos();
        mostrarModal(MODAL_DADOS_SALVOS);
        mostrarPagina(1);
        carregaLista();
    }
}

const excluirIMC = (event) => {
    let itemExcluido = event.target.parentElement;
    localStorage.removeItem(itemExcluido.getAttribute('data-id'));

    if (localStorage.length === 2) {
        localStorage.clear();
    }

    carregaLista();
}

const montaListaItem = (imc) => {
    let li = document.createElement('li');
    li.setAttribute('data-id', imc.id);
    li.classList.add('listaitem');

    let spanIMC = document.createElement('span');
    spanIMC.innerText = imc.imc;
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
    let listaImc = [];

    let chaves = Object.keys(localStorage).sort();

    if (chaves.length > 2) {

        lista.classList.remove('hidden');
        listavazia.classList.add('hidden');

        for (i = 0; i < chaves.length; i++) {
            if (chaves[i] !== "altura" && chaves[i] !== "sexo")
                listaImc.push(JSON.parse(localStorage.getItem(chaves[i])));
        }

        listaImc.forEach((imc) => { montaListaItem(imc); });
    } else {
        lista.classList.add('hidden');
        listavazia.classList.remove('hidden');
    }
}

const exibirItemIMC = (event) => {
    let itemEscolhido = event.target.parentElement;
    let imcEscolhido = localStorage.getItem(itemEscolhido.getAttribute('data-id'));
    let imcCarregado = JSON.parse(imcEscolhido);

    valorpeso.value = imcCarregado.peso;
    valoraltura.value = imcCarregado.altura;
    valordata.textContent = imcCarregado.data;
    valorimc.textContent = imcCarregado.imc;

    document.querySelector('#valorsexo' + imcCarregado.sexo).checked = true;

    mostrarPagina(3);
}

onload = () => {
    btn_novoimc.onclick = () => {
        mostrarPagina(2);
        if (localStorage.getItem('sexo')) {
            document.querySelector('#sexo' + localStorage.getItem('sexo')).checked = true;
            altura.value = localStorage.getItem('altura');
        }
    }
    btn_cancelar.onclick = () => {
        limparCampos();
        mostrarPagina(1);
    }
    btn_voltar.onclick = () => { mostrarPagina(1); }
    btn_salvar.onclick = () => { salvar(); }
    btn_voltarmodal.onclick = () => { fecharmodal(); }

    carregaLista();
}