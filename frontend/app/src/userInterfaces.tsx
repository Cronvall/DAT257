interface AuthProviderProps {
	
	// onLogin function saves the token to this key
	localStorageTokenKeyName?: string;
	
	// onLogin function reads the token by this key
	authTokenKeyName?: string;
	
	// Initially reads token from local storage.
	initialCheckToken?: boolean;
	
	// User info data.
	user?: UserInfo;
	
	//Call this when a user logged in successfully
	onLogin?: (info: UserInfo) => void;
	
	//Call this when a user want to log out
    onLogout?: () => void;
}

interface  UserInfo {
	
    username?: string;
    token?: string;

	//Sets true when onLogin function called
    isLoggedIn: boolean;

	//Any data for user
    userInfo?: any;
}

interface IUseAuth {

	//For update token
    setToken: (token: string) => void,

	//Make user logged in
    login: (data: any) => void,
	
	//Make user logged out
    logout: () => void,

	//Sets user info
    setUser: (user: UserInfo) => void,

	//User info
    user: UserInfo,

	//Updates when login function called
    isLoggedIn: boolean;

	//Active token for user
    token: string

}

