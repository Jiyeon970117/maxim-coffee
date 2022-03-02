'use strict';
const Lbody = document.querySelector('.list-body');
const Cbody = document.querySelector('.cart-body');
const SumCount = document.querySelector('.sumcount');
const totalPrice = document.querySelector('.summoney');
const Input = document.querySelectorAll('.B-num input');
const List = document.querySelector('.list');

//로컬스토리지
let savedList = JSON.parse(localStorage.getItem('list'));
let savedGoods = JSON.parse(localStorage.getItem('goods'));
let savedCart = JSON.parse(localStorage.getItem('cart'));
let Wishlist ;

let count = 1;
let Change;
function Cart(){
  // 위시리스트
  function render(){
    if(savedList !== null && savedGoods !== null){
      Wishlist = savedList.concat(savedGoods)
      Wishlist = Wishlist.filter((list) => list.heart === true)
      createHtml(Lbody, Wishlist)
    }else if(savedList !== null){
      Wishlist = savedList.filter((list) => list.heart === true)
      createHtml(Lbody, Wishlist)
    }else if(savedGoods !== null){
      Wishlist = savedGoods.filter((list) => list.heart === true)
      createHtml(Lbody, Wishlist)
    }else{
      Lbody.innerHTML = NoHtmlString('위시리스트 목록이 없습니다.');
    }
    //카드
    savedCart !== null 
    ? ( createHtml(Cbody, savedCart), totalText() ) 
    : Cbody.innerHTML = NoHtmlString('장바구니에 담긴 항목이 없습니다.');
    setEventListeners()
  }
  render();
  


  //화면출력
  function createHtml(list, saved){
    list.innerHTML =  saved.map((list, i) => HtmlString(list, i)).join('');
  }

  //태그생성
  function NoHtmlString(write){
    return `
            <ul class="row list no-product">
              <li> ${write}</li>
            </ul>`
  }

  //합계
  function totalText(){
    let ToCount = 0;
    let ToPrice = 0;
    savedCart.map((list,i) => {
      i = 1;
      ToCount += i;
      ToPrice += parseInt(list.price.replace('원', '').replace(',', ''))
    })
    SumCount.innerText = `상품갯수: ${ToCount}개`;
    totalPrice.innerText = `합계금액: ${ToPrice.toLocaleString()}원`;
  }

  function HtmlString(list, i){
    return `
            <ul data-list="${list.number}" class="row list">
              <li class="B-check">
                <input type="checkbox" name="checkbox" checked="">
              </li>
              <li class="B-img">
                <figure>
                  <img src="${list.img[0]}" alt="">
                </figure>
              </li>
              <li class="B-name">
                <span>${list.name}</span>
              </li>
              <li class="B-price">
                ${list.price}
              </li>
              <li class="B-num">
                <div>
                  <span class="sum down ${i}"><i class="fas fa-arrow-alt-circle-down"></i></span>
                  <input id="${i}" type="text" value="1">
                  <span class="sum up ${i}"><i class="fas fa-arrow-alt-circle-up"></i></span>
                </div>
              </li>
              <li class="B-sum">
                ${list.price}
              </li>
              <li class="B-option">
                <span class="cart-icon cart">
                  <i class="fas fa-shopping-cart"></i>
                </span>
                <span class="cart-icon trash">
                  <i class="fas fa-trash"></i>
                </span>
              </li>
            </ul>`
  }

  //basket
  function Basket(){
    const Product = this.parentNode.parentNode;
    const $Price = Product.querySelector('.B-price').innerText;
    const ProductId = Product.dataset.list;
    const checkBox = Product.querySelector('input[name="checkbox"]');
    let listCart = [];
    if(checkBox.checked){
      Change = Wishlist.find( list => list.number == ProductId && list.price == $Price )
      if(savedCart !== null){
        savedCart.push(Change)
        localStorage.setItem('cart', JSON.stringify(savedCart))
      }else if(!savedCart){
        listCart.push(Change)
        localStorage.setItem('cart', JSON.stringify(listCart));
        listCart = JSON.parse(localStorage.getItem('cart'));
        savedCart = listCart
      }
      UpdateList(ProductId, $Price)
      render()
    }else{
      alert('상품을 선택해주세요');
    }
  }

  // 재계산
  function Recalc(Product){
    let totalNum = Product.parentNode.querySelectorAll('.B-num input');
    const checkBox = Product.querySelector('input[name="checkbox"]');
    const SumPrice = Product.parentNode.querySelectorAll('.B-sum');
    let ToCount = 0;
    let TOPrice = 0;
    if(Product.parentNode.className == 'cart-body' && checkBox.checked){
      totalNum.forEach( (item, i) => {
          let $count = parseInt(item.getAttribute('value'));
          let $price = parseInt(SumPrice[i].innerText.replace('원', '').replace(',', ''));
          ToCount += $count;
          TOPrice += $price;
      })
      SumCount.innerText = `상품갯수: ${ToCount}개`;
      totalPrice.innerText = `합계금액: ${TOPrice.toLocaleString()}원`;
    }else if(Product.parentNode.className == 'list-body') return;
    else{
      alert('상품을 선택해주세요')
    }
  }


  //로컬스토리지 update
  function UpdateList(ProductId, $Price){
    console.log( $Price)
    Wishlist.find((list) => {
      if(list.number == ProductId && list.price == $Price ){
        if(list.type == 'coffee'){
          savedList[ProductId].heart = false;
          Change = savedList.find( list => list.number == ProductId )
          savedList.splice([ProductId], 1, Change)
          localStorage.setItem('list', JSON.stringify(savedList))
        }else if(list.type == 'goods'){
          savedGoods[ProductId].heart = false;
          Change = savedGoods.find( list => list.number == ProductId )
          savedGoods.splice([ProductId], 1, Change)
          localStorage.setItem('goods', JSON.stringify(savedGoods))
        }  
      }
    })
  }

  //선택상품 비우기
  function DelItem(){
    const Product = this.parentNode.parentNode;
    const ProductBody = this.parentNode.parentNode.parentNode;
    const ProductId = Product.dataset.list;
    const checkBox = Product.querySelector('input[name="checkbox"]');
    const $Price = Product.querySelector('.B-price').innerText;

    if(checkBox.checked){
      if(ProductBody.classList.contains('list-body')){
        UpdateList(ProductId, $Price)
      }else if(ProductBody.classList.contains('cart-body')){
        savedCart = savedCart.filter( (list) => list.number !== ProductId );
        localStorage.setItem('cart', JSON.stringify(savedCart))
      }
      render();
    }else{
      alert('상품을 선택해주세요');
    }
  }

  //합계
  function calculate(){
    const Product = this.parentNode.parentNode.parentNode;
    const SumPrice = Product.querySelector('.B-sum')
    const Input = Product.querySelector('.B-num input');
    let Value = parseInt(Input.getAttribute('value'))
    const $price = Product.querySelector('.B-price').innerText;
    const checkBox = Product.querySelector('input[name="checkbox"]');
    if(checkBox.checked){
      if(this.classList.contains('up')) Value += 1;
      if(this.classList.contains('down') && Value > 1) Value -= 1;
      Input.setAttribute('value', Value);
      SumPrice.innerText = `${($price.replace('원', '').replace(',', '') * Value).toLocaleString()}원`
      Recalc(Product)  
      return
    }
    alert('상품을 선택해주세요')
  }

  function setEventListeners(){
    const SumBtn = document.querySelectorAll('.sum');
    const Trash = document.querySelectorAll('.trash');
    const CartList = document.querySelectorAll('.cart');

    SumBtn.forEach( (sum) => sum.addEventListener('click',calculate))
    Trash.forEach( (list) => list.addEventListener('click', DelItem))    
    CartList.forEach( (list) => list.addEventListener('click', Basket))
  }

}
window.onload = Cart;

