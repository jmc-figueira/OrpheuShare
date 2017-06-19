import {remote} from "electron";

export class GoogleAuthHelper{
    private static readonly SIGN_IN_URL: string = "https://accounts.google.com/o/oauth2/v2/auth?";
    private static readonly AUTH_URL: string = "https://www.googleapis.com/oauth2/v4/token";
    private static readonly USER_INFO_URL: string = "https://www.googleapis.com/oauth2/v2/userinfo?";
    private static readonly CLIENT_ID: string = "683730810868-civpj04hcra5e49lljnsn6sbd81hc65t.apps.googleusercontent.com";
    private static readonly CLIENT_SECRET: string = "_T4JT1LHnZ0WXacM_CnrqSjn";

    private ACCESS_TOKEN: string;
    private REFRESH_TOKEN: string;

    private onLogin: () => void;
    private onLogout: () => void;

    constructor(onLogin: () => void, onLogout: () => void){
        this.onLogin = onLogin;
        this.onLogout = onLogout;

        if(localStorage.getItem("@OrpheuShare:AccessExpirationDate") !== null && parseInt(localStorage.getItem("@OrpheuShare:AccessExpirationDate")) > new Date().getTime()){
            this.ACCESS_TOKEN = localStorage.getItem("@OrpheuShare:AccessToken");
        }
        this.REFRESH_TOKEN = localStorage.getItem("@OrpheuShare:RefreshToken");
    }

    public googleSignInWithToken(){
        this.googleSignIn(false);
    }

    public googleSignInNoToken(){
        this.googleSignIn(true);
    }

    public googleSignIn(continueIfTokenInvalid: boolean){
        if(this.ACCESS_TOKEN){
            this.authWithToken(this.ACCESS_TOKEN);
            return;
        } else if(this.REFRESH_TOKEN && continueIfTokenInvalid){
            this.refreshToken(this.REFRESH_TOKEN);
            return;
        }

        if(continueIfTokenInvalid){
            let authWindow = new remote.BrowserWindow({
                parent: remote.getCurrentWindow(),
                modal: true,
                show: false,
                webPreferences: {
                    nodeIntegration: false,
                    sandbox: true,
                    webSecurity: false
                }
            });

            let queryConstructor = new URLSearchParams();
            queryConstructor.append("client_id", GoogleAuthHelper.CLIENT_ID);
            queryConstructor.append("response_type", "code");
            queryConstructor.append("scope", "openid profile email");
            queryConstructor.append("redirect_uri", "urn:ietf:wg:oauth:2.0:oob:auto");

            authWindow.loadURL(GoogleAuthHelper.SIGN_IN_URL + queryConstructor.toString());
            authWindow.once("ready-to-show", () => authWindow.show());

            authWindow.on("close", function(){
                authWindow = null;
            });

            authWindow.on("page-title-updated", function(event, title){
                if(title.indexOf("Success code") !== -1){
                    authWindow.destroy();
                    this.googleAuth(GoogleAuthHelper.queryToJSON(title.split("Success ")[1])["code"]);
                }
            }.bind(this));
        }
    }

    private googleAuth(authCode: string){
        let payload = {
            code: authCode,
            client_id: GoogleAuthHelper.CLIENT_ID,
            client_secret: GoogleAuthHelper.CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: "urn:ietf:wg:oauth:2.0:oob:auto"
        };

        $.ajax({
            type: "POST",
            url: GoogleAuthHelper.AUTH_URL,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            crossDomain: true,
            success: this.authSuccess.bind(this),
            data: payload
        });
    }

    private authSuccess(response){
        localStorage.setItem("@OrpheuShare:AccessToken", response.access_token);
        localStorage.setItem("@OrpheuShare:AccessExpirationDate", (new Date().getTime() + (response.expires_in * 1000)).toString());
        localStorage.setItem("@OrpheuShare:RefreshToken", response.refresh_token);
        
        this.authWithToken(response.access_token);
    }

    private refreshSuccess(response){
        localStorage.setItem("@OrpheuShare:AccessToken", response.access_token);
        localStorage.setItem("@OrpheuShare:AccessExpirationDate", (new Date().getTime() + (response.expires_in * 1000)).toString());

        this.authWithToken(response.access_token);
    }

    private authWithToken(token: string){
        $.ajax({
            type: "GET",
            url: GoogleAuthHelper.USER_INFO_URL,
            headers: {
                authorization: "Bearer " + token
            },
            success: this.onLogin
        });
    }

    private refreshToken(token: string){
        let payload = {
            refresh_token: token,
            client_id: GoogleAuthHelper.CLIENT_ID,
            client_secret: GoogleAuthHelper.CLIENT_SECRET,
            grant_type: "refresh_token",
        };

        $.ajax({
            type: "POST",
            url: GoogleAuthHelper.AUTH_URL,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            crossDomain: true,
            success: this.refreshSuccess.bind(this),
            data: payload
        });
    }

    public logOut(){
        localStorage.removeItem("@OrpheuShare:AccessToken");
        this.onLogout();
    }

    private static queryToJSON(query: string): object{
        let retVal: object = {};
        let params = query.split("&");
        for(let param of params){
            let kv = param.split("=");
            retVal[kv[0]] = decodeURIComponent(kv[1] || "");
        }

        return retVal;
    }
}