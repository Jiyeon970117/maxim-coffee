const $Body = document.querySelector('body');
const $Popup = document.querySelector('.popup');
const $Close = document.querySelector('.close');
let GoodsBox = [];
let Cart = [];
import PopupHtmlString from "./popupcreate.js";

function init(){

  // console.log('heoll')
  function loadItems(){
    return fetch('js/data.json')
          .then((res) => res.json())
          .then( (json) => json.list);
  }

  function render(list){
    if(localStorage.getItem('list') !== null){
      GoodsBox = JSON.parse(localStorage.getItem('list'))
      if(localStorage.getItem('cart') !== null){
        Cart = JSON.parse(localStorage.getItem('cart'))
      }
    }else if(localStorage.getItem('cart') !== null){
      Cart = JSON.parse(localStorage.getItem('cart'))
    }
    createItem(list)
  }


  function createItem(list){
    const Items = document.querySelector('.Items');
    list = list.filter( (list) => list.type === 'goods');
    Items.innerHTML = list.map( (item, i) => createHtmlString(item, i)).join('');
    if(GoodsBox.length > 0) return Pullheart()
  }

  //꽉찬 하트
  function Pullheart(){
    const HeartIcon = document.querySelectorAll('.fa-heart');
    console.log(HeartIcon)
    HeartIcon.forEach( (icon) => {
      if(GoodsBox.includes(icon.dataset.icon)) return icon.classList.replace('far', 'fas');
    })
  }
  

  function createHtmlString(item, i){
    return `            
          <li class="${i}">
            <figure>
              <img src=${item.img[0]}>
              <p>
                <span class="heart-icon">
                  <i data-icon="${item.number}" class="far fa-heart"></i>
                </span>
                <span class="cart-icon">
                  <i data-icon="${item.number}" class="fas fa-shopping-cart"></i>
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

    //CountUp함수
    let $Count = 0;
    function CountUp(){
      const menuCount = document.querySelector('.menu-count');
      const savedCart = localStorage.getItem('cart');
      if(Cart.length){
        $Count = JSON.parse(savedCart).length;
      }
      menuCount.innerText = `(${$Count})`;
    }
  

    //카드담기
    function CartBox(e){
      const ItemId = e.target.closest('i').dataset.icon;
      alert('장바구니에 추가됐습니다');
      Cart.push(ItemId)
      localStorage.setItem('cart', JSON.stringify(Cart))
      CountUp()
    }
  

    //위시리스트
    function Wishlist(e){
      const Item = e.target.closest('i');
      const ItemId = e.target.closest('i').dataset.icon;
      if(Item.classList.contains('far')){
        alert('위시리스트에 추가됐습니다.');
        Item.classList.replace('far', 'fas');
        GoodsBox.push(ItemId)
        localStorage.setItem('list',JSON.stringify(GoodsBox))
        return
      }
      if(confirm('취소하시겠습니까?') ){
        Item.classList.replace('fas', 'far')
        GoodsBox = GoodsBox.filter((item) => item !== ItemId)
        localStorage.setItem('list',JSON.stringify(GoodsBox))
        return
      }
      Item.classList.replace('far', 'fas')
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
    const ItemImg = e.target.getAttribute('src')
    const $MOdal = document.querySelector('.modal');
    Item = Item.filter((item) => item.type === 'goods')
    const result = Item.find((item) => item.img[0] === ItemImg)
    $MOdal.innerHTML = PopupHtmlString(Item.find( (item) => item.img[0] === ItemImg));
    Pullheart();
    const productBtn = document.querySelector('.product-btns');
    const detailImg = document.querySelector('.img-list');
    productBtn.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-heart')){
        Wishlist(e);
        render(Item);
      }else if(e.target.classList.contains('fa-shopping-cart'))return CartBox(e)
    });
    detailImg.addEventListener('click', (e) => Detail(e))
    $Popup.style = 'display: flex; position: fixed';
    $Body.style = 'overflow: hidden';
  }

  //팝업 닫기 이벤트
  $Close.addEventListener( 'click', Close)


  function setEventListeners(Item){
    const Items = document.querySelector('.Items');
    Items.addEventListener('click', (e) => {
      e.target.closest('img') ? Popup(e, Item): '';
      e.target.classList.contains('fa-heart') ? Wishlist(e, Item) :'';
      e.target.parentNode.classList.contains('cart-icon') ? CartBox(e, Item) :'';
    });
  }


  loadItems()
  .then( (list) => {
    render(list)
    setEventListeners(list)
  })
  .catch()

}
window.onload = init;