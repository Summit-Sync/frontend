import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationDTO } from '../../models/LocationDTO';
import { of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url:string="http://localhost:8080/api/v1/location"

  constructor(private http:HttpClient) { }

  getAllLocations():Observable<LocationDTO[]>{
    let location1:LocationDTO={
        locationId:1,
        room:'1',
        street:'1',
        postCode:'1',
        country:'1',
        email:'1',
        phone:'1',
        mapsUrl:'1'
    }
    let location2:LocationDTO={
      locationId:2,
      room:'2',
      street:'2',
      postCode:'2',
      country:'2',
      email:'2',
      phone:'2',
      mapsUrl:'2'
  }
    return of([location1,location2])
    // return this.http.get<LocationDTO[]>(this.url);
  }
}

