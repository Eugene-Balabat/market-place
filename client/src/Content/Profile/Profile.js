import CToast from '../../Common/Toast'
import css from './Profile.module.css'

const Profile = props => {
  return (
    <form
      name='form'
      class='g-3 rounded '
      novalidate=''
      onSubmit={props.clickToSave}
    >
      <div class='bg-light'>
        <div class='mb-3 rounded'>
          <label for='surnameInput' class='form-label p-2'>
            Фамилия
          </label>
          <input
            onInput={e => props.setValidation(e.target)}
            name={props.profileState.contentForm.surname.name}
            value={props.profileState.contentForm.surname.input}
            onChange={props.onInputChange}
            type='text'
            id='surnameInput'
            class='form-control rounded'
            placeholder='Введите фамилию'
          />
          <div class='invalid-feedback'>
            {props.profileState.contentForm.surname.errorMessage}
          </div>
        </div>
        <div class='mb-3 rounded'>
          <label for='usernameInput' class='form-label p-2'>
            Имя
          </label>
          <input
            onInput={e => props.setValidation(e.target)}
            name={props.profileState.contentForm.name.name}
            value={props.profileState.contentForm.name.input}
            onChange={props.onInputChange}
            type='text'
            id='usernameInput'
            class='form-control rounded'
            placeholder='Введите имя'
          />
          <div class='invalid-feedback'>
            {props.profileState.contentForm.name.errorMessage}
          </div>
        </div>

        <div class='mb-3 rounded'>
          <label for='cityInput' class='form-label p-2'>
            Город
          </label>
          <input
            onInput={e => props.setValidation(e.target)}
            name={props.profileState.contentForm.city.name}
            value={props.profileState.contentForm.city.input}
            onChange={props.onInputChange}
            type='text'
            id='cityInput'
            class='form-control rounded'
            placeholder='Введите город'
          />
          <div class='invalid-feedback'>
            {props.profileState.contentForm.city.errorMessage}
          </div>
        </div>

        <div class='mb-3 rounded'>
          <label for='indexInput' class='form-label p-2'>
            Почтовый индекс
          </label>
          <input
            onInput={e => props.setValidation(e.target)}
            name={props.profileState.contentForm.index.name}
            value={props.profileState.contentForm.index.input}
            onChange={props.onInputChange}
            type='text'
            class='form-control rounded'
            id='indexInput'
            placeholder='Введите почтовый индекс'
          />
          <div class='invalid-feedback'>
            {props.profileState.contentForm.index.errorMessage}
          </div>
        </div>

        <div class='d-flex justify-content-end bg-light p-2'>
          <button class='btn btn-outline-secondary rounded'>Сохранить</button>
        </div>
      </div>
      <div
        class='toast-container position-fixed top-0 end-0 p-0 rounded me-3 mt-3 '
        ref={props.toastConteinerRef}
      >
        {props.profileState.toasts.map(element => {
          return <CToast data={element} deleteToast={props.deleteToast} />
        })}
      </div>
    </form>
  )
}

export default Profile
