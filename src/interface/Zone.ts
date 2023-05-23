export interface Zone{
    fee: number
    id: number
    title:string
    tag:string
    address:string
    lng:number
    lat:number
    numberOfSpaces:number
    availableSpaces:number
    startsAt:string
    endsAt:string
}

export interface Space{
    id:number
    number:number
    state : "AVAILABLE" | "TAKEN" 
}