const SET_AUTHORIZED_STATUS_VALUE = 'SET-AUTHORIZED-VALUE-STATUS-VALUE'
const SET_NEW_TOAST_USER = 'SET-NEW-TOAST-USER'
const DELETE_EXIESTING_TOAST_USER = 'DELETE-EXIESTING-TOAST-USER'

const initialState = {
  isAuthorized: localStorage.getItem('key') ? true : false,
  toasts: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXIESTING_TOAST_USER:
      const changedToasts = state.toasts.slice()
      changedToasts.splice(action.value, 1)
      return { ...state, toasts: [...changedToasts] }
    case SET_NEW_TOAST_USER:
      return { ...state, toasts: [...state.toasts, action.value] }
    case SET_AUTHORIZED_STATUS_VALUE:
      if (action.value) localStorage.setItem('key', action.token)
      else localStorage.removeItem('key')
      return { ...state, isAuthorized: action.value }
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
export const setAuthorizedStatus = (value, token = null) => ({
  type: SET_AUTHORIZED_STATUS_VALUE,
  value,
  token
})

export default userReducer
