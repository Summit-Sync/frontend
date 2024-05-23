import { StatusDTO } from '../status/Status';

export interface ParticipantDTO {
  id: number;
  name: string;
  firstName: string;
  status: StatusDTO;
  email: string;
  phone: string;
}
