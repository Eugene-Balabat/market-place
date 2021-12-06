const SET_ORDERS_DATA = 'SET-ORDERS-DATA'
const SET_UPDATE_VALUE = 'SET-UPDATE-VALUE'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'
const SET_NEW_TOAST_USER = 'SET-NEW-TOAST-USER'
const DELETE_EXIESTING_TOAST_USER = 'DELETE-EXIESTING-TOAST-USER'

const initialState = {
  orders: [],
  upDatePage: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // case DELETE_EXIESTING_TOAST_USER:
    //   const changedToasts = state.toasts.slice()
    //   changedToasts.splice(action.value, 1)
    //   return { ...state, toasts: [...changedToasts] }
    // case SET_NEW_TOAST_USER:
    //   return { ...state, toasts: [...state.toasts, action.value] }
    case SET_UPDATE_VALUE:
      return { ...state, upDatePage: action.value }
    case SET_ORDERS_DATA:
      return { ...state, orders: [...action.value] }
    case SET_INITIAL_STATE:
      return { ...initialState }
    default:
      return { ...state }
  }
}

export const deleteExiestingUserToast = data => ({
  type: DELETE_EXIESTING_TOAST_USER,
  value: data
})
export const setNewUserToast = data => ({
  type: SET_NEW_TOAST_USER,
  value: data
})
export const setOrdersData = data => ({
  type: SET_ORDERS_DATA,
  value: data
})
export const setUpdateValue = data => ({
  type: SET_UPDATE_VALUE,
  value: data
})
export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})

export default orderReducer