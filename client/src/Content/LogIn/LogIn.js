import { NavLink } from 'react-router-dom'
import CToast from '../../Common/Toast'
import css from './LogIn.module.css'

const LogIn = props => {
  let toasts = props.logInState.toasts.map(element => {
    return <CToast data={element} deleteToast={props.deleteToast} />
  })

  toasts = [
    ...toasts,
    props.userState.toasts.map(element => {
      return <CToast data={element} deleteToast={props.deleteToast} />
    })
  ]

  return (
    <div className={css.loginConteiner}>
      <div className={css.wrapperForm}>
        <form name='form' class='' novalidate='' onSubmit={props.clickToLogin}>
          <div>
            <label for='validationCustom05' class='form-label mb-1'>
              E-mail адрес
            </label>
            <input
              value={props.logInState.contentForm.email.input}
              onInput={e => props.SetValidation(e.target)}
              onChange={props.onInputChange}
              ref={props.inputLogin}
              type='email'
              name={props.logInState.contentForm.email.name}
              class='form-control'
              id='validationCustom05'
              required
            />
            <div class='invalid-feedback'>
              {props.logInState.contentForm.email.errorMessage}
            </div>
          </div>
          <div class='mb-3'>
            <label for='exampleInputPassword1' class='form-label mb-1'>
              Пароль
            </label>
            <input
              value={props.logInState.contentForm.password.input}
              onInput={e => props.SetValidation(e.target)}
              onChange={props.onInputChange}
              ref={props.inputPassword}
              type='password'
              name={props.logInState.contentForm.password.name}
              class='form-control'
              id='exampleInputPassword1'
            />
            <div class='invalid-feedback'>
              {props.logInState.contentForm.password.errorMessage}
            </div>
          </div>
          <div class='hstack gap-2 '>
            <div class='bg-light border' className={css.btnLogin}>
              <button type='submit' class='btn btn-sm btn-primary'>
                Войти
              </button>
            </div>

            <div
              class='bg-light border ms-auto'
              className={css.btnRegistration}
            >
              <NavLink
                tabindex='-1'
                class='btn btn-secondary btn-sm'
                to='/register'
              >
                Зарегистрироваться
              </NavLink>
            </div>
          </div>
        </form>
      </div>
      <div
        class='toast-container position-fixed top-0 end-0 p-0 rounded me-3 mt-3 '
        ref={props.toastConteinerRef}
      >
        {toasts}
      </div>
    </div>
  )
}

export default LogIn
