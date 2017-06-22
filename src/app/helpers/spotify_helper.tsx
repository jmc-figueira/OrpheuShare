import {remote} from "electron";
import {MusicHelper} from "./music_helper";
import {OAuthHelper} from "./oauth_helper";
import { URLUtils } from "./url_utils";
import { User } from "./basic_user";

export class SpotifyHelper extends OAuthHelper implements MusicHelper{
    protected static readonly SIGN_IN_URL: string = "https://accounts.spotify.com/authorize";
    protected static readonly AUTH_URL: string = "https://accounts.spotify.com/api/token";
    protected static readonly USER_INFO_URL: string = "https://api.spotify.com/v1/me";
    protected static readonly CURRENTLY_PLAYING_URL: string = "https://api.spotify.com/v1/me/player/currently-playing";
    protected static readonly CLIENT_ID: string = "d866109607a2453f86e7b10b01b46392";
    protected static readonly CLIENT_SECRET: string = "506a6fdb4fa645169767f36f0b52fb28";

    constructor(onLogin: (user: User) => void, onLogout: () => void){
        super(onLogin, onLogout);

        if(localStorage.getItem("@OrpheuShare:SpotifyAccessExpirationDate") !== null && parseInt(localStorage.getItem("@OrpheuShare:SpotifyAccessExpirationDate")) > new Date().getTime()){
            this.access_token = localStorage.getItem("@OrpheuShare:SpotifyAccessToken");
        }
        this.refresh_token = localStorage.getItem("@OrpheuShare:SpotifyRefreshToken");
    }

    protected signIn(continueIfTokenInvalid: boolean){
        if(this.access_token){
            this.getUser();
            return;
        } else if(this.refresh_token){
            this.refreshToken();
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

            let query = new URLSearchParams();
            query.append("client_id", SpotifyHelper.CLIENT_ID);
            query.append("response_type", "code");
            query.append("scope", "user-read-currently-playing user-read-private user-read-email");
            query.append("redirect_uri", "http://localhost/token");
            query.append("show_dialog", "true");
            
            authWindow.loadURL(SpotifyHelper.SIGN_IN_URL + "?" + query.toString());
            authWindow.once("ready-to-show", () => {
                if(authWindow !== null)
                    authWindow.show();
            });

            authWindow.on("close", () => {
                authWindow = null;
            });

            authWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
                if(new URL(validatedURL).hostname === "localhost"){
                    authWindow.destroy();
                    this.auth(URLUtils.queryToJSON(validatedURL.split("?")[1])["code"])
                }
            });
        }
    }

    protected auth(authCode: string){
        let payload = {
            code: authCode,
            client_id: SpotifyHelper.CLIENT_ID,
            client_secret: SpotifyHelper.CLIENT_SECRET,
            grant_type: "authorization_code",
            redirect_uri: "http://localhost/token"
        };

        $.ajax({
            type: "POST",
            url: SpotifyHelper.AUTH_URL,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            crossDomain: true,
            success: this.onAuthSuccess.bind(this),
            data: payload
        });
    }

    private onAuthSuccess(response){
        localStorage.setItem("@OrpheuShare:SpotifyAccessToken", response.access_token);
        localStorage.setItem("@OrpheuShare:SpotifyAccessExpirationDate", (new Date().getTime() + (response.expires_in * 1000)).toString());
        localStorage.setItem("@OrpheuShare:SpotifyRefreshToken", response.refresh_token);

        this.access_token = response.access_token;
        this.refresh_token = response.refresh_token;

        this.getUser();
    }

    protected refreshToken() {
        let payload = {
            refresh_token: this.refresh_token,
            client_id: SpotifyHelper.CLIENT_ID,
            client_secret: SpotifyHelper.CLIENT_SECRET,
            grant_type: "refresh_token"
        };

        $.ajax({
            type: "POST",
            url: SpotifyHelper.AUTH_URL,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            crossDomain: true,
            success: this.refreshSuccess.bind(this),
            data: payload
        });
    }

    private refreshSuccess(response){
        localStorage.setItem("@OrpheuShare:SpotifyAccessToken", response.access_token);
        localStorage.setItem("@OrpheuShare:SpotifyAccessExpirationDate", (new Date().getTime() + (response.expires_in * 1000)).toString());

        this.access_token = response.access_token;
        
        this.getUser();
    }

    public logOut(){
        localStorage.removeItem("@OrpheuShare:SpotifyAccessToken");
        localStorage.removeItem("@OrpheuShare:SpotifyAccessExpirationDate");
        localStorage.removeItem("@OrpheuShare:SpotifyRefreshToken");
        super.logOut();
    }

    protected getUser(){
        $.ajax({
            type: "GET",
            url: SpotifyHelper.USER_INFO_URL,
            headers: {
                authorization: "Bearer " + this.access_token
            },
            success: this.processUser.bind(this)
        });
    }

    private processUser(response){
        let user = {
            name: response.display_name,
            profilePic: response.images[0].url
        };

        super.authSuccess(user);
    }

    getCurrentTrack(callback: (response: string) => void){
        $.ajax({
            type: "GET",
            url: SpotifyHelper.CURRENTLY_PLAYING_URL,
            success: callback
        });
    }

    getTrackUrl(id: string, callback: (url: string) => void){
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/tracks/" + id,
            success: callback
        });
    }
}