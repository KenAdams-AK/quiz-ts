import { IScore } from "../../models/results.models"
import { ResultsActionsType, ResultsTypes } from "./resultsActions"

type ResultsStateType = {
  lastScore: IScore | null,
  results: IScore[]
}

const initialState: ResultsStateType = {
  lastScore: null,
  results: []
}

export const resultsReducer = (state = initialState, action: ResultsActionsType): ResultsStateType => {
  switch (action.type) {
    case ResultsTypes.SET_RESULTS:
      return {
        ...state,
        results: action.payload 
      }
    case ResultsTypes.HADNLE_SCORE:
      return {
        ...state,
        lastScore: action.payload,
        results: [...state.results, action.payload]
      }

    default:
      return state
  }
}

