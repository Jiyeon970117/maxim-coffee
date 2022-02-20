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
                          2월 한달 간 원두 200g 전 제품1개 구매시 머그컵 1개(색상랜덤) 증정행사 진행 중!단, 구매 수량 상관없이 1인당 머그컵은 최대 2개 증정합니다
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
                    <a href="#">
                      바로구매하기
                    </a>
                  </div>
                  <div>
                    <a href="#">
                      <i class="fas fa-shopping-cart"></i>
                    </a>
                  </div>
                  <div>
                    <a href="#">
                      <i class="far fa-heart"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>`
}

export default PopupHtmlString;