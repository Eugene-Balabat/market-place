function Product(props) {
  return (
    <div class='container overflow-hidden'>
      <div class='row gy-5 m-0 p-0'>
        <div class='col m-0'>
          <div class='card-image bg-light m-0'>
            <img
              src='/images/product.jpg'
              className='rounded card-img-top img-thumbnail'
              alt='...'
            />
          </div>
        </div>
        <div class='col m-0'>
          <div class='card-body bg-light'>
            <div class='body rounded'>
              <h5 class='card-title p-0 mb-3'>Заголовок</h5>
              <p class='card-text p-0'>{props.data.title}</p>
            </div>
          </div>
          <div class='card-body bg-light m-4'>
            <div class='body rounded p-2'>
              <div class='row m-0 p-0 d-flex justify-content-center'>
                <div class='col-4 m-0'>
                  <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
                    Цена
                  </p>
                </div>
                <div class='col-4 m-0'>
                  <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
                    {props.data.inStock ? 'В наличии' : 'Нет в наличии'}
                  </p>
                </div>
                <div class='col-4 m-0 '>
                  <p
                    class={`w-100 btn text-center m-0 p-2 btn-outline-light rounded-3 ${
                      !props.data.inStock && `disabled`
                    }`}
                    ref={props.buttonRef}
                  >
                    В корзину
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='row gy-5 m-0 p-0'>
        <div class='col m-0'>
          <div class='card-body bg-light'>
            <div class='body rounded'>
              <h5 class='card-title p-0 mb-3'>Описание</h5>
              <p class='card-text p-0'>{props.data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
