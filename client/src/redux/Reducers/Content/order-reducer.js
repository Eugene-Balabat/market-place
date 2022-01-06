const SET_ORDERS_DATA = 'SET-ORDERS-DATA'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'
const SET_NEW_TOAST = 'SET-NEW-TOAST'
const DELETE_EXIESTING_TOAST = 'DELETE-EXIESTING-TOAST'

const initialState = {
  orders: [],
  toasts: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXIESTING_TOAST:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST:
      return { ...state, toasts: [...state.toasts, action.value] }

    case SET_ORDERS_DATA:
      return { ...state, orders: [...action.value] }
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
export const setOrdersData = data => ({
  type: SET_ORDERS_DATA,
  value: data
})

export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})

export default orderReducer
