import { QiuzTypes, QuizActionsType } from './quizActions';
import { IQuiz } from '../../models/quiz.models';

type QuizStateType = {
  isLoading: boolean,
  quizData: IQuiz[],
  error: string | null
}

const initialState: QuizStateType = {
  isLoading: false,
  quizData: [],
  error: null
} 

export const quizReducer = (state = initialState, action: QuizActionsType): QuizStateType => {
  switch (action.type) {
    case QiuzTypes.GET_QUIZ_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case QiuzTypes.GET_QUIZ_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizData: action.payload,
        error: null
      }
    case QiuzTypes.GET_QUIZ_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        quizData: [],
        error: action.payload
      }

    default:
      return state
}
}