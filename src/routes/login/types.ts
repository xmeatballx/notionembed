export type UserData = {
	access_token: string;
	token_type: string;
	bot_id: string;
	workspace_name: string;
	workspace_icon: string | null;
	workspace_id: string;
	owner: {
		type: string;
		user: {
			object: string;
			id: string;
			name: string;
			avatar_url: string | null;
			type: string;
			person: Object;
		};
	};
};
