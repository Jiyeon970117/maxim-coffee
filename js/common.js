
const conLoad = () => {
  

  $(function(){
    $('header').load('inc.html header > nav',head);
    $('footer').load('inc.html footer > div');
  });
  
  function head(){
    const Head = document.querySelector('header');
    const Menus = document.querySelectorAll('.navbar-menu li');
    const Cart = document.querySelector('.menu-count');
    const ProNum = JSON.parse(localStorage.getItem('cart'));
    const toggleBtn = document.querySelector('.navbar-toggle');
    const horizontalUnderLine = document.querySelector('#horizontal-underline');
    let $Count = 0;
  
    Menus.forEach( menu => menu.addEventListener('mousemove', (e) => Indicator(e)) );
    const Indicator = (e) => {
      horizontalUnderLine.style.left = e.currentTarget.offsetLeft  +  'px';
      horizontalUnderLine.style.width = e.currentTarget.offsetWidth + 'px' ;
      horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
    };

    toggleBtn.addEventListener('click', () => Head.classList.toggle('active') );
  
    //장바구니
    !ProNum ? Cart.innerText = `(${$Count})` : (
      $Count = ProNum.length, Cart.innerText = `(${$Count})`
    );
  };

  window.addEventListener('load', () => setTimeout( () => scrollTo(0, 0), 100));
}
window.addEventListener("DOMContentLoaded", conLoad);
