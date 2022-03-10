'use strict';
const Lbody = document.querySelector('.list-body');
const Cbody = document.querySelector('.cart-body');
const SumCount = document.querySelector('.sumcount');
const totalPrice = document.querySelector('.summoney');
const Input = document.querySelectorAll('.B-num input');
const List = document.querySelector('.list');

//로컬스토리지
let savedList = JSON.parse(localStorage.getItem('list'));
let savedCart = JSON.parse(localStorage.getItem('cart'));
let Wishlist ;
let listCart;

let count = 1;
let Change;
function Cart(){

  function loadItems(){
    return fetch('js/data.json')
          .then((res) => res.json())
          .then( (json) => json.list);
  }
  function render(list){
    // 위시리스트
    if(savedList !== null){
      Wishlist = savedList;
      Wishlist = list.filter((list) => savedList.includes(list.number))
      createHtml(Lbody, Wishlist)
    }else{
      Lbody.innerHTML = NoHtmlString('위시리스트 목록이 없습니다.');
    }
    //카드
    if(savedCart !== null){
      listCart = list.filter((list) => savedCart.includes(list.number))
      createHtml(Cbody, listCart)
      totalText()
    }else{
      Cbody.innerHTML = NoHtmlString('장바구니에 담긴 항목이 없습니다.');
    }

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
      console.log(listCart)
      listCart.map((list,i) => {
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
      const ProductId = Product.dataset.list;
      const checkBox = Product.querySelector('input[name="checkbox"]');
      if(checkBox.checked){
          Product.remove()
          if(savedCart === null){
            savedCart = [];
          }
          savedCart.push(ProductId)
          localStorage.setItem('cart', JSON.stringify(savedCart));
          StorageList(ProductId);
          listCart = list.filter((list) => savedCart.includes(list.number))
          createHtml(Cbody, listCart)
          totalText()
          setEventListeners()
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
    function StorageList(ProductId){
      savedList = savedList.filter((list) => list !== ProductId)
      localStorage.setItem('list', JSON.stringify(savedList))   
    }
    function StorageCart(ProductId){
      savedCart = savedCart.filter( (list) => list !== ProductId );
      localStorage.setItem('cart', JSON.stringify(savedCart))
    }


    //선택상품 비우기
    function DelItem(){
      const Product = this.parentNode.parentNode;
      const ProductBody = this.parentNode.parentNode.parentNode;
      const ProductId = Product.dataset.list;
      const checkBox = Product.querySelector('input[name="checkbox"]');

      if(checkBox.checked){
        if(ProductBody.classList.contains('list-body')){
          StorageList(ProductId);
        }else if(ProductBody.classList.contains('cart-body')){
          StorageCart(ProductId);
        }
        Product.remove();
        listCart = list.filter((list) => savedCart.includes(list.number))
        totalText()
      }else{
        alert('상품을 선택해주세요');
      }
    }

    //합계
    function calculate(){
      const Product = this.parentNode.parentNode.parentNode;
      console.log(Product)
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
    setEventListeners()

  }
  




  loadItems()
  .then( (list) => {
    render(list)
  })
  .catch()

}
window.onload = Cart;

