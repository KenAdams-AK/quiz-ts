import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootStateType } from "../redux/rootReducer";

export default function Home() {
	const [currentUserLS, setCurrentUserLS] = useLocalStorage<string | null>(
		"quiz-user",
		null
	);
	const { currentUser } = useSelector((state: RootStateType) => state.auth);

	useEffect(() => {
		setCurrentUserLS(currentUser);
	}, [currentUser]);

	return (
		<>
			<div className="Home__container">
				<div className="Home__greeting">
					{currentUser
						? `Ready to start, ${currentUser}? Let's go!`
						: "Welcome to quiz! Please, log in first."}
				</div>
				<Link to="/quiz">
					<button type="button" disabled={!currentUser}>
						Start Quiz
					</button>
				</Link>
			</div>
		</>
	);
}
