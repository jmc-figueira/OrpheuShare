abstract class OAuthHelper{
    private static readonly SIGN_IN_URL: string
    private static readonly AUTH_URL: string
    private static readonly CLIENT_ID: string;
    private static readonly CLIENT_SECRET: string;

    private access_token: string;
    private refresh_token: string;

    private onLogin: () => void;
    private onLogout: () => void;

    constructor(onLogin: () => void, onLogout: () => void){
        this.onLogin = onLogin;
        this.onLogout = onLogout;
    }

    public abstract signInWithToken();

    public abstract signInNoToken();

    protected abstract signIn(continueIfTokenInvalid: boolean);
}