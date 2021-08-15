import Axios from "axios";

let API = Axios.create({
    baseURL: "/",
});

export default API;
