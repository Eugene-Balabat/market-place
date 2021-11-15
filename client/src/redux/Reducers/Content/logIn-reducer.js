const SET_PASSWORD_INPUT = 'SET-PASSWORD-INPUT'
const SET_EMAIL_INPUT = 'SET-EMAIL-INPUT'

const SET_USERS = 'SET-USERS'
const SET_PRELOADER_VALUE = 'SET-PRELOADER-VALUE'

const SET_EMAIL_VALIDATION = 'SET-EMAIL-VALIDATION'
const SET_PASSWORD_VALIDATION = 'SET-PASSWORD-VALIDATION'

const SET_NEW_TOAST = 'SET-NEW-TOAST'
const DELETE_EXIESTING_TOAST = 'DELETE-EXIESTING-OAST'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'
const SET_LOGIN_STATUS = 'SET-LOGIN-STATUS'

const initialState = {
  contentForm: {
    email: {
      input: '',
      errorMessage: 'Некорректный email.',
      name: 'email',
      validation: null
    },
    password: {
      input: '',
      errorMessage: 'Минимальный размер пароля должен быть 6 символов.',
      name: 'password',
      validation: null
    }
  },
  users: [],
  preloaderStatus: null,
  toasts: [],
  loginStatus: false
}

const logInReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return { ...initialState }
    case SET_LOGIN_STATUS:
      return { ...state, loginStatus: action.value }
    case SET_USERS:
      return { ...state, users: [...state.users, ...action.users] }
    case SET_PASSWORD_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          password: { ...state.contentForm.password, input: action.value }
        }
      }
    case SET_EMAIL_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          email: { ...state.contentForm.email, input: action.value }
        }
      }
    case SET_EMAIL_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          email: { ...state.contentForm.email, validation: action.value }
        }
      }
    case SET_PASSWORD_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          password: {
            ...state.contentForm.password,
            validation: action.value
          }
        }
      }
    case SET_PRELOADER_VALUE: {
      return {
        ...state,
        preloaderStatus: action.value
      }
    }
    case DELETE_EXIESTING_TOAST:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST:
      return { ...state, toasts: [...state.toasts, action.value] }
    default:
      return state
  }
}

export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})
export const setLoginStatus = data => ({
  type: SET_LOGIN_STATUS,
  value: data
})
export const deleteExiestingLoginToast = data => ({
  type: DELETE_EXIESTING_TOAST,
  value: data
})
export const setNewToast = data => ({
  type: SET_NEW_TOAST,
  value: data
})
export const setPasswordValidationValue = data => ({
  type: SET_PASSWORD_VALIDATION,
  value: data
})
export const setEmailValidationValue = data => ({
  type: SET_EMAIL_VALIDATION,
  value: data
})
export const setEmailInputData = data => ({
  type: SET_EMAIL_INPUT,
  value: data
})
export const setPasswordInputData = data => ({
  type: SET_PASSWORD_INPUT,
  value: data
})
export const setUsers = data => ({
  type: SET_USERS,
  users: data
})
export const setPreloader = data => ({
  type: SET_PRELOADER_VALUE,
  value: data
})

export default logInReducer
