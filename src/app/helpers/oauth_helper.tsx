import {User} from "./basic_user";

export abstract class OAuthHelper {
    protected static readonly SIGN_IN_URL: string;
    protected static readonly AUTH_URL: string;
    protected static readonly USER_INFO_URL: string;
    protected static readonly CLIENT_ID: string;
    protected static readonly CLIENT_SECRET: string;

    protected access_token: string;
    protected refresh_token: string;

    private onLogin: (user: User) => void;
    private onLogout: () => void;

    constructor(onLogin: (user: User) => void, onLogout: () => void){
        this.onLogin = onLogin;
        this.onLogout = onLogout;
    }

    public signInWithToken(){
        this.signIn(false);
    }

    public signInNoToken(){
        this.signIn(true);
    }

    protected authSuccess(user: User){
        this.onLogin(user);
    }

    public logOut(){
        this.onLogout();
    }

    protected abstract signIn(continueIfTokenInvalid: boolean);

    protected abstract auth(authCode: string);

    protected abstract refreshToken();

    protected abstract getUser();
}