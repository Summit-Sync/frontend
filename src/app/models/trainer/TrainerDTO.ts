import { Qualification } from "../Qualification"

export type TrainerDTO={
    id:number
    subjectId:string
    firstName:string
    lastName:string
    email:string
    phone:string
    qualifications:Qualification[]
}