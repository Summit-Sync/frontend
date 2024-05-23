import { QualificationDTO } from '../qualification/QualificationDTO';

export interface TrainerDTO {
    id: number,
    subjectId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    qualifications: QualificationDTO[]
}
