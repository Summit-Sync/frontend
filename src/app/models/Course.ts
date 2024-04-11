import { Type } from '@angular/core';
import { Participant } from './Participant';
import { Price } from './Price';
import { Qualification } from './Qualification';
import { Trainer } from './Trainer';

export type Course = {
  id: number;
  courseTitle: string;
  acronym: string;
  courseNumber: number;
  description: string;
  datesCount: number;
  dates: Date[];
  duration: number;
  participantList: Participant[];
  waitList: Participant[];
  numberParticipants: number;
  numberWaitlist: number;
  priceList: Price[];
  place: string;
  trainerQualifications: Qualification[];
  trainers: Trainer[];
  notes: string;
  visible: boolean;
  canceled: boolean;
  finished: boolean;
};
