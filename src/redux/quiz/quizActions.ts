import { GET_QUIZ_DATA_URL } from './../../api/endpoints';
import { AxiosError, AxiosResponse } from "axios"
import { Dispatch } from "redux"
import { IQuiz, IQuizResponse } from "../../models/quiz.models"
import axios from 'axios'

export enum QiuzTypes {
  GET_QUIZ_DATA_REQUEST = 'GET_QUIZ_DATA_REQUEST',
  GET_QUIZ_DATA_SUCCESS = 'GET_QUIZ_DATA_SUCCESS',
  GET_QUIZ_DATA_FAILURE = 'GET_QUIZ_DATA_FAILURE',
}

interface IGetQuizDataRequest {
  type: QiuzTypes.GET_QUIZ_DATA_REQUEST,
}
interface IGetQuizDataSuccess {
  type: QiuzTypes.GET_QUIZ_DATA_SUCCESS,
  payload: IQuiz[]
}
interface IGetQuizDataFailure {
  type: QiuzTypes.GET_QUIZ_DATA_FAILURE,
  payload: string
}

export type QuizActionsType = IGetQuizDataRequest | IGetQuizDataSuccess | IGetQuizDataFailure

export const getQuizRequest = (): QuizActionsType => ({
  type: QiuzTypes.GET_QUIZ_DATA_REQUEST
})
export const getQuizSuccess = (quizData: IQuiz[]): QuizActionsType => ({
  type: QiuzTypes.GET_QUIZ_DATA_SUCCESS,
  payload: quizData
})
export const getQuizFailure = (error: string): QuizActionsType => ({
  type: QiuzTypes.GET_QUIZ_DATA_FAILURE,
  payload: error
})

export const getQuizAsyncAction = () => {
  return async (dispatch: Dispatch<QuizActionsType>) => {
    try {
      dispatch(getQuizRequest())
      const res: AxiosResponse<IQuizResponse> = await axios.get(GET_QUIZ_DATA_URL)
      dispatch(getQuizSuccess(res.data.results))
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(getQuizFailure(error.message))
      } else {
        dispatch(getQuizFailure("Oops... Something went wrong."))
        console.error("Unexpected error: ", error);
      }
    }
  }
}