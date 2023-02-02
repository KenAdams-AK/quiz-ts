export enum AuthTypes {
  HANDLE_LOGIN = 'HANDLE_LOGIN',
  HANDLE_LOGOUT = 'HANDLE_LOGOUT'
}

interface IHandleLogin {
  type: AuthTypes.HANDLE_LOGIN,
  payload: string
}
interface IHandleLogout {
  type: AuthTypes.HANDLE_LOGOUT
}

export type AuthActionsType = IHandleLogin | IHandleLogout

export const handleLogin = (username: string): AuthActionsType => ({
  type: AuthTypes.HANDLE_LOGIN,
  payload: username
})

export const handlLogout = (): AuthActionsType => ({
  type: AuthTypes.HANDLE_LOGOUT
})

