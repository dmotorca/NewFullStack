import { Profile } from "@/Components/Profile.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { ProfileService } from "@/Services/ProfileService.tsx";
import { profileState } from "@/Services/RecoilState.tsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export const MessagePage = () => {
	const [message, setMessage] = useState<string>("");
	const [submissionError, setSubmissionError] = useState(false);
	const auth = useAuth();
	const currentProfile = useRecoilValue(profileState);
	const navigate = useNavigate();
	
	const onSubmit = async (ev) => {
		ev.preventDefault();
		const sender_id = auth.user.uid;
		const receiver_id = currentProfile.id;
		try {
			await ProfileService.sendMessage(sender_id, receiver_id, message);
			// If we succeed, send the user onward to message history
			navigate("/messagehistory");
		} catch (err) {
			setSubmissionError(true);
		}
	};
	
	return (
		<>
			<Profile
				imgUri={currentProfile.imgUri}
				name={currentProfile.name}
				petType={currentProfile.petType}
				onLikeButtonClick={() => {}}
				onPassButtonClick={() => {}}
				thumbUri={currentProfile.thumbUri}
				id={currentProfile.id}
			/>
			<div className="flex items-center justify-center rounded-b-box bg-slate-700 w-4/5 mx-auto space-x-8 pt-3 pb-2">
				{ submissionError && <div>YOU SAID A BAD WORD</div> }
				<label htmlFor="message" className="text-blue-300 mb-2">Message:</label>
				<input
					placeholder="Hi..."
					type="text"
					id="message"
					required
					value={ message }
					onChange={e => setMessage(e.target.value)}
					name="petType"
					className="input input-bordered"
				/>
				{
					message &&
          <div>
            <button className="btn btn-primary btn-circle" onClick={onSubmit}>Create</button>
          </div>
				}
			</div>
		</>
	);
};
