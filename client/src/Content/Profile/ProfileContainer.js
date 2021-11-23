import React from 'react'
import { connect } from 'react-redux'
import {
  setIndexInput,
  setCityInput,
  setSurnameInput,
  setNameInput,
  setCurrentName,
  setCurrentSurname,
  setCurrentCity,
  setCurrentIndex,
  setNewToast,
  deleteExiestingToast,
  setInitialState,
  setNameValidation,
  setSurnameValidation,
  setCityValidation,
  setIndexValidation
} from '../../redux/Reducers/Content/profile-reducer'
import {
  setAuthorizedStatus,
  deleteExiestingUserToast,
  setNewUserToast
} from '../../redux/Reducers/user-reducer'
import Profile from './Profile'
import { Toast } from 'bootstrap'
import axios from 'axios'
import validator from 'validator'
import { v4 as uuidv4 } from 'uuid'
import { Redirect } from 'react-router'

class ProfileConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.toastConteinerRef = React.createRef()
  }

  setCurrentData = data => {
    this.props.setCurrentName(data.username)
    this.props.setCurrentSurname(data.surname)
    this.props.setCurrentCity(data.city)
    this.props.setCurrentIndex(data.index)
  }

  setInputData = data => {
    this.props.setNameInput(data.name)
    this.props.setSurnameInput(data.surname)
    this.props.setCityInput(data.city)
    this.props.setIndexInput(data.index)
  }

  deleteToast = id => {
    this.props.profileState.toasts.forEach(element => {
      const index = this.props.profileState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.profileState.toasts.forEach(element => {
      if (element.id === id) return this.getUniqToastId()
    })
    return id
  }

  addNewToast = (message, header, addToastCallback) => {
    const id = this.getUniqToastId()
    addToastCallback({
      id,
      body: message,
      header
    })
  }

  showToasts = () => {
    const toastsLiveExample = this.toastConteinerRef.current.children

    Object.entries(toastsLiveExample).forEach(element => {
      const toast = new Toast(element[1])
      toast.show()
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/get/userInfo', {
        headers: { Token: localStorage.getItem('key') }
      })

      this.setCurrentData(response.data)
      this.setInputData(response.data)
    } catch (error) {
      if (error.response) {
        const { type, msg } = error.response.data.error
        const headerToast = 'Ошибка'
        if (type) {
          this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.props.setAuthorizedStatus(false)
        } else {
          this.addNewToast(msg, headerToast, this.props.setNewToast)
          this.showToasts()
        }
      } else if (error.request) console.log(Error, error.messages)
    }
  }

  checkForChanges = () => {
    const formData = this.props.profileState.contentForm

    if (formData.name.currentValue !== formData.name.input) return true
    if (formData.surname.currentValue !== formData.surname.input) return true
    if (formData.city.currentValue !== formData.city.input) return true
    if (formData.index.currentValue !== formData.index.input) return true

    return false
  }

  clickToSave = async event => {
    const message = 'Для сохранения необходимо внести изменения'
    const header = 'Предупреждение'

    event.preventDefault()
    event.stopPropagation()
    Object.entries(event.target.elements).forEach(element => {
      this.setValidation(element[1])
    })

    if (event.target.checkValidity()) {
      if (this.checkForChanges()) {
        this.requestToUpdate()
      } else {
        await this.addNewToast(message, header, this.props.setNewToast)
        this.showToasts()
      }
    }
  }

  requestToUpdate = async () => {
    try {
      const formData = this.props.profileState.contentForm
      const headerToast = 'Оповещение'

      const response = await axios.post(
        '/api/post/updateUser',
        {
          username: formData.name.input,
          surname: formData.surname.input,
          index: formData.index.input,
          city: formData.city.input
        },
        {
          headers: { Token: localStorage.getItem('key') }
        }
      )
      this.setCurrentData(response.data.user)

      this.addNewToast(response.data.msg, headerToast, this.props.setNewToast)
      this.showToasts()
    } catch (error) {
      if (error.response) {
        const { type, msg } = error.response.data.error
        const headerToast = 'Ошибка'
        if (type) {
          this.addNewToast(msg, headerToast, this.props.setNewUserToast)
          this.props.setAuthorizedStatus(false)
        } else this.addNewToast(msg, headerToast, this.props.setNewToast)
        this.showToasts()
      } else if (error.request) console.log(Error, error.messages)
    }
  }

  setValidation = input => {
    switch (input.name) {
      case this.props.profileState.contentForm.name.name:
        const nameValue = validator.trim(input.value)
        if (validator.isEmpty(nameValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.profileState.contentForm.name.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.profileState.contentForm.surname.name:
        const surnameValue = validator.trim(input.value)
        if (validator.isEmpty(surnameValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.profileState.contentForm.surname.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.profileState.contentForm.city.name:
        const cityValue = validator.trim(input.value)
        if (validator.isEmpty(cityValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.profileState.contentForm.city.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.profileState.contentForm.index.name:
        const indexValue = validator.trim(input.value)
        if (!validator.isNumeric(indexValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.profileState.contentForm.index.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      default:
        break
    }
  }

  setValidationVisible = element => {
    !element.classList.contains('is-invalid') &&
      element.classList.add('is-invalid')
  }

  setValidationHidden = element => {
    element.classList.contains('is-invalid') &&
      element.classList.remove('is-invalid')
  }

  onInputChange = e => {
    switch (e.target.name) {
      case this.props.profileState.contentForm.name.name:
        this.props.setNameInput(e.target.value)
        break
      case this.props.profileState.contentForm.surname.name:
        this.props.setSurnameInput(e.target.value)
        break
      case this.props.profileState.contentForm.city.name:
        this.props.setCityInput(e.target.value)
        break
      case this.props.profileState.contentForm.index.name:
        this.props.setIndexInput(e.target.value)
        break
      default:
        break
    }
  }

  render() {
    return (
      (!this.props.userState.isAuthorized && this.props.setInitialState() && (
        <Redirect to='/login' />
      )) || (
        <Profile
          profileState={this.props.profileState}
          onInputChange={this.onInputChange}
          toastConteinerRef={this.toastConteinerRef}
          deleteToast={this.deleteToast}
          setValidation={this.setValidation}
          clickToSave={this.clickToSave}
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    profileState: state.profileState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setIndexInput,
  setCityInput,
  setSurnameInput,
  setNameInput,
  setCurrentName,
  setCurrentSurname,
  setCurrentCity,
  setCurrentIndex,
  setAuthorizedStatus,
  setNewToast,
  deleteExiestingToast,
  deleteExiestingUserToast,
  setNewUserToast,
  setInitialState,
  setNameValidation,
  setSurnameValidation,
  setCityValidation,
  setIndexValidation
})(ProfileConteiner)
