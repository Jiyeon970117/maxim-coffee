function init(){

  // console.log('heoll')
  function loadItems(){
    return fetch('js/data.json')
          .then((res) => res.json())
          .then( (json) => json.items);
  }

  function createItem(Item){
    const Items = document.querySelector('.Items');
    Items.innerHTML = Item.map( (ele) => createHtmlString(ele)).join('');
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


  loadItems()
  .then( (Item) => {
    createItem(Item)
  })
  .catch()

}
window.onload = init;