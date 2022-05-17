'use strict';
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

function init(){
  const Tabs = document.querySelector('.detail-tab');
  function TabBtn(e){
    const Btn = Tabs.querySelectorAll('li');
    const TabContent = document.querySelectorAll('.tab-container > div')
    TabContent.forEach( (item, i) => {
      item.dataset.arrow === e.target.dataset.btn 
      ? ( 
        item.classList.add('active'),
        Btn[i].classList.add('active')
        )
      : (
        item.classList.remove('active'),
        Btn[i].classList.remove('active')
        );
    })
  }

  Tabs.addEventListener('click', (e) => TabBtn(e));

}
window.addEventListener('DOMContentLoaded',init);
