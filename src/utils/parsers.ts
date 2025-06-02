export function parseDateTime (arg: number):string {
    return new Date(arg).toUTCString().split(" ").slice(0, 4).join(" ")
}

export function parseDateAndTime (arg: number):string {
    return new Date(arg).toUTCString().split(" ").slice(0, 5).join(" ")
}

export function parseTime (arg: number):string {
    return new Date(arg).toUTCString().split(" ").slice(4, 5).join(" ").split(":").slice(0, 2).join(":")
}