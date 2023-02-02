import { IScore} from "../../models/results.models"

export enum ResultsTypes {
  SET_RESULTS = 'SET_RESULTS',
  HADNLE_SCORE = 'HADNLE_SCORE'
}

interface ISetResults {
  type: ResultsTypes.SET_RESULTS;
  payload: IScore[];
}
interface IHandleScore {
  type: ResultsTypes.HADNLE_SCORE;
  payload: IScore;
}

export type ResultsActionsType = ISetResults | IHandleScore

export const setResults = (results: IScore[]): ResultsActionsType => ({
  type: ResultsTypes.SET_RESULTS,
  payload: results
})
export const handleScore = (result: IScore): ResultsActionsType => ({
  type: ResultsTypes.HADNLE_SCORE,
  payload: result
})