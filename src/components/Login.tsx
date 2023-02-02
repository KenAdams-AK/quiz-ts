import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AuthActionsType, handleLogin } from "../redux/auth/authActions";

type LoginPropsT = {
	onClose: () => void;
};

export default function Login({ onClose }: LoginPropsT) {
	const dispatch: Dispatch<AuthActionsType> = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (inputRef.current != null) {
			inputRef.current.value = e.target.value;
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (inputRef.current?.value !== undefined) {
			const userLogin = inputRef.current.value;
			dispatch(handleLogin(userLogin));
			inputRef.current.value = "";
		}
		onClose();
	}

	return (
		<form className="Login__form" onSubmit={handleSubmit}>
			<fieldset>
				<legend>Log in:</legend>
				<label htmlFor="name">Name:</label>
				<input
					ref={inputRef}
					value={inputRef.current?.value}
					onChange={handleChange}
					type="text"
					name="name"
					placeholder="Your name here..."
				/>
			</fieldset>
			<button type="submit">Submit</button>
		</form>
	);
}
