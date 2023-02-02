import { AuthActionsType, AuthTypes } from './authActions';

type AuthStateType = {
  isLogged: boolean,
  currentUser: string | null,
}

const initialState: AuthStateType = {
  isLogged: false,
  currentUser: null,
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType  => {
  switch (action.type) {
    case AuthTypes.HANDLE_LOGIN:
      return {
        ...state,
        isLogged: true,
        currentUser: action.payload
      }
    case AuthTypes.HANDLE_LOGOUT:
      return {
        ...state,
        isLogged: false,
        currentUser: null
      }
    
    default:
      return state
  }
}