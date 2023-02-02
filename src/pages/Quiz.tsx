import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RootStateType } from "../redux/rootReducer";
import { useAsyncActions } from "../hooks/useAsyncActions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IQuiz } from "../models/quiz.models";
import { getQuizSuccess, QuizActionsType } from "../redux/quiz/quizActions";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";
import {
	handleScore,
	ResultsActionsType,
} from "../redux/results/resultsActions";

export default function Quiz() {
	console.time("quiz");

	const [quizDataLS, setQuizDataLS] = useLocalStorage<IQuiz[]>("quiz-data", []);

	//using 'bindActionCreators/useAsyncActions' in order to handle TypeScript warning about Redux-thunk to disptch async action: 'dispatch any action is not assignable'
	const getQuizAsyncAction = useAsyncActions();
	const dispatch: Dispatch<QuizActionsType | ResultsActionsType> =
		useDispatch();
	const { isLoading, quizData, error } = useSelector(
		(state: RootStateType) => state.quiz
	);
	const { currentUser } = useSelector((state: RootStateType) => state.auth);

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const interval = useRef<number>();
	const navigate = useNavigate();

	const QUESTION_DURATION: number = 15000;

	useEffect(() => {
		if (quizData.length > 0) return;
		if (quizDataLS.length > 0) {
			dispatch(getQuizSuccess(quizDataLS));
			return;
		}
		getQuizAsyncAction();
	}, []);

	useEffect(() => {
		if (quizData.length > 0) {
			shuffleQuestions(quizData);
		}
		if (quizData.length === 0 || quizDataLS.length > 0) return;
		setQuizDataLS(quizData);
	}, [quizData]);

	useEffect(() => {
		if (quizData.length === 0) return;
		if (activeIndex === quizData.length) {
			dispatch(
				handleScore({
					id: Math.round(Math.random() * 10000),
					username: currentUser!,
					score: score,
				})
			);
			navigate("/results", { replace: true });
			return;
		}
		if (activeIndex < quizData.length) {
			interval.current = setTimeout(() => {
				setActiveIndex((prev) => prev + 1);
			}, QUESTION_DURATION);
		}
		return () => clearTimeout(interval.current);
	}, [activeIndex, quizData]);

	const shuffleQuestions = (quizData: IQuiz[]) => {
		quizData.sort(() => Math.random() - 0.5);
	};

	if (isLoading) {
		return <div className="Quiz__loader loader">Loading...</div>;
	}

	if (error) {
		return <div className="Quiz__error error">{error}</div>;
	}

	console.timeEnd("quiz");

	return (
		<div className="Quiz__container">
			{quizData.map((question: IQuiz, index: number) => {
				if (index === activeIndex)
					return (
						<QuizCard
							key={index}
							question={question}
							setActiveIndex={setActiveIndex}
							score={score}
							setScore={setScore}
						/>
					);
			})}
		</div>
	);
}
