import axios from "axios";
import JWTService from "./JWTService";
class ApiService {
    static setConfig () {
        this.token = JWTService.getToken()
        axios.defaults.baseURL = 'http://localhost:8000/api'
        this.config = {
            headers : {
              'Authorization' : `Bearer ${this.token}`
             }
    };
}
    static get (url) {
        this.setConfig();
        return axios.get(url , this.config)
    }
    static post (url,data) {
        this.setConfig();
        return axios.post(url ,data, this.config)
    }
    static patch (url,data) {
        this.setConfig();
        return axios.patch(url , data,this.config)
    }
    static delete (url) {
        this.setConfig();
        return axios.delete(url , this.config)
    }
}

export default ApiService