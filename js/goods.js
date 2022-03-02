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
          .then( (json) => json.items);
  }

  function render(Item){
    const ParsedGoods = JSON.parse(localStorage.getItem('goods'));
    const ParsedCart = JSON.parse(localStorage.getItem('cart'));
    //JSON.parse
    if(localStorage.getItem('goods') !== null){
      GoodsBox = ParsedGoods;
      Cart = ParsedCart;
      createItem(ParsedGoods)
      return
    }else if(localStorage.getItem('cart') !== null){
      Cart = ParsedCart;
    }
    createItem(Item)
  }


  function createItem(Item){
    const Items = document.querySelector('.Items');
    Items.innerHTML = Item.map( (item, i) => createHtmlString(item, i)).join('');
  }

  function createHtmlString(item, i){
    return `            
          <li class="${i}">
            <figure>
              <img src=${item.img[0]}>
              <p>
                <span class="heart-icon">
                  <i data-icon="${i}" class="${item.heart ? 'fas fa-heart': 'far fa-heart'}"></i>
                </span>
                <span class="cart-icon">
                  <i data-icon="${i}" class="fas fa-shopping-cart"></i>
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
    function CartBox(e, Item){
      const itemId = e.target.closest('i').dataset.icon;
      alert('장바구니에 추가됐습니다');
      const Product = Item.find( (item) => item.number === itemId)
      Cart.push(Product)
      localStorage.setItem('cart', JSON.stringify(Cart))
      CountUp()
    }
  

    //위시리스트
    function Wishlist(e, Item){
      const item = e.target.closest('i');
      const itemId = e.target.closest('i').dataset.icon;
      if(GoodsBox.length === 0) GoodsBox = Object.assign(Item);
      // if(itemId == null) return
      if(item.classList.contains('far')){
        alert('위시리스트에 추가됐습니다.');
        item.classList.replace('far', 'fas');
        GoodsBox[itemId].heart = true;
        console.log(GoodsBox[itemId].heart)
        localStorage.setItem('goods',JSON.stringify(GoodsBox))
        return
      }
      if(confirm('취소하시겠습니까?') ){
        item.classList.replace('fas', 'far')
        GoodsBox[itemId].heart = false;
        if(itemId === item.dataset.icon){
          const result = GoodsBox.find( (item) => item.number === itemId )
          GoodsBox.splice(itemId, 1, result)
          localStorage.setItem('goods',JSON.stringify(GoodsBox))
        }
      }
      else{
        item.classList.replace('far', 'fas')
      }
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
    GoodsBox.length === 0 ? GoodsBox = Object.assign(Item) : '';
    $MOdal.innerHTML = PopupHtmlString( GoodsBox.find( (item) => item.number === $Li));
    const productBtn = document.querySelector('.product-btns');
    const detailImg = document.querySelector('.img-list');
    productBtn.addEventListener('click', (e) => {
      if(e.target.classList.contains('fa-heart')){
        Wishlist(e, Item);
        createItem(GoodsBox);
      }else if(e.target.classList.contains('fa-shopping-cart'))return CartBox(e, Item)
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
  .then( (Item) => {
    render(Item),
    setEventListeners(Item)
  })
  .catch()

}
window.onload = init;