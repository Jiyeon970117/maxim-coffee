'use strict';

const Word = document.querySelector('#word');
const $Body = document.querySelector('body');
const $Popup = document.querySelector('.popup');
const $Close = document.querySelector('.close')
let $newWord;
let listBox = [];
let Cart = [];


import PopupHtmlString from "./popupcreate.js";
import createHtmlString from "./htmlcreate.js";

function init(){


  function loadItems(){
    return fetch('js/data.json')
          .then( (res) => res.json() )
          .then( (json) => json.list );
  }

  //render
  function render(list){
    const ParsedList = JSON.parse(savedList);
    const ParsedCart = JSON.parse(savedCart);
    //JSON.parse
    if(savedList !== null){
      listBox = ParsedList;
      Cart = ParsedCart;
      createItem(ParsedList)
      return
    }else if(savedCart !== null){
      Cart = ParsedCart;
    }
    createItem(list)
  }

  function createItem(list){
    const Lists = document.querySelector('.prd-list');
    Lists.innerHTML = list.map( (item, i) => createHtmlString(item, i)).join('');
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
      console.log(item.name)
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
    localStorage.setItem('list', JSON.stringify(listBox))
  }

  // localstorage-getItem
  const savedList = localStorage.getItem('list');
  const savedCart = localStorage.getItem('cart');



  let $Count = 0;

  //CountUp함수
  function CountUp(){
    const menuCount = document.querySelector('.menu-count');
    const savedCart = localStorage.getItem('cart');
    if(Cart.length){
      $Count = JSON.parse(savedCart).length;
    }
    menuCount.innerText = `(${$Count})`;
  }



  //카드담기
  function CartBox(e, list){
    const ListId = e.target.closest('i').dataset.icon;
    alert('장바구니에 추가됐습니다');
    const Product = list.find( (item) => item.number === e.target.closest('i').dataset.icon)
    // console.log(Product)
    Cart.push(Product)
    localStorage.setItem('cart', JSON.stringify(Cart))
    CountUp()
  }

  // //위시리스트
  function Wishlist(e, list){
    // if(e.target.contains('span')) return
    const List = e.target.closest('i');
    const ListId = e.target.closest('i').dataset.icon;
    if(listBox.length === 0) listBox = Object.assign(list);
    if(ListId == null) return
    if(List.classList.contains('far')){
      alert('위시리스트에 추가됐습니다.');
      List.classList.replace('far', 'fas');
      listBox[ListId].heart = true;
      setLocalsStorage()
      return
    }
    if(confirm('취소하시겠습니까?') ){
      List.classList.replace('fas', 'far')
      listBox[ListId].heart = false;
      if(ListId === List.dataset.icon){
        const result = listBox.find( (item) => item.number === ListId )
        listBox.splice(ListId, 1, result)
        setLocalsStorage()
      }
    }
    else{
      List.classList.replace('far', 'fas')
    }
  }


  //팝업 닫기
  function Close(){
    $Popup.style = 'display: none';
    $Body.style = 'overflow: visible';
  }

  //디테일
  function Detail(e){
    const $Detail = document.querySelector('.detail img');
    let ImgBtn = e.target.getAttribute('src');
    e.target.closest('li') ? $Detail.setAttribute('src', ImgBtn) : '' ;  
  }


  //팝업
  function Popup(e, list){
    const $Li = e.target.closest('li').className;
    const $MOdal = document.querySelector('.modal');
    listBox.length === 0 ? listBox = Object.assign(list) : '';
    $MOdal.innerHTML = PopupHtmlString( listBox.find( (item) => item.number === $Li));
    const productBtn = document.querySelector('.product-btns');
    const detailImg = document.querySelector('.img-list');
    productBtn.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-heart')){
        Wishlist(e, list);
        createItem(listBox);
      }else if(e.target.classList.contains('fa-shopping-cart'))return CartBox(e, list)
    });
    detailImg.addEventListener('click', (e) => Detail(e))
    $Popup.style = 'display: flex; position: fixed';
    $Body.style = 'overflow: hidden';
  }

  //팝업 닫기 이벤트
  $Close.addEventListener( 'click', Close)



  function setEventListeners(list){
    const MenuBtns = document.querySelector('.menucategory');
    const Lists = document.querySelector('.prd-list');
    MenuBtns.addEventListener('click', (e) => onBtnClick(e, list));
    Lists.addEventListener('click', (e) => {
      e.target.closest('img') ? Popup(e, list): '';
      e.target.parentNode.classList.contains('heart-icon') ? Wishlist(e, list) :'';
      e.target.parentNode.classList.contains('cart') ? CartBox(e, list) :'';
    });
  }
  


  loadItems()
  .then( (list) => {
    render(list)
    setEventListeners(list)
  })
  .catch(console.log);


}
window.onload = init;
