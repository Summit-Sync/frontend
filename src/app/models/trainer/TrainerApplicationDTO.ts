import { Qualification } from "../Qualification"

export type TrainerAPplicationDTO={
    id:string
    accepted:boolean
    firstName:string
    lastName:string
    email:string
    phone:string
    subjectId:string
    qualifications:Qualification[]
}