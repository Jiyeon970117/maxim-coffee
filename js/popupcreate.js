function PopupHtmlString(item){
  return`
            <div class="row1">
              <div class="product">
                <figure class="detail">
                  <img src=${item.img[0]}>
                </figure>
                <ul class="img-list">
                  <li>
                    <figure>
                      <img src=${item.img[1]}>
                    </figure>
                  </li>
                  <li>
                    <figure>
                      <img src=${item.img[0]}>
                    </figure>
                  </li>
                  <li>
                    <figure>
                      <img src=${item.img[2]}>
                    </figure>
                  </li>
                </ul>
              </div>

              <div class="product-info">
                <h2>
                  ${item.name}
                </h2>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <span>
                          상품요약정보
                        </span>
                      </th>
                      <td>
                        <span>
                         ${item.tit ? item.tit: item.info}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>
                          판매가
                        </span>
                      </th>
                      <td>
                        <span>
                          ${item.price}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>
                          배송방법
                        </span>
                      </th>
                      <td>
                        <span>
                          택배
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>
                          배송비
                        </span>
                      </th>
                      <td>
                        <span>
                          3,000원 (30,000원 이상 구매 시 무료)
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="product-btns">
                  <div>
                    <a class="popup-buy" href="cart.html">
                      바로구매하기
                    </a>
                  </div>
                  <div>
                    <a class="popup-cart" href="#">
                      <i data-icon=${item.number} class="fas fa-shopping-cart"></i>
                    </a>
                  </div>
                  <div>
                    <a class="popup-heart" href="#">
                      <i data-icon="${item.number}" id=${item.number} class="${item.heart ? 'fas fa-heart': 'far fa-heart'}"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>`
}

export default PopupHtmlString;