import { ParticipantDTO } from '../participant/ParticipantDTO';
import { QualificationDTO } from '../qualification/QualificationDTO';
import { CourseTemplateDTO } from '../courseTemplate/CourseTemplate';
import { StatusDTO } from '../status/Status';
import { CategoryPriceDTO } from '../price/CategoryPriceDTO';
import { PostCourseDTO } from './PostCourse';
import { UpdateCourseDTO } from './UpdateCourse';
import { TrainerDTO } from '../trainer/Trainer';
import { LocationDTO } from '../location/LocationDTO';

export interface CourseDTO {
  id: number,
  title: string,
  acronym: string,
  courseNumber: string,
  description: string,
  dates: Date[],
  duration: number,
  participants: ParticipantDTO[],
  waitList: ParticipantDTO[],
  numberParticipants: number,
  numberWaitlist: number,
  numberTrainers: number,
  prices: CategoryPriceDTO[],
  location: LocationDTO,
  meetingPoint: string,
  requiredQualifications: QualificationDTO[],
  trainers: TrainerDTO[],
  notes: string,
  visible: boolean,
  canceled: boolean,
  finished: boolean

  // deleteEmptyParticipants(participantsList: ParticipantDTO[]) {
  //   participantsList.splice(
  //     0,
  //     participantsList.length,
  //     ...participantsList.filter((p) => p.firstName !== '')
  //   );
  // }

  // fillParticipantsList(
  //   participantsList: ParticipantDTO[],
  //   maxParticipants: number
  // ): void {
  //   for (let i = participantsList.length; i < maxParticipants; i++) {
  //     participantsList.push(
  //       new Participant(i, '', '', new Status(0, ''), '', '')
  //     );
  //   }
  // }
}
