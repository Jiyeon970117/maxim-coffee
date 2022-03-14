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
  // window.innerWidth > 668 ? Logo.setAttribute('src', './img/main-logo2.png') : '';

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    value > 3400 ? textBox.style.animation = 'slide 1s ease-out': textBox.style.animation = 'invisible 1s ease-out forwards'
  });


}
window.onload = init;