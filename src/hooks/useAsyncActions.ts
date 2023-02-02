import { useDispatch } from "react-redux"
import {bindActionCreators} from "redux";
import { getQuizAsyncAction } from "../redux/quiz/quizActions";

// using 'bindActionCreators' in order to handle TypeScript warning about Redux-thunk to disptch async action: 'dispatch any action is not assignable'

export const useAsyncActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(getQuizAsyncAction, dispatch)
}