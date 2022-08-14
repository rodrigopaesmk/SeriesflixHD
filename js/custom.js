
/// Slide de imagens

$('.owl-carousel').owlCarousel({
   loop:true,
   margin:10,
   nav:true,
   responsive:{
       0:{
           items:2
       },
       600:{
           items:3
       },
       1000:{
           items:6
       }
   }
})

$(document).ready(function(){
   $('.owl-carousel').owlCarousel();

})

// modal
$('.act-modal').on('click', function(){
    $('.box-modal').addClass('active');
});

$('.close-modal').on('click', function(){
    $('.box-modal').removeClass('active');
})
