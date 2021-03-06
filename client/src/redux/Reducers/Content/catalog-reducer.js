const SET_CHAPTERS_DATA = 'SET-CHAPTERS-DATA'
const SET_NEW_TOAST_USER = 'SET-NEW-TOAST-USER'
const DELETE_EXIESTING_TOAST_USER = 'DELETE-EXIESTING-TOAST-USER'

const initialState = {
  chapters: []
}

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    // case DELETE_EXIESTING_TOAST_USER:
    //   const changedToasts = state.toasts.slice()
    //   changedToasts.splice(action.value, 1)
    //   return { ...state, toasts: [...changedToasts] }
    // case SET_NEW_TOAST_USER:
    //   return { ...state, toasts: [...state.toasts, action.value] }
    case SET_CHAPTERS_DATA:
      return { ...state, chapters: [...action.value] }
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
export const setChaptersData = data => ({
  type: SET_CHAPTERS_DATA,
  value: data
})

export default catalogReducer
