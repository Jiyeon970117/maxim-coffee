
$(function(){
  $('header').load('inc.html header > nav',head);
  // $('footer').load('inc.html footer > div');
});

function head(){
  const Menus = document.querySelectorAll('.navbar-menu li');
  let horizontalUnderLine = document.querySelector('#horizontal-underline');
  Menus.forEach(
    (menu) => menu.addEventListener('mousemove', (e) => Indicator(e))
  );
  function Indicator(e){
    horizontalUnderLine.style.left = e.currentTarget.offsetLeft + 'px';
    horizontalUnderLine.style.width = e.currentTarget.offsetWidth + 'px';
    horizontalUnderLine.style.top = e.currentTarget.offsetHeight + -5 + 'px';
  }
}

