import CToast from '../../Common/Toast'

function Catalog(props) {
  return (
    <>
      <div class='row w-300 m-0'>{props.listConteiner}</div>
      <div
        class='toast-container position-fixed top-0 end-0 p-0 rounded me-3 mt-3 '
        ref={props.toastConteinerRef}
      >
        {props.listState.toasts.map(element => {
          return <CToast data={element} deleteToast={props.deleteToast} />
        })}
      </div>
    </>
  )
}

export default Catalog
