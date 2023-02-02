import React, { useCallback, useEffect, useState } from "react";
import ProgressBar from "../layout/ProgressBar";
import { IQuiz } from "../models/quiz.models";

type QuizCartPropsT = {
	question: IQuiz;
	setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuizCard({
	question,
	setActiveIndex,
	score,
	setScore,
}: QuizCartPropsT) {
	const [answers, setAnswers] = useState<string[]>([]);
	const [date, setDate] = useState<Date>(new Date());

	console.table(answers);

	useEffect(() => shuffleAnswers(question), []);

	const shuffleAnswers = useCallback((question: IQuiz) => {
		const answers = [
			...question.incorrect_answers,
			question.correct_answer,
		].sort(() => Math.random() - 0.5);
		setAnswers(answers);
	}, []);

	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;

		console.dir(target);

		const answer = target.innerText.toLowerCase();
		if (answer === question.correct_answer.toLowerCase()) {
			target.classList.add("correct");
			setScore((prev) => prev + (15000 - (+new Date() - +date)));
		} else {
			target.classList.add("wrong");
		}

		setTimeout(() => {
			setActiveIndex((prev) => prev + 1);
		}, 200);
	}, []);

	return (
		<div className="QuizCard__container">
			<ProgressBar />
			<div className="QuizCard__head">
				<h2 className="QuizCard__category">{question.category}</h2>
				<div className="QuizCard__score">{score}</div>
			</div>
			<div className="QuizCard__difficulty">
				Difficulty: {question.difficulty}.
			</div>
			<div
				className="QuizCard__question"
				dangerouslySetInnerHTML={{ __html: question.question }}
			/>
			<div className="QuizCard__answers">
				{answers.map((answer, index) => (
					<button key={index} onClick={handleClick}>
						{answer}
					</button>
				))}
			</div>
		</div>
	);
}
