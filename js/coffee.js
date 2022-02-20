'use strict';

const Word = document.querySelector('#word');
const $Body = document.querySelector('body');
const $Popup = document.querySelector('.popup');
let $newWord;
let Cart = [];

import PopupHtmlString from "./popupcreate.js";

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
          <li class="${i + 1}">
            <figure>
              <img src=${item.img[0]}>
              <p>
                <span class="heart-icon">
                  <i data-icon="${i + 1}"  class="far fa-heart heart ${i + 1}"></i>
                </span>
                <span class="cart">
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
  function Wishlist(e){
    const FIcon = e.target.parentNode.closest('span');
    const List = e.target.closest('i');
    const ListId = e.target.closest('i').dataset.icon;
    console.log(ListId)
    if( FIcon == null){ return }
    if(List.classList.contains('far')){
      alert('장바구니에 추가됐습니다.')
      List.classList.replace('far', 'fas');
      Cart.push({ heart : List.className})
      // Cart.push({ heart : List.className})
      console.log(Cart["heart"])
      setLocalsStorage()
      CountUp()
      return
    }
    if(confirm('취소하시겠습니까?') ){
      CountDown()
      List.classList.replace('fas', 'far')
      if(ListId === List.dataset.icon){ 
        Cart.splice(List.className, 1)
        setLocalsStorage()
        console.log(Cart)
      }
      // setLocalsStorage()
    }
    else{
      List.classList.replace('far', 'fas')
    }

    // // const List = e.target.parentNode.closest('li').className;
    // if(FIcon == null){
    //   return
    // }else if(FIcon.classList.contains('far')){
    //   FIcon.classList.replace('far', 'fas');
    //   CountUp()
    //   alert('장바구니에 추가됐습니다.')
    //   return
    // }
    // confirm('취소하시겠습니까?') ? 
    // ( CountDown(), FIcon.classList.replace('fas', 'far') ) 
    // : FIcon.classList.replace('far', 'fas') ;     
  }



  //Close
  function Close(){
    $Popup.style = 'display: none';
    $Body.style = 'overflow: visible';
  }

  //Detail
  function Detail(e){
    const $Detail = document.querySelector('.detail img')
    let ImgBtn = e.target.getAttribute('src')
    $Detail.setAttribute('src', ImgBtn)
  }


  //Popup
  function Popup(e, list){
    const $Li = e.target.closest('li').className;
    const $MOdal = document.querySelector('.modal');
    $MOdal.innerHTML = PopupHtmlString( list.find( (item) => item.number === $Li));
    $Popup.style = 'display: flex; position: fixed';
    $Body.style = 'overflow: hidden';
    Detail(e, list)
  }

  $Popup.addEventListener( 'click', (e) => e.target.closest('img') ? Detail(e) :  Close() )


  function setEventListeners(list){
    const MenuBtns = document.querySelector('.menucategory');
    const Lists = document.querySelector('.prd-list');
    MenuBtns.addEventListener('click', (e) => onBtnClick(e, list));
    Lists.addEventListener('click', (e) => {
      e.target.closest('img') ? Popup(e, list): Wishlist(e, list);
    });
  }
  


  loadItems()
  .then( (list) => {
    createItem(list)
    setEventListeners(list)
    // heartChange()
  })
  .catch(console.log);


}
window.onload = init;