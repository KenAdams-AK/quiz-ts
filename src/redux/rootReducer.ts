import {combineReducers} from 'redux'
import { authReducer } from './auth/authReducer'
import { quizReducer } from './quiz/quizReducer'
import { resultsReducer } from './results/resultsReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  quiz: quizReducer,
  results: resultsReducer
})

export type RootStateType = ReturnType<typeof rootReducer>