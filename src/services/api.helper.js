import { CacheService } from "./cache";

let api_base_url = process.env.REACT_APP_BASE_URL ?? "http://localhost:3000/";
export const ApiHelper = {
  makeRequest: (route: String, request_option: RequestOption) => {
    return fetch(api_base_url + "" + route, request_option)
      .then((res) => {
        if (!res.ok) throw new Error("Not 2xx response");
        return res;
      })
      .then((res) => res.json());
  },

  getAccessToken: () => {
    let auth_info = CacheService.getItem("auth_info");

    if (!!auth_info && Object.keys(auth_info).includes("token")) return auth_info.token;
  },

  authorize: (requestOption: RequestOption, access_token: String): RequestOption => {
    if (!!!access_token) throw new Error("Invalid paramenter not provided");

    requestOption["headers"]["Authorization"] = `Bearer ${access_token}`;
    return requestOption;
  },

  makeRequestOption: (method: String, payload: Object = null): requestOption => {
    let result: RequestOption = {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };

    if (!!payload) {
      result.body = parsePayload(payload);
    }

    if( ['PATH','POST'].includes(method.toUpperCase()) && payload instanceof FormData){
      delete result.headers['Content-Type']
    }
    

    switch (method.toUpperCase()) {
      case "PATCH":
        result = Object.assign({ mode: "cors" }, result);

        break;
      case "POST":
        
        break;
      default:
        break;
    }

    return result;
  },
};

function parsePayload(payload) {
  if (payload instanceof FormData) return payload;
  else return JSON.stringify(payload);
}
