'use strict';

const textBox = document.querySelector('.in-1')
function init(){
  const Logo = document.querySelector('.main-logo')

  $('.main-img').slick({
    dots: true,
    arrows:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
    fade:true,
    cssEase:'linear',
  });

  Logo.setAttribute('src', './img/main-logo2.png');

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    // console.log(value)
    value > 3000 ? textBox.style.animation = 'invisible 1s ease-out forwards' : textBox.style.animation = 'slide 1s ease-out';
  });


}
window.onload = init;