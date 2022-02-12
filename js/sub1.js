'use strict';

const Word = document.querySelector('#word');
let $newWord;
function init(){


  function loadItems(){
    return fetch('js/data.json')
          .then( (res) => res.json() )
          .then( (json) => json.list );
  }

  function createItem(list){
    const Lists = document.querySelector('.prd-list')
    Lists.innerHTML = list.map( (item) => createHtmlString(item)).join('');
  }

  function createHtmlString(item){
    return `            
          <li>
            <figure>
              <img src=${item.img}>
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
    // console.log(PrdList)
    list.forEach( (item, index) => {
      if(item[key] === value){
        PrdList[index].classList.remove('invisible')
        WordChange(value)
      }else{
        PrdList[index].classList.add('invisible')
      }
    });
  }

  const toDo = [];

  //localstorage-setItem
  function setLocalsStorage(toDO){
    localStorage.setItem('list', JSON.stringify(toDO))
  }

  let $Count = 0;
  const menuCount = document.querySelector('.menu-count');

  //CountUp함수
  function CountUp(){
    $Count ++;
    menuCount.innerText = `(${$Count})`;
  }

  //CountDown함수
  function CountDown(){
    $Count --;
    menuCount.innerText = `(${$Count})`;
  }

  //위시리스트
  function Wishlist(e){
    const FIcon = e.target.closest('i')
    const List = e.target.parentNode.closest('li');
    if(FIcon == null){
      return
    }else if(FIcon.classList.contains('far')){
      FIcon.setAttribute('class', 'fas fa-heart');
      CountUp()
      alert('장바구니에 추가됐습니다.')
      toDo.push(List)
      return
    }
    confirm('취소하시겠습니까?') ? 
    ( CountDown(), FIcon.setAttribute('class', 'far fa-heart') ) 
    : FIcon.setAttribute('class', 'fas fa-heart') ;     
  }

  function setEventListeners(list){
    const MenuBtns = document.querySelector('.menucategory');
    const Lists = document.querySelector('.prd-list');
    MenuBtns.addEventListener('click', (e) => onBtnClick(e, list));
    Lists.addEventListener('click', (e) => Wishlist(e));
  }

  loadItems()
  .then( (list) => {
    // console.log(list)
    createItem(list)
    setEventListeners(list)
  })
  .catch(console.log);


}
window.onload = init;