// import { fakeLogin } from "./dummydata";
import { getCookie } from "./utils";
import axios from "axios";

export type t_response = {
    status: string;
    auth_token: string;
}

export async function Auth (): Promise<t_response | void | any> {
    try {
       
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth`

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
        return profile.data;
    } catch (err) {
        console.error(err);
        return;
    }
}