$(function(){ //isso é um plugin do jquery para ficar em modo carrosel a pg. Tem que ser importado na index
    $(".slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});
    });