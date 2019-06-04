import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(null, error => {
  const isExpected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!isExpected) {
    logger.log(error);
    toast.error("Unexpected Error");
  }
  return Promise.reject(error);
});

export function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJWT
};
