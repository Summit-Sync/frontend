import { Injectable } from '@angular/core';
import { PostTrainerDTO } from '../../../../models/trainer/PostTrainer';

@Injectable({
  providedIn: 'root'
})
export class PostTrainerValidatorService {

  constructor() { }

  validate(data: PostTrainerDTO): boolean{
    let result: boolean = true;
    if(!data.username){
      result = false;
      console.error("Benutzername darf nicht leer sein");
      
    }
    if(!data.firstName){
      result = false;
      console.error("Vorname darf nicht leer sein");
      
    }
    if(!data.lastName){
      result = false;
      console.error("Nachname darf nicht leer sein");
      
    }
    if(!data.password){
      result = false;
      console.error("Passwort darf nicht leer sein");
      
    }
    if(!data.email){
      result = false;
      console.error("E-Mail darf nicht leer sein");
      
    }
    if(!data.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");
      
    }
    return result;
  }
}
