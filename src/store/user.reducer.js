import { userService } from '../services/user.service'

const initialState = {
  loggedinUser: null
}

export function userReducer(state = initialState, action) {
  let newState = state

  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, loggedinUser: action.user }
      break
    default:
      break
  }

  return newState
}
