import { ApiHelper } from "./api.helper"

export  class DocumentServiceHelper {
    static route = "documents"

    static createDocument(data){
    
        return ApiHelper.makeRequest(this.route,
            ApiHelper.authorize(ApiHelper.makeRequestOption("POST",data), ApiHelper.getAccessToken()))
    }
    
    static deleteDocument(){
        return
    }
    
    static getDocuments(){
        return ApiHelper.makeRequest(this.route,ApiHelper.authorize(ApiHelper.makeRequestOption('GET'),ApiHelper.getAccessToken()))
    }

}