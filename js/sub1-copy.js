'use strict';

function init(){
  fetch('../js/data.json')
  .then( (res) => res.json() )
  .then( (data) => callback(data) );

  function callback(data){
    const ProductList = document.querySelector('.prd-list ul')
    console.log(ProductList)
    let TagList = '';
    data.list.forEach( (v) => {
      TagList += `
                <li>
                  <figure>
                    <img src=${v.img}>
                    <p>
                      <span>
                        <i class="far fa-heart"></i>
                      </span>
                      <span>
                        <i class="fas fa-shopping-cart"></i>
                      </span>
                    </p>
                    <div class="name-title">
                      <span> ${v.name}</span>
                      <p> ${v.tit} </p>
                      <strong> ${v.price} </strong>
                      <span>
                        ${v.info}
                      </span>
                    </div>
                  </figure>
                </li>`
    });
    ProductList.innerHTML = TagList;
    // const Hicon = document.getElementsByClassName('far fa-heart');


    data.goods.forEach( (v) => {
      TagList += `
                  <li>
                    <figure>
                      <img src=${v.img}>
                      <p>
                        <span>
                          <i class="far fa-heart"></i>
                        </span>
                        <span>
                          <i class="fas fa-shopping-cart"></i>
                        </span>
                      </p>
                      <div class="name-title">
                        <span> ${v.name}</span>
                        <strong> ${v.price} </strong>
                        <span>
                          ${v.info}
                        </span>
                      </div>
                    </figure>
                  </li>`
    });
    ProductList.innerHTML = TagList;

  }
}
window.onload = init;
