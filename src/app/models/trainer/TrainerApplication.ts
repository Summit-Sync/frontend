import { QualificationDTO } from "../qualification/QualificationDTO"
export interface TrainerApplicationDTO {
    id: number,
    accepted: boolean,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    subjectId: string,
    qualifications: QualificationDTO[]
  
}
