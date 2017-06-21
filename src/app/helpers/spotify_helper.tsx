import { MusicHelper } from "./music_helper";

export class SpotifyHelper extends OAuthHelper implements MusicHelper{
    private static readonly SIGN_IN_URL: string = "https://accounts.spotify.com/authorize";
    private static readonly AUTH_URL: string = "https://accounts.spotify.com/api/token";
    private static readonly CURRENTLY_PLAYING_URL: string = "https://api.spotify.com/v1/me/player/currently-playing";
    private static readonly CLIENT_ID: string = "d866109607a2453f86e7b10b01b46392";
    private static readonly CLIENT_SECRET: string = "506a6fdb4fa645169767f36f0b52fb28";

    private access_token: string;
    private refresh_token: string;

    private onLogin: () => void;
    private onLogout: () => void;

    constructor(onLogin: () => void, onLogout: () => void){
        super(onLogin, onLogout);

        if(localStorage.getItem("@OrpheuShare:SpotifyAccessExpirationDate") !== null && parseInt(localStorage.getItem("@OrpheuShare:SpotifyAccessExpirationDate")) > new Date().getTime()){
            this.access_token = localStorage.getItem("@OrpheuShare:SpotifyAccessToken");
        }
        this.refresh_token = localStorage.getItem("@OrpheuShare:SpotifyRefreshToken");
    }

    public signInWithToken(){
        this.signIn(false);
    }

    public signInNoToken(){
        this.signIn(true);
    }

    private authenticate(){
        
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