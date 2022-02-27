function createHtmlString(item, i){
  i += 0
  return `            
        <li class="${i}">
          <figure>
            <img src=${item.img[0]}>
            <p>
              <span class="heart-icon">
                <i data-icon="${i}"  class="${item.heart ? 'fas fa-heart': 'far fa-heart'} ${i}"></i>
              </span>
              <span class="cart">
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

export default createHtmlString;