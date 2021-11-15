import CToast from '../../Common/Toast'
import css from './Register.module.css'

const Register = props => {
  return (
    <div className={css.regConteiner}>
      <form
        name='form'
        class='row g-3 rounded'
        novalidate=''
        onSubmit={props.clickToRegister}
      >
        <div class='col-md-4'>
          <label for='validationCustom01' class='form-label mb-1'>
            Имя
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.name.name}
            value={props.registerState.contentForm.name.input}
            ref={props.inputRefs.inputName}
            onChange={props.onInputChange}
            type='text'
            class='form-control'
            id='validationCustom01'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.name.errorMessage}
          </div>
        </div>
        <div class='col-md-4'>
          <label for='validationCustom02' class='form-label mb-1'>
            Фамилия
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.surname.name}
            value={props.registerState.contentForm.surname.input}
            ref={props.inputRefs.inputSurname}
            onChange={props.onInputChange}
            type='text'
            class='form-control'
            id='validationCustom02'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.surname.errorMessage}
          </div>
        </div>
        <div class='col-md-4'>
          <label for='validationCustomUsername' class='form-label mb-1'>
            E-mail
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.email.name}
            value={props.registerState.contentForm.email.input}
            ref={props.inputRefs.inputEmail}
            onChange={props.onInputChange}
            type='text'
            class='form-control'
            id='validationCustomUsername'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.email.errorMessage}
          </div>
        </div>
        <div class='col-md-4'>
          <label for='validationCustomPassword' class='form-label mb-1'>
            Пароль
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.password.name}
            value={props.registerState.contentForm.password.input}
            ref={props.inputRefs.inputPassword}
            onChange={props.onInputChange}
            type='password'
            class='form-control'
            id='validationCustomPassword'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.password.errorMessage}
          </div>
        </div>
        <div class='col-md-5'>
          <label for='validationCustom03' class='form-label mb-1'>
            Город
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.city.name}
            value={props.registerState.contentForm.city.input}
            ref={props.inputRefs.inputCity}
            onChange={props.onInputChange}
            type='text'
            class='form-control'
            id='validationCustom03'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.city.errorMessage}
          </div>
        </div>
        <div class='col-md-3'>
          <label for='validationCustom05' class='form-label mb-1'>
            Индекс
          </label>
          <input
            onInput={e => props.SetValidation(e.target)}
            name={props.registerState.contentForm.index.name}
            value={props.registerState.contentForm.index.input}
            ref={props.inputRefs.inputIndex}
            onChange={props.onInputChange}
            type='text'
            class='form-control'
            id='validationCustom05'
            required
          />
          <div class='invalid-feedback'>
            {props.registerState.contentForm.index.errorMessage}
          </div>
        </div>
        <div class='col-12'>
          <button class='btn btn-primary' type='submit'>
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div
        class='toast-container position-fixed top-0 end-0 p-0 rounded me-3 mt-3 '
        ref={props.toastConteinerRef}
      >
        {props.registerState.toasts.map(element => {
          return <CToast data={element} deleteToast={props.deleteToast} />
        })}
      </div>
    </div>
  )
}

export default Register
