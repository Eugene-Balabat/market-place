import CToast from '../../Common/Toast'
import css from './Order.module.css'

function Order(props) {
  return (
    <article className={css.content}>
      <p class='text-uppercase fs-5 p-3'>{`Количество товаров в заказе: ${props.countOrders}`}</p>
      {props.units}
      <p class='text-uppercase fs-5 p-3 text-end'>Итоговая сумма</p>
      <div class='float-end p-2'>
        <button class='btn btn-outline-secondary rounded'>Оформить</button>
      </div>
      <div
        class='toast-container position-fixed top-0 end-0 p-0 rounded me-3 mt-3 '
        ref={props.toastConteinerRef}
      >
        {props.orderState.toasts.map(element => {
          return <CToast data={element} deleteToast={props.deleteToast} />
        })}
      </div>
    </article>
  )
}

export default Order
