import type { I_Dashboard } from "../components/dashboard/main"

const DOWNTIMES = [
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now(),
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now() - 20000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now()  - 30000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now()  - 39000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now() -  102000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now() -  202000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now() -  702000,
        to: 0,
        check_rate: 'hourly'
    },
    {
        from: Date.now() -  1002000,
        to: 0,
        check_rate: 'hourly'
    }
]

const DATA: I_Dashboard[] = [
    {
        id: "62927272802ij",
        url: "https://programming-lab-frontend.onrender.com",        
        date_added: new Date().setTime(Date.now() - (12*60*60*1000)),
        check_duration: "hourly",
        status: "Running",
        paused: true
    },
    {
        id: "629272728067s",
        url: "https://programming-lab-frontend.onrender.com",
        date_added: new Date().setTime(Date.now() - (22*60*60*1000)),
        check_duration: "hourly",
        status: "Running",
        paused: true
    },
    {
        id: "62927272802ij",
        url: "https://programming-lab-frontend.onrender.com",
        date_added: new Date().setTime(Date.now() - (26*60*60*1000)),
        check_duration: "hourly",
        status: "Running",
        paused: true
    },
    {
        id: "62927272802ij",
        url: "https://programming-lab-frontend.onrender.com",
        date_added: new Date().setTime(Date.now() - (32*60*60*1000)),
        check_duration: "hourly",
        status: "Running",
        paused: true
    },
    {
        id: "62927272802ij",
        url: "https://programming-lab-frontend.onrender.com",
        date_added: new Date().setTime(Date.now() - (44*60*60*1000)),
        check_duration: "hourly",
        status: "Running",
        paused: true
    }
]

export function _downtimes (timeout:number = 4000) {
    return new Promise((resolve, _) => {
        setTimeout(() => {
           resolve({ status: 200, data: [...DOWNTIMES] })
        }, timeout)
    })
}

export function _getUrls () {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve({ status: 200, data: [...DATA] })
        }, 3000)
    })
}

export function fakeLogin () {
    return new Promise ((resolve, _) => {
        setTimeout(() => {
           resolve({ status: "success", auth_token: "placeholder_auth_token" })
        }, 3000)
    })
}