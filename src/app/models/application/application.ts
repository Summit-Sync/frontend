import { QualificationValidatorService } from "../../services/validation/qualification/qualification-validator/qualification-validator.service";
import { QualificationDTO } from "../qualification/QualificationDTO";

export interface TrainerApplication {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  qualificationDTOs: QualificationDTO[],
  subjectId: string
}
