import Axios from "axios";
import { getCurrentUser } from "@/utils/firebase-util";
import { User } from "firebase/auth";

//const baseURL = process.env.REACT_APP_API_URL;

export const apiCall = async () => {
  try {
    // Headers
    const headers: any = {
      Accept: "application/json",
      //"ngrok-skip-browser-warning": "1",
    };
    const user = (await getCurrentUser()) as User;
    if (user) {
      const token = await user.getIdToken();
      //const token = await auth?.currentUser?.getIdToken();
      headers.FIREBASE_AUTH_TOKEN = `${token}`;
    }

    // Create axios instance
    const baseURL = process.env.REACT_APP_API_URL;
    const axios = Axios.create({ baseURL, headers });
    // Add a request interceptor
    axios.interceptors.response.use(
      (data) => Promise.resolve(data),
      ({ response }) => {
        console.error(response);
        return Promise.reject(response);
      }
    );
    return axios;
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err);
  }
};
