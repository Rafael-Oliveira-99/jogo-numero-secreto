let listaNumerosSorteado = [];
let numeroLimite = 50;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;

function exibirTextoTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 2.0;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function mensagemInicial() {
    exibirTextoTela("h1", "Jogo do número secreto!");
    exibirTextoTela("p", "Escolha um número entre 1 e 50");
    exibirTextoTela("p", "Escolha um número entre 1 e 20");
}
mensagemInicial();

function reiniciar() {
    numeroSecreto = numeroAleatorio();
    limparTela();
    tentativas = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoTela("h1", "Parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativa}.`;
        exibirTextoTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute < numeroSecreto) {
            exibirTextoTela("p", "O número secreto é maior.");
        } else {
            exibirTextoTela("p", "O número secreto é menor.");
        }
        tentativas++;
        limparTela();
    }
}

function limparTela() {
    chute = document.querySelector("input");
    chute.value = "";
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista = listaNumerosSorteado.length;

    if (qtdElementosLista == numeroLimite) {
        listaNumerosSorteado = [];
    }

    if (listaNumerosSorteado.includes(numeroEscolhido)) {
        return numeroAleatorio();
    } else {
        listaNumerosSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
