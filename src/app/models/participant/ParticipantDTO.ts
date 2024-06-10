import { StatusDTO } from '../status/StatusDTO';

export interface ParticipantDTO {
  id: number;
  name: string;
  firstName: string;
  status: StatusDTO;
  email: string;
  phone: string;
}
