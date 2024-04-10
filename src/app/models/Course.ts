import { Participant } from './Participant';
import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export class Course {
  constructor(
    public id: number,
    public courseTitle: string,
    public acronym: string,
    public courseNumber: number,
    public description: string,
    public datesCount: number,
    public dates: Date[],
    public duration: number,
    public participantList: Participant[],
    public waitList: Participant[],
    public numberParticipants: number,
    public numberWaitlist: number,
    public priceList: Price[],
    public place: string,
    public trainerQualifications: Qualification[],
    public trainers: Trainer[],
    public notes: string,
    public visible: boolean,
    public canceled: boolean,
    public finished: boolean
  ) {}
}
