import css from './Order.module.css'

function OrderUnit() {
  return (
    <div class='row w-300'>
      <div class='d-flex position-relative'>
        <img
          src='/images/product.jpg'
          className='rounded card-img-top img-thumbnail'
          alt='...'
          style={{ width: '300px', height: '280px' }}
        />
        <div>
          <h5 class='p-0 m-0'>Lorem ipsum dolor1</h5>
          <p className={css.truncate}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <a href='#' class='stretched-link p-0'></a>
        </div>
      </div>
      <div class='row m-0 p-0 d-flex justify-content-center'>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
            Сумма: 0
          </p>
        </div>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
            Количество: 0
          </p>
        </div>
        <div class='col-4 m-0 '>
          <p
            class='w-100 btn text-center m-0 p-2 btn-outline-light rounded-3'
            onClick={event => {
              const parent =
                event.currentTarget.parentNode.parentNode.parentNode.parentNode
              const child = event.currentTarget.parentNode.parentNode.parentNode
              parent.removeChild(child)
            }}
          >
            Удалить
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderUnit
