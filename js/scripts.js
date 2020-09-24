class ConteudoModal {
    constructor(titulo, texto) {
        this.titulo = titulo;
        this.texto = texto;
    }
}

class IMC {

    constructor(peso, altura, sexo) {
        let data = new Date();
        this.id = data.getTime();
        this.peso = peso;
        this.altura = altura;
        this.data = data.getDate() + '/' + ((data.getMonth() + 1).toString().padStart(2, '0')) + data.getFullYear();
        this.imc = this.peso / (this.altura * this.altura);

        localStorage.setItem('sexo', sexo);
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

const salvar = () => {
    mostrarModal(MODAL_DADOS_SALVOS);
    mostrarPagina(1);
}

onload = () => {
    btn_novoimc.onclick = () => { mostrarPagina(2); }
    btn_cancelar.onclick = () => { mostrarPagina(1); }
    btn_voltar.onclick = () => { mostrarPagina(1); }
    btn_salvar.onclick = () => { salvar(); }
    btn_voltarmodal.onclick = () => { fecharmodal(); }
}