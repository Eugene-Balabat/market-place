const SET_PRODUCT_DATA = 'SET-PRODUCT-DATA'
const SET_UPDATE_VALUE = 'SET-UPDATE-VALUE'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'
const SET_NEW_TOAST = 'SET-NEW-TOAST-USER'
const DELETE_EXIESTING_TOAST = 'DELETE-EXIESTING-TOAST-USER'

const initialState = {
  data: {},
  upDatePage: false,
  toasts: []
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXIESTING_TOAST:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST:
      return { ...state, toasts: [...state.toasts, action.value] }
    case SET_UPDATE_VALUE:
      return { ...state, upDatePage: action.value }
    case SET_PRODUCT_DATA:
      return { ...state, data: { ...action.value } }
    case SET_INITIAL_STATE:
      return { ...initialState }
    default:
      return { ...state }
  }
}

export const deleteExiestingToast = data => ({
  type: DELETE_EXIESTING_TOAST,
  value: data
})
export const setNewToast = data => ({
  type: SET_NEW_TOAST,
  value: data
})
export const setProductData = data => ({
  type: SET_PRODUCT_DATA,
  value: data
})
export const setUpdateValue = data => ({
  type: SET_UPDATE_VALUE,
  value: data
})
export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})

export default productReducer
