const $Body = document.querySelector('body');
const $Popup = document.querySelector('.popup');

import PopupHtmlString from "./popupcreate.js";

function init(){

  // console.log('heoll')
  function loadItems(){
    return fetch('js/data.json')
          .then((res) => res.json())
          .then( (json) => json.items);
  }

  function createItem(Item){
    const Items = document.querySelector('.Items');
    Items.innerHTML = Item.map( (item, i) => createHtmlString(item, i)).join('');
  }

  function createHtmlString(item, i){
    return `            
          <li class="${i + 1}">
            <figure>
              <img src=${item.img[0]}>
              <p>
                <span class="heart-icon">
                  <i class="far fa-heart"></i>
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


  function Close(){
    $Popup.style = 'dispaly: none';
    $Body.style = 'overflow: visible';
  }

  //Detail
  function Detail(e){
    const $Detail = document.querySelector('.detail img')
    let ImgBtn = e.target.getAttribute('src')
    $Detail.setAttribute('src', ImgBtn)
  }


  //Popup
  function Popup(e, Item){
    const $Li = e.target.closest('li').className;
    const $MOdal = document.querySelector('.modal');
    // const result = Item.find( (item) => item.number === $Li);
    $MOdal.innerHTML = PopupHtmlString( Item.find( (item) => item.number === $Li));
    $Popup.style = 'display: flex; position: fixed';
    $Body.style = 'overflow: hidden';
    Detail(e, Item)
  }

  $Popup.addEventListener( 'click', (e) => e.target.closest('img') ? Detail(e) :  Close() )


  function setEventListeners(Item){
    const Items = document.querySelector('.Items');
    Items.addEventListener('click', (e) => {
      e.target.closest('img') ? Popup(e, Item): Wishlist(e, Item);
    });
  }


  loadItems()
  .then( (Item) => {
    createItem(Item)
    setEventListeners(Item)
  })
  .catch()

}
window.onload = init;