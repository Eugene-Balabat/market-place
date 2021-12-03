import css from './Order.module.css'
import OrderUnit from './OrderUnit'

function Order(props) {
  return (
    <article className={css.content}>
      <p class='text-uppercase fs-5 p-3'>Количество товаров в заказе: 0</p>
      <OrderUnit />
      <p class='text-uppercase fs-5 p-3 text-end'>Итоговая сумма: 0</p>
      <div class='float-end p-2'>
        <button class='btn btn-outline-secondary rounded'>Оформить</button>
      </div>
    </article>
  )
}

export default Order
