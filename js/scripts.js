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
        this.peso = peso;
        this.altura = altura;
        this.data = data.getDate() + '/' + ((data.getMonth() + 1).toString().padStart(2, '0')) + '/' + data.getFullYear();
        this.imc = this.peso / (this.altura * this.altura);
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
    document.querySelector('input[name="sexo"]:checked').checked = false;
}

const salvar = () => {
    if (validarFormulario()) {
        let _peso = new Number(peso.value);
        let _altura = new Number(altura.value);
        let _sexo = document.querySelector('input[name="sexo"]:checked').value;

        let _imc = new IMC(_peso, _altura, _sexo);

        localStorage.setItem(_imc.id, JSON.stringify(_imc));

        limparCampos();
        mostrarModal(MODAL_DADOS_SALVOS);
        mostrarPagina(1);
    }
}

{
    /* <li class="listaitem">
    <span>20.5</span>
    <span>01/03/2020</span>
    <button class="perigo">Excluir</button>
    </li> */
}

const montaListaItem = (imc) => {
    let li = document.createElement('li');
    li.setAttribute('data-id', imc.id);
    li.classList.add('listaitem');

    let spanPeso = document.createElement('span');
    spanPeso.innerText = imc.peso;
    li.appendChild(spanPeso);

    let spanData = document.createElement('span');
    spanData.innerText = imc.data;
    li.appendChild(spanData);

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('perigo');
    btnExcluir.textContent = 'Excluir';
    li.appendChild(btnExcluir);

    lista.appendChild(li);
}

const carregaLista = () => {
    let listaImc = [];

    let chaves = Object.keys(localStorage);

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

onload = () => {
    btn_novoimc.onclick = () => { mostrarPagina(2); }
    btn_cancelar.onclick = () => { mostrarPagina(1); }
    btn_voltar.onclick = () => { mostrarPagina(1); }
    btn_salvar.onclick = () => { salvar(); }
    btn_voltarmodal.onclick = () => { fecharmodal(); }
}