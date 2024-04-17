import { StatusDTO } from "../status/StatusDTO"

export type ParticipantDTO={
    id:number
    name:string
    firstName:string
    status:StatusDTO
    email:string
}