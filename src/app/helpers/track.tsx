export interface Track{
    name: string,
    artists: Array<string>,
    uri: string,
    album_art: string,
    length: number,
    playing: {timestamp: number} | false
}