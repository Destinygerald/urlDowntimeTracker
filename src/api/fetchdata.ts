import type { I_Dashboard } from "../components/dashboard/main";
import { _downtimes, _getUrls } from "./dummydata";

type t_UrLresponse = {
    status: number,
    data: I_Dashboard[]
}

export async function fetchDowntimes(params:string):Promise<any> {
    const result = await _downtimes()
    return result;
}

export async function getUrls ():Promise<t_UrLresponse> {
    const result = await _getUrls()
    return result as t_UrLresponse;
}