import { NavLink } from 'react-router-dom'
import css from './Unit.module.css'

function Unit(props) {
  return (
    <>
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
          <NavLink
            to={`/product/?id=${props.data._id}`}
            class='stretched-link p-0'
          />
        </div>
      </div>
      <div class='row m-0 p-0 d-flex justify-content-center'>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>Цена</p>
        </div>
        <div class='col-4 m-0'>
          <p class='text-center rounded-3 m-0 p-2 opacity-75 bg-light'>
            {props.data.inStock ? 'В наличии' : 'Нет в наличии'}
          </p>
        </div>
        <div class='col-4 m-0 '>
          <p
            class={`w-100 btn text-center m-0 p-2 btn-outline-light rounded-3 ${
              (!props.data.inStock || props.data.disable) && `disabled`
            }`}
            onClick={() => props.clickToBuy(props.data._id)}
          >
            В корзину
          </p>
        </div>
      </div>
    </>
  )
}

export default Unit

{
  /* <div className={css.unit}>
      <img src='/images/product.jpg' alt='Product logo' />
      <div className={css.description}>
        <p>{props.data.description}</p>
      </div>
    </div> */
}
