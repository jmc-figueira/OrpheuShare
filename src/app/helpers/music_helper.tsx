export interface MusicHelper{
    getCurrentTrack(callback: (response: string) => void);
}