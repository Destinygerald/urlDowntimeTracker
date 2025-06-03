// import { fakeLogin } from "./dummydata";
import { getCookie, setCookie } from "./utils";
import axios from "axios";

export type t_response = {
    status: string;
    auth_token: string;
}

export async function Auth (): Promise<t_response | void | any> {
    try {
        // const response = await fakeLogin();
        // return response as t_response;
        const auth:any = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth`)
        setCookie(auth?.auth_token as string, "auth_token")

        return auth;

    } catch (err) {
        console.error(err);
        return;
    }
}

export async function Profile () {
    try {
        const cookie = getCookie("auth_token")

        const profile =  await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })
        return profile;
    } catch (err) {
        console.error(err);
        return;
    }
}