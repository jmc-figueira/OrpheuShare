
export class SpotifyHelper{
    constructor(){

    }

    getTrackUrl(id: string, callback: (url: string) => void){
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/tracks/" + id,
            success: callback
        });
    }
}