$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria) //mandar uma requisao pra esse endereço e quando ele retornar ele executa alguma coisa com o resultado retornado
    .fail(function(){ //pra caso der errado executa o que ta aqui 
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        },2000);
    })
    .always(function(){ //sempre escondendo o spinner
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto); //data retorna o get 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = { id: fraseId }; //manda esse obj junto com a requisição e depois executamos a função abaixo com esse dado recebido

    $.get("http://localhost:3000/frases", dados, trocaFrase) //manda os dados e quando a função retornar executa a troca frase
    .fail(function){
    $("#erro").toggle();
    setTimeout(function(){
        $("#erro").toggle();
    },1500);
})
.always(function(){
    $("#spinner").toggle();
});
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}



















// vamos rotear um servidor em nossa maquina para que tenha algumas frases pronta
// vamos fazer uma requisição atraves do ajax para buscar a frase em seu servidor e trazer de volta para aparecer na tela
// nossas frases vao ficar guardada no nosso backend e sendo carregadas pelo nosso servidor