const SET_ITEMS_DATA = 'SET-ITEMS-DATA'
const SET_INITIAL_STATE = 'SET-INITIAL-STATE'
const SET_NEW_TOAST_USER = 'SET-NEW-TOAST-USER'
const DELETE_EXIESTING_TOAST_USER = 'DELETE-EXIESTING-TOAST-USER'

const initialState = {
  items: []
}

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    // case DELETE_EXIESTING_TOAST_USER:
    //   const changedToasts = state.toasts.slice()
    //   changedToasts.splice(action.value, 1)
    //   return { ...state, toasts: [...changedToasts] }
    // case SET_NEW_TOAST_USER:
    //   return { ...state, toasts: [...state.toasts, action.value] }
    case SET_ITEMS_DATA:
      return { ...state, items: [...action.value] }
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
export const setItemsData = data => ({
  type: SET_ITEMS_DATA,
  value: data
})
export const setInitialState = () => ({
  type: SET_INITIAL_STATE
})

export default listReducer
