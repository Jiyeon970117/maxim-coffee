'use strict';

const Word = document.querySelector('#word');
let $newWord;
let Cart = [];
function init(){


  function loadItems(){
    return fetch('js/data.json')
          .then( (res) => res.json() )
          .then( (json) => json.list );
  }

  function createItem(list){
    const Lists = document.querySelector('.prd-list');
    Lists.innerHTML = list.map( (item, i) => createHtmlString(item, i)).join('');
  }


  function createHtmlString(item, i){
    return `            
          <li class="${i}">
            <figure>
              <img src=${item.img}>
              <p>
                <span class="heart-icon">
                  <i class="far fa-heart ${item.number}"></i>
                </span>
                <span>
                  <i class="fas fa-shopping-cart"></i>
                </span>
              </p>
              <div class="name-title">
                <span> ${item.name}</span>
                <strong> ${item.price} </strong>
                <span>
                  ${item.info}
                </span>
              </div>
            </figure>
          </li>
          `;
  }
  
  // <i class="fa-solid fa-heart"></i>
  // <i class="far fa-heart "></i>


  //banner 바꾸기
  function WordChange(value){
    let $Word = value;
    Word.textContent = $Word;
  }

  //category 클릭
  function onBtnClick(e,list){
    const dataset = e.target.dataset;
    const key  = dataset.key;
    const value = dataset.value;

    if( key == null || value == null){
      return
    }
    // createItem( list.filter((item) => item[key] === value))
    UpdateItem(list,key,value)
  }

  //category update
  function UpdateItem(list,key,value){
    const PrdList = document.querySelectorAll('.prd-list li');
    list.forEach( (item, index) => {
      // console.log(item)
      if(item[key] === value){
        PrdList[index].classList.remove('invisible')
        WordChange(value)
      }else{
        PrdList[index].classList.add('invisible')
      }
    });
  }


  //localstorage-setItem
  function setLocalsStorage(){
    localStorage.setItem('list', JSON.stringify(Cart))
  }

  // localstorage-getItem
  const savedCart = localStorage.getItem('list');

  //JSON.parse
  if(savedCart !== null){
    const ParsedCart = JSON.parse(savedCart);
    // console.log(ParsedCart)
    // ParsedCart.forEach(Basket)
  }


  let $Count = 0;

  //CountUp함수
  function CountUp(){
    const menuCount = document.querySelector('.menu-count');
    $Count ++;
    menuCount.innerText = `(${$Count})`;
  }

  //CountDown함수
  function CountDown(){
    const menuCount = document.querySelector('.menu-count');
    $Count --;
    menuCount.innerText = `(${$Count})`;
  }

  //위시리스트
  function Wishlist(e,){
    const FIcon = e.target.closest('i')
    const List = e.target.parentNode.closest('li').className;
    Cart.push(List)
    setLocalsStorage()
    // Basket()
    if(FIcon == null){
      return
    }else if(FIcon.classList.contains('far')){
      FIcon.classList.replace('far', 'fas');
      CountUp()
      alert('장바구니에 추가됐습니다.')
      return
    }
    confirm('취소하시겠습니까?') ? 
    ( CountDown(), FIcon.classList.replace('fas', 'far') ) 
    : FIcon.classList.replace('far', 'fas') ;     
  }

  function setEventListeners(list){
    const MenuBtns = document.querySelector('.menucategory');
    const Lists = document.querySelector('.prd-list');
    MenuBtns.addEventListener('click', (e) => onBtnClick(e, list));
    Lists.addEventListener('click', (e) => Wishlist(e, list));
  }

  


  loadItems()
  .then( (list) => {
    createItem(list)
    setEventListeners(list)
  })
  .catch(console.log);


}
window.onload = init;

  // function Basket(e, List, FIcon){
  //   if(FIcon == null){
  //     return
  //   }else if(FIcon.classList.contains('far')){
  //     FIcon.setAttribute('class', 'fas fa-heart');
  //     CountUp()
  //     alert('장바구니에 추가됐습니다.')
  //     return
  //   }
  //   confirm('취소하시겠습니까?') ? 
  //   ( CountDown(), FIcon.setAttribute('class', 'far fa-heart') ) 
  //   : FIcon.setAttribute('class', 'fas fa-heart') ;     
  // }
