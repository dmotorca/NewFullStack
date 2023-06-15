export type State = {
	currentProfile: ProfileType;
	likeHistory: Array<ProfileType>;
	passHistory: Array<ProfileType>;
};

export type ProfileType = {
	imgUri: string;
	thumbUri: string;
	name: string;
	petType: string;
	id: number;
};

export type MatchAction = {
	send: (sender_id: number, receiver_id: number) => Promise<any>;
};
