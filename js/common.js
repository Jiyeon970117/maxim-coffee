
$(function(){
  $('header').load('inc.html header > nav',head);
  // $('footer').load('inc.html footer > div');
});

function head(){
  const Menus = document.querySelectorAll('.navbar-menu li');
  const Cart = document.querySelector('.menu-count');
  const ProNum = JSON.parse(localStorage.getItem('cart'));
  let $Count = 0;
  
  let horizontalUnderLine = document.querySelector('#horizontal-underline');
  Menus.forEach(
    (menu) => menu.addEventListener('mousemove', (e) => Indicator(e))
  );
  function Indicator(e){
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + 'px';
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + 'px';
    horizontalUnderLine.style.top = e.currentTarget.offsetHeight + -5 + 'px';
  }
  //장바구니 갯수
  !ProNum ? Cart.innerText = `(${$Count})` : (
    $Count = ProNum.length, Cart.innerText = `(${$Count})`
  );
}

