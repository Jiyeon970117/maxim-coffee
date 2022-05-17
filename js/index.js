'use strict';

function init(){
  const textBox = document.querySelector('.in-1');
  const content = document.querySelector('.content3');

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


  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    value > content.offsetTop - 300 ? textBox.style.animation = 'slide 1s ease-out': textBox.style.animation = 'invisible 1s ease-out forwards';
  });

  console.log('여긴 index')
}
// window.onload = init;
window.addEventListener('DOMContentLoaded',init);