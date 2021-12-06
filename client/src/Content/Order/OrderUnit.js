import css from './Order.module.css'

function OrderUnit(props) {
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
          <h5 class='p-0 m-0'>{props.data.title}</h5>
          <p className={css.truncate}>{props.data.description}</p>
          <a href='#' class='stretched-link p-0'></a>
        </div>
      </div>
      <div class='row m-0 p-0 d-flex justify-content-center'>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>Сумма</p>
        </div>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
            Количество
          </p>
        </div>
        <div class='col-4 m-0 '>
          <p
            class='w-100 btn text-center m-0 p-2 btn-outline-light rounded-3'
            onClick={() => props.deleteOrderItem(props.data._id)}
          >
            Удалить
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderUnit
