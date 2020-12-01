var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){ //função do jquery que quando tiver carregado todo o html da sua pagina voce vai executar o que esta aqui dentro
    console.log("carregado");
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);//quando é mais comum tipo o click, da pra fazer uma short ou seja atalho pra escrever menos
    inicializaMarcadores();
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });
    $('.tooltip').tooltipster({
        trigger: "custom"
    });
});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() {
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length; //quebra as palavras nos espaços e transforma em um array e mostra o tamanho ou seja quantas tem
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras); //text() pega o valor ou atribui valor, se passa sem parametro nenhum ela pega se passa com parametro ela atribui
}

function inicializaContadores(){ //inicializa os contadores, fica escutando
campo.on("input", function(){ //evento de input é quando voce tiver colocando dados no campo voce executa essa funçao abaixo 
    var conteudo = campo.val(); //abreviação de valor val

    var qtdPalavras = conteudo.split(/\S+/).length -1; //expressão regular pra ficar mais exato, S+ tira os espaços vazios
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);
});
}

function inicializaCronometro(){ //relacionada ao tempo, inicializa o contador
var tempoRestante = $("#tempo-digitacao").text();
campo.one("focus", function(){ //a função .on funciona quantas vezes o usuario realizar o evento, a .one funciona apenas uma vez
    
    var cronometroID = setInterval(function(){ //executa uma ação de tanto em tanto tempo, recebe 2 parametros
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
         if(tempoRestante < 1){
            clearInterval(cronometroID); //seria o retorno da função setInterval             
            finalizaJogo();
        }
    
    },1000);
});
}

function finalizaJogo(){
    campo.attr("disabled", true); //attr é para modificar um atributo de uma tag, funciona igual a text e val, pega o valor ou altera ele atraves recebendo um parametro
    campo.toggleClass("campo-desativado"); //adiciona essa classe no css entao quando acabar o tempo fica cinza, pra remover usa o toggleClass tbm
    inserePlacar();
}

function inicializaMarcadores(){
campo.on("input", function(){
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0,digitado.length);//substr pega um pedaço da sua frase 
    if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    }else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

