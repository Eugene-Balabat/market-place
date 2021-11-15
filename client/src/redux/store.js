import { combineReducers, createStore } from 'redux'
import logInReducer from './Reducers/Content/logIn-reducer'
import profileReducer from './Reducers/Content/profile-reducer'
import registerReducer from './Reducers/Content/register-reducer'
import userReducer from './Reducers/user-reducer'

const reducers = combineReducers({
  logInState: logInReducer,
  registerState: registerReducer,
  profileState: profileReducer,
  userState: userReducer
})

const store = createStore(reducers)

window.store = store

export default store
