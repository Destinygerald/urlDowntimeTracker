// import type { I_Dashboard } from "../components/dashboard/main";
import { _downtimes, _getUrls } from "./dummydata";
import axios from "axios";
import { getCookie } from "./utils";

// type t_UrLresponse = {
//     status: number,
//     data: I_Dashboard[]
// }

type addUrlParams = {
    url: string,
    duration: string
}

export async function fetchDowntimes(id:string):Promise<any> {
    try {
        // const result = await _downtimes()
        const cookie = getCookie("auth_token")
        const result:any = await axios.get(`${import.meta.env.VITE_API_URL}/api/url/${id}/downtimes`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })
        return result.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}

export async function urlInfo(id:string):Promise<any> {
    try {
        // const result = await _downtimes()
        const cookie = getCookie("auth_token")
        const result:any = await axios.get(`${import.meta.env.VITE_API_URL}/api/url/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })
        return result.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}

export async function getUrls ():Promise<any> {
    try {
        // const result = await _getUrls()
        const cookie = getCookie("auth_token")
       
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/url`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })
        return result.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}


export async function addSiteToWatch (siteinfo: addUrlParams) {
    try {
        const cookie = getCookie("auth_token")
        
        const response:any = await axios.post(`${import.meta.env.VITE_API_URL}/api/url/add`, {
            ...siteinfo }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })

        return response.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}

export async function deleteSiteFromWatch (id: string) {
    try {
        const cookie = getCookie("auth_token")
        
        const response:any = await axios.delete(`${import.meta.env.VITE_API_URL}/api/url/delete/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })

        return response.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}

export async function toggleWatch (id: string) {
    try {
        const cookie = getCookie("auth_token")
        
        const response:any = await axios.put(`${import.meta.env.VITE_API_URL}/api/url/toggle-watch/${id}`, {} , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookie
            }
        })

        return response.data;
    } catch (err) {
        console.log(err)
        return ({ status: 'failed', message: err })
    }
}