import { useAuth } from "@/Services/Auth.tsx";
import { useCallback, useState } from "react";

export function Login() {
	const auth = useAuth();
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitFailed, setSubmitFailed] = useState(false);
	
	const onSubmitLogin = useCallback(async () => {
		try {
			const result = await auth.handleLogin(email, password);
			if (!result) {
				setSubmitFailed(true);
			}
		} catch (err) {
			console.error(err);
			setSubmitFailed(true);
		}
	}, [email, password, auth]);
	
	return (
		<div>
			<div>Login</div>
			<div>
				{submitFailed ? <p>Your password or email was incorrect! Please try again.</p> : null}
			</div>
			
			<div>
				<label htmlFor={"email"}>Email Address:</label>
				<input
					type="text"
					id="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name={"email"}
				/>
			</div>
			
			<div>
				<label htmlFor={"password"}>Password:</label>
				<input
					type="text" //It should be type=password but this is easier so I know what I am typing in for sure
					id="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name={"password"}
				/>
			</div>
			
			<div>
				<button onClick={onSubmitLogin}>Submit</button>
			</div>
		</div>
	);
}
