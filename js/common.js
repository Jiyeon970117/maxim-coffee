
$(function(){
  $('header').load('inc.html header > nav',head);
  $('footer').load('inc.html footer > div');
});

function head(){
  const Head = document.querySelector('header')
  const navBar = document.querySelector('.navbar');
  const Menus = document.querySelectorAll('.navbar-menu li');
  const Cart = document.querySelector('.menu-count');
  const ProNum = JSON.parse(localStorage.getItem('cart'));
  const toggleBtn = document.querySelector('.navbar-toggle')
  const horizontalUnderLine = document.querySelector('#horizontal-underline');
  let $Count = 0;

  Menus.forEach( menu => menu.addEventListener('mousemove', (e) => Indicator(e)) );

  navBar.addEventListener('click', (e) => {
    if(e.target.closest('img') || e.target.closest('i') || e.target.closest('li').dataset == null){
      localStorage.removeItem('page')
    }else{
      const menu = e.target.closest('li').dataset.menu
      localStorage.setItem('page',JSON.stringify(menu))
    }
  })

  function Indicator(e){
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft  +  'px';
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + 'px' ;
    horizontalUnderLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
  }

  if(localStorage.getItem('page')){
    const num = JSON.parse(localStorage.getItem('page'))
    Menus[num].classList.add('active')
  }

  toggleBtn.addEventListener('click', () => {
    Head.classList.toggle('active')
  })

  //장바구니
  !ProNum ? Cart.innerText = `(${$Count})` : (
    $Count = ProNum.length, Cart.innerText = `(${$Count})`
  );
}

