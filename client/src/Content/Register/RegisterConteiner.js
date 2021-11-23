import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  setEmailInput,
  setNameInput,
  setSurnameInput,
  setCityInput,
  setIndexInput,
  setPasswordInput,
  setEmailValidation,
  setNameValidation,
  setSurnameValidation,
  setCityValidation,
  setIndexValidation,
  setPasswordValidation,
  setUsers,
  setPreloader,
  setNewToast,
  deleteExiestingToast,
  setRegistrationStatus,
  setInitialState
} from '../../redux/Reducers/Content/register-reducer'
import Register from './Register'
import Preloader from '../../Common/Preloader'
import axios from 'axios'
import validator from 'validator'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from 'bootstrap'

class RegisterConteiner extends React.Component {
  constructor(props) {
    super(props)
    this.inputRefs = {
      inputEmail: React.createRef(),
      inputPassword: React.createRef(),
      inputName: React.createRef(),
      inputSurname: React.createRef(),
      inputCity: React.createRef(),
      inputIndex: React.createRef()
    }
    this.toastConteinerRef = React.createRef()
  }

  componentDidMount() {
    this.props.setInitialState()
  }

  clickToRegister = event => {
    event.preventDefault()
    event.stopPropagation()

    Object.entries(event.target.elements).forEach(element => {
      this.SetValidation(element[1])
    })

    event.target.checkValidity() && this.requestToRegistration()
  }

  deleteToast = id => {
    this.props.registerState.toasts.forEach(element => {
      const index = this.props.registerState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.registerState.toasts.forEach(element => {
      if (element.id === id) return this.getUniqToastId()
    })
    return id
  }

  addNewToast = (message, header) => {
    const id = this.getUniqToastId()
    this.props.setNewToast({
      id,
      body: message,
      header
    })
  }

  requestToRegistration = async () => {
    try {
      await axios.post('/api/auth/registr', {
        email: this.inputRefs.inputEmail.current.value,
        password: this.inputRefs.inputPassword.current.value,
        username: this.inputRefs.inputName.current.value,
        surname: this.inputRefs.inputSurname.current.value,
        index: this.inputRefs.inputIndex.current.value,
        city: this.inputRefs.inputCity.current.value
      })

      this.props.setRegistrationStatus(true)

      // this.props.setUsers(
      //   this.inputLogin.current.value,
      //   this.inputPassword.current.value
      // )
      //this.props.setFormInputs()
    } catch (error) {
      if (error.response) {
        const message = error.response.data.error.msg
        const headerToast = 'Ошибка'

        this.addNewToast(message, headerToast)

        const toastsLiveExample = this.toastConteinerRef.current.children
        Object.entries(toastsLiveExample).forEach(element => {
          const toast = new Toast(element[1])
          toast.show()
        })
      } else if (error.request) {
        console.log(Error, error.messages)
      }
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

  SetValidation = input => {
    switch (input.name) {
      case this.props.registerState.contentForm.email.name:
        const emailValue = validator.trim(input.value)
        if (!validator.isEmail(emailValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.email.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.registerState.contentForm.index.name:
        const indexValue = validator.trim(input.value)
        if (!validator.isNumeric(indexValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.index.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.registerState.contentForm.name.name:
        const nameValue = validator.trim(input.value)
        if (validator.isEmpty(nameValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.name.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.registerState.contentForm.surname.name:
        const surnameValue = validator.trim(input.value)
        if (validator.isEmpty(surnameValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.surname.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.registerState.contentForm.city.name:
        const cityValue = validator.trim(input.value)
        if (validator.isEmpty(cityValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.city.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.registerState.contentForm.password.name:
        const passwordValue = input.value
        if (
          validator.isEmpty(passwordValue) ||
          !validator.isLength(passwordValue, { min: 6 })
        ) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.registerState.contentForm.password.errorMessage
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

  onInputChange = e => {
    switch (e.target.name) {
      case this.inputRefs.inputEmail.current.name:
        this.props.setEmailInput(e.target.value)
        break
      case this.inputRefs.inputPassword.current.name:
        this.props.setPasswordInput(e.target.value)
        break
      case this.inputRefs.inputName.current.name:
        this.props.setNameInput(e.target.value)
        break
      case this.inputRefs.inputSurname.current.name:
        this.props.setSurnameInput(e.target.value)
        break
      case this.inputRefs.inputCity.current.name:
        this.props.setCityInput(e.target.value)
        break
      case this.inputRefs.inputIndex.current.name:
        this.props.setIndexInput(e.target.value)
        break
      default:
        break
    }
  }

  render() {
    return (
      (this.props.registerState.registrationStatus &&
        this.props.setInitialState() && <Redirect to='/login' />) ||
      (this.props.registerState.preloaderStatus && <Preloader />) || (
        <Register
          registerState={this.props.registerState}
          onInputChange={this.onInputChange}
          clickToRegister={this.clickToRegister}
          SetValidation={this.SetValidation}
          deleteToast={this.deleteToast}
          inputRefs={this.inputRefs}
          toastConteinerRef={this.toastConteinerRef}
        />
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    registerState: state.registerState
  }
}

export default connect(mapStateToProps, {
  setEmailInput,
  setNameInput,
  setSurnameInput,
  setIndexInput,
  setCityInput,
  setPasswordInput,
  setUsers,
  setPreloader,
  setEmailValidation,
  setNameValidation,
  setSurnameValidation,
  setCityValidation,
  setIndexValidation,
  setPasswordValidation,
  setNewToast,
  deleteExiestingToast,
  setRegistrationStatus,
  setInitialState
})(RegisterConteiner)
