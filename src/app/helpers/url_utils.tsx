export class URLUtils{
    public static queryToJSON(query: string): object{
        let retVal: object = {};
        let params = query.split("&");
        for(let param of params){
            let kv = param.split("=");
            retVal[kv[0]] = decodeURIComponent(kv[1] || "");
        }

        return retVal;
    }
}