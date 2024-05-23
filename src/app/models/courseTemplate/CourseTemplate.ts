import { LocationDTO } from '../location/LocationDTO';
import { CategoryPriceDTO } from '../price/CategoryPriceDTO';
import { QualificationDTO } from '../qualification/QualificationDTO';

export interface CourseTemplateDTO {
  id: number,
  title: string,
  acronym: string,
  description: string,
  numberOfDates: number,
  duration: number,
  numberParticipants: number,
  numberWaitlist: number,
  price: CategoryPriceDTO[],
  meetingPoint: string,
  requiredQualifications: QualificationDTO[],
  numberTrainers:number,
  location:LocationDTO
}
