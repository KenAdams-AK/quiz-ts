import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IScore } from "../models/results.models";
import {
	ResultsActionsType,
	setResults,
} from "../redux/results/resultsActions";
import { RootStateType } from "../redux/rootReducer";

export default function Results() {
	const [resultsLS, setResultsLS] = useLocalStorage<IScore[]>(
		"quiz-results",
		[]
	);
	const dispatch: Dispatch<ResultsActionsType> = useDispatch();
	const { lastScore, results } = useSelector(
		(state: RootStateType) => state.results
	);
	const [resultsToRender, setResultsToRender] = useState<IScore[]>([]);

	const sortResults = (results: IScore[]) => {
		const sorted = [...results].sort((a, b) => b.score - a.score);

		if (results.length < 5) {
			setResultsToRender(sorted);
			return;
		}
		if (results.length > 5) {
			const sliced = sorted.slice(0, 5);
			if (lastScore === null) {
				setResultsToRender(sliced);
				return;
			}
			if (sliced.find((score) => score.id === lastScore.id) === undefined) {
				sliced.push(lastScore);
				setResultsToRender(sliced);
				return;
			}
			setResultsToRender(sliced);
		}
	};

	useEffect(() => {
		if (results.length > 0) {
			sortResults(results);
			setResultsLS(results);
			return;
		}
		if (resultsLS.length > 0) {
			dispatch(setResults(resultsLS));
			return;
		}
	}, [results]);

	return (
		<div className="Results__container">
			<h1 className="Results__title">Results</h1>
			{results.length === 0 ? (
				<div className="Result__noresults">No results yet.</div>
			) : (
				<ul className="Results__list">
					{resultsToRender.map((score) => (
						<li
							className={
								lastScore?.id === score.id
									? "Results__item Results__item-last-score"
									: "Results__item"
							}
							key={score.id}
						>
							<div className="Results__item-username">{score.username}</div>
							<div className="Results__item-score">{score.score}</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
