import API from "./api"
import store from "./store";

let methods = {
    getAPI(url) {
        return API.get(`${store.state.config ? store.state.config.api : ''}${url}`);
    },
    postAPI(url, data) {
        return API.post(`${store.state.config ? store.state.config.api : ''}${url}`, data);
    }
}

export default methods;