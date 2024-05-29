import { Injectable } from '@angular/core';
import { ParticipantDTO } from '../../models/participant/ParticipantDTO';

@Injectable({
  providedIn: 'root',
})
export class ParticipantListServiceService {
  constructor() {}

  deleteEmptyParticipants(participantsList: ParticipantDTO[]) {
    participantsList.splice(
      0,
      participantsList.length,
      ...participantsList.filter((p) => p.firstName !== '')
    );
  }
  fillParticipantsList(
    participantsList: ParticipantDTO[],
    maxParticipants: number
  ): void {
    for (let i = participantsList.length; i < maxParticipants; i++) {
      let p: ParticipantDTO = {
        id: i,
        name: '',
        firstName: '',
        status: {
          statusId: 0,
          text: '',
        },
        phone: '',
        email: '',
      };
      participantsList.push(p);
    }
  }
}
