import { fakeLogin } from "./dummydata";

export type t_response = {
    status: string;
    auth_token: string;
}

export async function Auth (): Promise<t_response | void> {
    try {
        const response = await fakeLogin();
        return response as t_response;
    } catch (err) {
        console.error(err);
        return;
    }
}