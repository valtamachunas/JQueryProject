$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody") //o find busca, ele vai descendo a arvore de nós do html pra buscar 
    var usuario = $("#usuarios").val(); //pega o valor de um input
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha); //para add no html usa o append e ela sempre add no final do elemento e o prepend add no começo
    $(".placar").slideDown(500); //faz exibir o placar
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    },1000)

    
}

function novaLinha(usuario, numPalavras){ //criando uma linha nova no html
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
    event.preventDefault(); //para evitar de acontecer o comportamento padrao de subir pra cima pois a tag a ta com href sem link e ai vai automatico pra cima
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);//usado pra remover, a gente ta no a e quer remover o tr, entao sobre dois niveis de pai. O this é o proprio elemento ou seja .botao-remover
    setTimeout(function(){ // usado para remover a linha só apos 1segundo
        linha.remove();
    },1000);
    linha.remove();
}

function mostraPlacar(){
   // $(".placar").toggle(); mostra ou esconde um elemento
   $(".placar").stop().slideToggle(2000); // faz a transição devagar, vai aparecendo devagar o placar

}

function sincronizaPlacar(){
    var placar = [];
    var linhas =  $("tbody > tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(2)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = {  //obj criado para mandar para o servidor
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score); //coloca dentro do array
    });

    var dados ={   //salvou aqui para enviar por post 
        placar: placar
    };

  $.post("http://localhost:3000/placar", dados, function(){
      console.log("Salvou no servidor");
      $(".tooltip").tooltipster("open");
  }).always(function(){
      setTimeout(function(){
        $(".tooltip").tooltipster("close");
      },1200);
  });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){ //data é o que ele traz do servidor
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });

    });
}



/* o post é pra enviar dados para o servidor e o
get é para ler os dados do servidor, trazer eles

Quando fazemos uma requisição ajax de servidor para servidor
é ok, mas quando fazemos uma requisição pra um outro servidor 
ou seja pra uma outra maquina, da um erro, porque está em um 
host ou seja IP diferente, eles tem que ter a mesma origem,
a mesma porta, ou seja ex: locallhost:3000, pra dar certo
tem que ter o mesmo host, a mesma porta e o mesmo protocolo
()https ou http)*/
