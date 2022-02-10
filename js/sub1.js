'use strict';
const Word = document.querySelector('#word');
const hIcon = document.querySelectorAll('i');
console.log(hIcon)
let $newWord;
function init(){


  function loadItems(){
    return fetch('js/data.json')
          .then( (res) => res.json() )
          .then( (json) => json.list );
  }

  function createItem(list){
    const Lists = document.querySelector('.prd-list ul')
    Lists.innerHTML = list.map( (item) => 
      createHtmlString(item)).join('');
  }

  function createHtmlString(item){
    return `            
          <li>
            <figure>
              <img src=${item.img}>
              <p>
                <span>
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
    const Btn = document.querySelectorAll('.prd-list ul li');
    list.forEach( (item, index) => {
      if(item[key] === value){
        Btn[index].classList.remove('invisible')
        WordChange(value)
      }else{
        Btn[index].classList.add('invisible')
      }
    });
  }

  function setEventListeners(list){
    const MenuBtns = document.querySelector('.menucategory');
    MenuBtns.addEventListener('click', (e) => onBtnClick(e, list));
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