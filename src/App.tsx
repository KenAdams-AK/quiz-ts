import { useDispatch } from "react-redux";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import { Dispatch } from "redux";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { AuthActionsType, handleLogin } from "./redux/auth/authActions";

function App() {
	const [currentUserLS, setCurrentUserLS] = useLocalStorage<string | null>(
		"quiz-user",
		null
	);
	const dispatch: Dispatch<AuthActionsType> = useDispatch();

	if (currentUserLS !== null) dispatch(handleLogin(currentUserLS));

	return (
		<>
			<Header />
			<div className="App__container container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz" element={<Quiz />} />
					<Route path="/results" element={<Results />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
