const SET_PASSWORD_INPUT_REG = 'SET-PASSWORD-INPUT-REG'
const SET_EMAIL_INPUT_REG = 'SET-EMAIL-INPUT-REG'
const SET_NAME_INPUT_REG = 'SET-NAME-INPUT-REG'
const SET_SURNAME_INPUT_REG = 'SET-SURNAME-INPUT-REG'
const SET_CITY_INPUT_REG = 'SET-CITY-INPUT-REG'
const SET_INDEX_INPUT_REG = 'SET-INDEX-INPUT-REG'

const SET_PASSWORD_VALIDATION_REG = 'SET-PASSWORD-VALIDATION-REG'
const SET_EMAIL_VALIDATION_REG = 'SET-EMAIL-VALIDATION-REG'
const SET_NAME_VALIDATION_REG = 'SET-NAME-VALIDATION-REG'
const SET_SURNAME_VALIDATION_REG = 'SET-SURNAME-VALIDATION-REG'
const SET_CITY_VALIDATION_REG = 'SET-CITY-VALIDATION-REG'
const SET_INDEX_VALIDATION_REG = 'SET-INDEX-VALIDATION-REG'

const SET_NEW_TOAST_REG = 'SET-NEW-TOAST-REG'
const DELETE_EXIESTING_TOAST_REG = 'DELETE-EXIESTING-TOAST-REG'
const SET_USERS_REG = 'SET-USERS-REG'
const SET_PRELOADER_VALUE_REG = 'SET-PRELOADER-VALUE-REG'
const SET_REGISTRATION_STATUS_REG = 'SET-REGISTRATION-STATUS-REG'
const SET_INITIAL_STATE_REG = 'SET-INITIAL-STATE-REG'

const initialState = {
  contentForm: {
    name: {
      input: '',
      errorMessage: 'Введите имя.',
      name: 'name',
      validation: null
    },
    surname: {
      input: '',
      errorMessage: 'Введите фамилию.',
      name: 'surname',
      validation: null
    },
    email: {
      input: '',
      errorMessage: 'Некорректный email.',
      name: 'email',
      validation: null
    },
    city: {
      input: '',
      errorMessage: 'Введите город.',
      name: 'city',
      validation: null
    },
    index: {
      input: '',
      errorMessage: 'Индекс должен состоять толко из чисел.',
      name: 'index',
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
  toasts: [],
  preloaderStatus: null,
  registrationStatus: false
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE_REG:
      return { ...initialState }
    case DELETE_EXIESTING_TOAST_REG:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST_REG:
      return { ...state, toasts: [...state.toasts, action.value] }
    case SET_REGISTRATION_STATUS_REG:
      return { ...state, registrationStatus: action.value }
    case SET_USERS_REG:
      return { ...state, users: [...state.users, ...action.users] }
    case SET_PASSWORD_VALIDATION_REG:
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
    case SET_NAME_VALIDATION_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          name: { ...state.contentForm.name, validation: action.value }
        }
      }
    case SET_SURNAME_VALIDATION_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          surname: { ...state.contentForm.surname, validation: action.value }
        }
      }
    case SET_CITY_VALIDATION_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          city: { ...state.contentForm.city, validation: action.value }
        }
      }
    case SET_INDEX_VALIDATION_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          index: { ...state.contentForm.index, validation: action.value }
        }
      }
    case SET_EMAIL_VALIDATION_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          email: { ...state.contentForm.email, validation: action.value }
        }
      }
    case SET_PASSWORD_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          password: { ...state.contentForm.password, input: action.value }
        }
      }
    case SET_NAME_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          name: { ...state.contentForm.name, input: action.value }
        }
      }
    case SET_SURNAME_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          surname: { ...state.contentForm.surname, input: action.value }
        }
      }
    case SET_CITY_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          city: { ...state.contentForm.city, input: action.value }
        }
      }
    case SET_INDEX_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          index: { ...state.contentForm.index, input: action.value }
        }
      }
    case SET_EMAIL_INPUT_REG:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          email: { ...state.contentForm.email, input: action.value }
        }
      }
    case SET_PRELOADER_VALUE_REG: {
      return {
        ...state,
        preloaderStatus: action.value
      }
    }
    default:
      return state
  }
}
export const setInitialState = () => ({
  type: SET_INITIAL_STATE_REG
})
export const setRegistrationStatus = data => ({
  type: SET_REGISTRATION_STATUS_REG,
  value: data
})
export const deleteExiestingToast = data => ({
  type: DELETE_EXIESTING_TOAST_REG,
  value: data
})
export const setNewToast = data => ({
  type: SET_NEW_TOAST_REG,
  value: data
})
export const setEmailInput = data => ({
  type: SET_EMAIL_INPUT_REG,
  value: data
})
export const setNameInput = data => ({
  type: SET_NAME_INPUT_REG,
  value: data
})
export const setSurnameInput = data => ({
  type: SET_SURNAME_INPUT_REG,
  value: data
})
export const setCityInput = data => ({
  type: SET_CITY_INPUT_REG,
  value: data
})
export const setIndexInput = data => ({
  type: SET_INDEX_INPUT_REG,
  value: data
})
export const setPasswordInput = data => ({
  type: SET_PASSWORD_INPUT_REG,
  value: data
})

export const setEmailValidation = data => ({
  type: SET_EMAIL_VALIDATION_REG,
  value: data
})
export const setNameValidation = data => ({
  type: SET_NAME_VALIDATION_REG,
  value: data
})
export const setSurnameValidation = data => ({
  type: SET_SURNAME_VALIDATION_REG,
  value: data
})
export const setCityValidation = data => ({
  type: SET_CITY_VALIDATION_REG,
  value: data
})
export const setIndexValidation = data => ({
  type: SET_INDEX_VALIDATION_REG,
  value: data
})
export const setPasswordValidation = data => ({
  type: SET_PASSWORD_VALIDATION_REG,
  value: data
})
export const setUsers = data => ({
  type: SET_USERS_REG,
  users: data
})
export const setPreloader = data => ({
  type: SET_PRELOADER_VALUE_REG,
  value: data
})

export default registerReducer
