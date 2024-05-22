import { Injectable } from '@angular/core';
import { PostLocationDTO } from '../../../../models/location/PostLocationDTO';

@Injectable({
  providedIn: 'root'
})
export class PostLocationValidatorService {

  constructor() { }

  validate(data: PostLocationDTO): boolean{
    let result: boolean = true;
    if(!data){
      result = false;
      console.error('Location darf nicht leer sein');
      
    }
    if(!data.title){
      result = false;
      console.error("Titel darf nicht leer sein");
      
    }
    if(!data.street){
      result = false;
      console.error("Straße darf nicht leer sein");
      
    }
    if(!data.postCode){
      result = false;
      console.error("Postleitzahl darf nicht leer sein");
      
    }
    if(!data.email){
      result = false;
      console.error("E-Mail darf nicht leer sein");
      
    }
    if(!data.phone){
      result = false;
      console.error("Telefonnummer darf nicht leer sein");
      
    }
    if(!data.country){
      result = false;
      console.error("Land darf nicht leer sein");
      
    }
    if(!data.mapsUrl){
      result = false;
      console.error("Maps Url darf nicht leer sein");
      
    }
    if(!data.city){
      result = false;
      console.error("Stadt darf nicht leer sein");
      
    }
    return result;
  }
}
