import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import Login from "../components/Login";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../redux/rootReducer";
import { Dispatch } from "redux";
import { AuthActionsType, handlLogout } from "../redux/auth/authActions";

export default function Header() {
	const { isLogged, currentUser } = useSelector(
		(state: RootStateType) => state.auth
	);
	const dispatch: Dispatch<AuthActionsType> = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);

	function onLogin() {
		setIsOpen(true);
	}

	function onLogout() {
		dispatch(handlLogout());
	}

	return (
		<>
			<header className="Header">
				<div className="Header__container container">
					<Link to="/">
						<h1 className="Header__logo">Quiz</h1>
					</Link>
					<div className="Header__user-name">
						Current User: {isLogged ? currentUser : "Guest"}
					</div>
					<div className="Header__buttons">
						<Link to="/results">
							<button type="button">Results</button>
						</Link>
						<button type="button" onClick={isLogged ? onLogout : onLogin}>
							{isLogged ? "Logout" : "Login"}
						</button>
					</div>
				</div>
			</header>

			{isOpen && (
				<Modal isOpen={isOpen} onClose={onClose}>
					<Login onClose={onClose} />
				</Modal>
			)}
		</>
	);
}
