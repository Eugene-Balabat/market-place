import React from 'react'
import { connect } from 'react-redux'
import {
  setEmailInputData,
  setPasswordInputData,
  setUsers,
  setPreloader,
  setPasswordValidationValue,
  setEmailValidationValue,
  deleteExiestingLoginToast,
  setNewToast,
  setInitialState
} from '../../redux/Reducers/Content/logIn-reducer'
import {
  setAuthorizedStatus,
  deleteExiestingUserToast
} from '../../redux/Reducers/user-reducer'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from 'bootstrap'
import validator from 'validator'
import LogIn from './LogIn'
import Preloader from '../../Common/Preloader'
import axios from 'axios'
import { Redirect } from 'react-router'

class LogInContainer extends React.Component {
  constructor(props) {
    super(props)
    this.inputLogin = React.createRef()
    this.inputPassword = React.createRef()
    this.toastConteinerRef = React.createRef()
  }

  async componentDidMount() {
    this.props.setInitialState()
    this.showToasts()
  }

  deleteToast = id => {
    this.props.logInState.toasts.forEach(element => {
      const index = this.props.logInState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingLoginToast(index)
    })
    this.props.userState.toasts.forEach(element => {
      const index = this.props.userState.toasts.indexOf(element)
      if (element.id === id) this.props.deleteExiestingUserToast(index)
    })
  }

  getUniqToastId = () => {
    const id = uuidv4()
    this.props.logInState.toasts.forEach(element => {
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

  showToasts = () => {
    const toastsLiveExample = this.toastConteinerRef.current.children
    Object.entries(toastsLiveExample).forEach(element => {
      const toast = new Toast(element[1])
      toast.show()
    })
  }

  requestToLogin = async () => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: this.inputLogin.current.value,
        password: this.inputPassword.current.value
      })

      this.props.setAuthorizedStatus(true, response.data.token)
    } catch (error) {
      if (error.response) {
        try {
          const message = error.response.data.error.msg
          const headerToast = 'Ошибка'

          this.addNewToast(message, headerToast)
          this.showToasts()
        } catch {
          console.log(error.response.data)
        }
      } else if (error.request) {
        console.log(error.request)
      }
    }
  }

  clickToLogin = event => {
    event.preventDefault()
    event.stopPropagation()

    Object.entries(event.target.elements).forEach(element => {
      this.setValidation(element[1])
    })

    event.target.checkValidity() && this.requestToLogin()
  }

  setValidation = input => {
    switch (input.name) {
      case this.props.logInState.contentForm.email.name:
        const emailValue = validator.trim(input.value)
        if (!validator.isEmail(emailValue)) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.logInState.contentForm.email.errorMessage
          )
        } else {
          this.setValidationHidden(input)
          input.setCustomValidity('')
        }
        break

      case this.props.logInState.contentForm.password.name:
        const passwordValue = input.value
        if (
          validator.isEmpty(passwordValue) ||
          !validator.isLength(passwordValue, { min: 6 })
        ) {
          this.setValidationVisible(input)
          input.setCustomValidity(
            this.props.logInState.contentForm.password.errorMessage
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
    e.target.name === this.inputLogin.current.name
      ? this.props.setEmailInputData(e.target.value)
      : this.props.setPasswordInputData(e.target.value)
  }

  render() {
    return (
      <>
        {(this.props.userState.isAuthorized && this.props.setInitialState() && (
          <Redirect to='/profile' />
        )) ||
          (this.props.logInState.preloaderStatus && <Preloader />) || (
            <LogIn
              logInState={this.props.logInState}
              userState={this.props.userState}
              onInputChange={this.onInputChange}
              clickToLogin={this.clickToLogin}
              SetValidation={this.setValidation}
              inputLogin={this.inputLogin}
              inputPassword={this.inputPassword}
              toastConteinerRef={this.toastConteinerRef}
              deleteToast={this.deleteToast}
            />
          )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    logInState: state.logInState,
    userState: state.userState
  }
}

export default connect(mapStateToProps, {
  setEmailInputData,
  setPasswordInputData,
  setUsers,
  setPreloader,
  setPasswordValidationValue,
  setEmailValidationValue,
  deleteExiestingLoginToast,
  setNewToast,
  setInitialState,
  setAuthorizedStatus,
  deleteExiestingUserToast
})(LogInContainer)
