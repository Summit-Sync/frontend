import { Qualification } from '../qualification/Qualification';
import { Trainer } from '../trainer/Trainer';
import {Contact} from "../contact/Contact";
import { Location } from '../location/Location';
import {TrainerApplication} from "../trainer/TrainerApplication";
import {GroupTemplate} from "../groupTemplate/GroupTemplate";
import {PostCourse} from "../course/PostCourse";
import {PostGroup} from "./PostGroup";

export class Group {
  constructor(
    public id: number,
    public canceled: boolean,
    public groupNumber: string,
    public finished: boolean,
    public title: string,
    public acronym: string,
    public description: string,
    public numberOfDates: number,
    public duration: number,
    public contact: Contact,
    public dates: Date[],
    public numberParticipants: number,
    public location: Location,
    public meetingPoint: string,
    public trainerPricePerHour: number,
    public pricePerParticipant: number,
    public requiredQualifications: Qualification[],
    public participantsPerTrainer: number,
    public trainers: TrainerApplication[],
    public totalPrice: number
  ) {}

  validate(): boolean {
    let result: boolean = true;
    if(!this.id || this.id < 0){
      result = false;
      console.error("Id darf nicht leer sein");

    }
    if(!this.title){
      result = false;
      console.error("Titel darf nicht leer sein");

    }
    if(!this.description){
      result = false;
      console.error("Abkürzung darf nicht leer sein");

    }
    if(this.numberOfDates < 1){
      result = false;
      console.error("Terminanzahl darf nicht leer sein");

    }
    if(this.duration < 1){
      result = false;
      console.error("Dauer darf nicht leer sein");

    }
    if(!this.contact.validate()){
      result = false;
    }
    if(this.dates.length === 0){
      result = false;
      console.error("Gruppen müssen Daten zugeordnet werden");

    }
    if(this.numberParticipants < 1){
      result = false;
      console.error("Gruppen muss mindestens ein Teilnehmer zugeordnet werden können");

    }
    if(!this.location.validate()){
      result = false;
    }
    if(!this.meetingPoint){
      result = false;
      console.error("Treffpunkt darf nicht leer sein");

    }
    if(this.trainerPricePerHour < 1){
      result = false;
      console.error("Trainerpreis darf nicht leer sein");

    }
    if(this.participantsPerTrainer < 1){
      result = false;
      console.error("Trainerschlüssel darf nicht leer sein");

    }
    if(this.totalPrice <= 0){
      result = false;
      console.error("Ein Kurs muss einen Gesamtpreis haben");

    }
    if (this.trainers.length === 0) {
      result = false;
      console.error("Trainerliste darf nicht leer sein");

    }
    if(!this.trainers.every(t => {
      return t.validate();
    })){
      result = false;
    }
    if(this.requiredQualifications.length === 0){
      result = false;
      console.error("Einer Gruppe müssen Qualifikationen zugeordnet werden");

    }
    if (
      !this.requiredQualifications.every((q) => {
        return q.validate();
      })
    ) {
      result = false;
    }

    return result;
  }

  /*
  createPostGroupFromTemplate(groupTemplate: GroupTemplate) {
    this.id = groupTemplate.id;
    this.canceled = false;
    this.groupNumber = '';
    this.finished = false;
    this.title = groupTemplate.title;
    this.acronym = groupTemplate.acronym;
    this.description = groupTemplate.description;
    this.numberOfDates = groupTemplate.numberOfDates;
    this.duration = groupTemplate.duration;
    this.contact = new Contact(0, '', '', '', '');
    this.dates = [];
    this.numberParticipants = 0;
    this.location = groupTemplate.location;
    this.meetingPoint = groupTemplate.meetingPoint;
    this.trainerPricePerHour = groupTemplate.trainerPricePerHour;
    this.pricePerParticipant = groupTemplate.pricePerParticipant;
    this.requiredQualifications = groupTemplate.requiredQualificationList;
    this.participantsPerTrainer = groupTemplate.participantsPerTrainer;
    this.trainers = new Array<TrainerApplication>();
    this.totalPrice = 0;
  }
   */

  GroupToPostGroup() {
    let postGroupPrices: number[] = [];
    let postGroupQualis: number[] = [];
    let postGroupLocation: number;
    //this.prices.forEach((price) => {
    //  postCoursePrices.push(price.id);
    //});
    let trainers: number[] = [];
    this.trainers.forEach(t => {
      trainers.push(t.id);
    })
    this.requiredQualifications.forEach((rq) => {
      postGroupQualis.push(rq.id);
    });
    postGroupLocation = this.location.locationId;

    return new PostGroup(
      this.title,
      this.acronym,
      this.description,
      this.numberOfDates,
      this.dates,
      this.duration,
      this.numberParticipants,
      this.contact,
      //postCoursePrices,
      postGroupLocation,
      this.meetingPoint,
      this.trainerPricePerHour,
      this.pricePerParticipant,
      postGroupQualis,
      this.participantsPerTrainer,
      trainers
    );

  }
}
