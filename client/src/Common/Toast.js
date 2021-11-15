const CToast = props => {
  return (
    <div
      class='toast border-0 p-1 rounded'
      id={props.data.id}
      autohide='false'
      data-bs-autohide='false'
    >
      <div class='toast-header p-0'>
        <img src='...' class='rounded me-2' alt='...' />
        <strong class='me-auto'>Оповещение</strong>
        <small>1 мин назад</small>
        <button
          type='button'
          class='btn-close'
          aria-label='Закрыть'
          onClick={() => {
            props.deleteToast(props.data.id)
          }}
        ></button>
      </div>
      <div class='toast-body'>{props.data.body}</div>
    </div>
  )
}

export default CToast
