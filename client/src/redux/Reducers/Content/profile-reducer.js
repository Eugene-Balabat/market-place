const SET_NAME_INPUT = 'SET-NAME-INPUT-REG'
const SET_SURNAME_INPUT = 'SET-SURNAME-INPUT-REG'
const SET_CITY_INPUT = 'SET-CITY-INPUT-REG'
const SET_INDEX_INPUT = 'SET-INDEX-INPUT-REG'

const SET_CURRENT_NAME_VALUE = 'SET-CURRENT-NAME-VALUE'
const SET_CURRENT_SURNAME_VALUE = 'SET-CURRENT-SURNAME-VALUE'
const SET_CURRENT_CITY_VALUE = 'SET-CURRENT-CITY-VALUE'
const SET_CURRENT_INDEX_VALUE = 'SET-CURRENT-INDEX-VALUE'

const SET_NAME_VALIDATION = 'SET-NAME-VALIDATION'
const SET_SURNAME_VALIDATION = 'SET-SURNAME-VALIDATION'
const SET_CITY_VALIDATION = 'SET-CITY-VALIDATION'
const SET_INDEX_VALIDATION = 'SET-INDEX-VALIDATION'

const SET_NEW_TOAST = 'SET-NEW-TOAST'
const DELETE_EXIESTING_TOAST = 'DELETE-EXIESTING-TOAST'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'

const initialState = {
  contentForm: {
    name: {
      currentValue: '',
      input: '',
      errorMessage: 'Введите имя.',
      name: 'name',
      validation: null
    },
    surname: {
      currentValue: '',
      input: '',
      errorMessage: 'Введите фамилию.',
      name: 'surname',
      validation: null
    },
    city: {
      currentValue: '',
      input: '',
      errorMessage: 'Введите город.',
      name: 'city',
      validation: null
    },
    index: {
      currentValue: '',
      input: '',
      errorMessage: 'Индекс должен состоять толко из чисел.',
      name: 'index',
      validation: null
    }
  },
  toasts: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return { ...initialState }
    case SET_NAME_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          name: { ...state.contentForm.name, validation: action.value }
        }
      }
    case SET_SURNAME_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          surname: { ...state.contentForm.surname, validation: action.value }
        }
      }
    case SET_CITY_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          city: { ...state.contentForm.city, validation: action.value }
        }
      }
    case SET_INDEX_VALIDATION:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          index: { ...state.contentForm.index, validation: action.value }
        }
      }
    case DELETE_EXIESTING_TOAST:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST:
      return { ...state, toasts: [...state.toasts, action.value] }
    case SET_CURRENT_NAME_VALUE:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          name: {
            ...state.contentForm.name,
            currentValue: action.value
          }
        }
      }
    case SET_CURRENT_SURNAME_VALUE:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          surname: {
            ...state.contentForm.surname,
            currentValue: action.value
          }
        }
      }
    case SET_CURRENT_CITY_VALUE:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          city: {
            ...state.contentForm.city,
            currentValue: action.value
          }
        }
      }
    case SET_CURRENT_INDEX_VALUE:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          index: {
            ...state.contentForm.index,
            currentValue: action.value
          }
        }
      }
    case SET_NAME_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          name: { ...state.contentForm.name, input: action.value }
        }
      }
    case SET_SURNAME_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          surname: { ...state.contentForm.surname, input: action.value }
        }
      }
    case SET_CITY_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          city: { ...state.contentForm.city, input: action.value }
        }
      }
    case SET_INDEX_INPUT:
      return {
        ...state,
        contentForm: {
          ...state.contentForm,
          index: { ...state.contentForm.index, input: action.value }
        }
      }
    default:
      return state
  }
}

export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})
export const deleteExiestingToast = data => ({
  type: DELETE_EXIESTING_TOAST,
  value: data
})
export const setNewToast = data => ({
  type: SET_NEW_TOAST,
  value: data
})
export const setNameValidation = data => ({
  type: SET_NAME_VALIDATION,
  value: data
})
export const setSurnameValidation = data => ({
  type: SET_SURNAME_VALIDATION,
  value: data
})
export const setCityValidation = data => ({
  type: SET_CITY_VALIDATION,
  value: data
})
export const setIndexValidation = data => ({
  type: SET_INDEX_VALIDATION,
  value: data
})
export const setCurrentName = data => ({
  type: SET_CURRENT_NAME_VALUE,
  value: data
})
export const setCurrentSurname = data => ({
  type: SET_CURRENT_SURNAME_VALUE,
  value: data
})
export const setCurrentCity = data => ({
  type: SET_CURRENT_CITY_VALUE,
  value: data
})
export const setCurrentIndex = data => ({
  type: SET_CURRENT_INDEX_VALUE,
  value: data
})
export const setNameInput = data => ({
  type: SET_NAME_INPUT,
  value: data
})
export const setSurnameInput = data => ({
  type: SET_SURNAME_INPUT,
  value: data
})
export const setCityInput = data => ({
  type: SET_CITY_INPUT,
  value: data
})
export const setIndexInput = data => ({
  type: SET_INDEX_INPUT,
  value: data
})

export default profileReducer
