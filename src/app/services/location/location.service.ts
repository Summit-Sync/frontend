import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationDTO } from '../../models/LocationDTO';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  url: string = 'http://localhost:8080/api/v1/location';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<LocationDTO[]> {
    let location1: LocationDTO = {
      locationId: 1,
      room: 'west 1',
      street: 'Morgenstraße 2',
      postCode: '27816',
      country: 'Deutschland',
      email: 'filler@email.com',
      phone: '0148131564156156',
      mapsUrl: 'https://www.test.com/firstTest',
    };
    let location2: LocationDTO = {
      locationId: 2,
      room: 'east 2',
      street: 'Abendstraße',
      postCode: '27816',
      country: 'Deutschland',
      email: 'test@email.com',
      phone: '0156487947787853',
      mapsUrl: 'https://www.test.com/secondTest',
    };
    return of([location1, location2]);
    // return this.http.get<LocationDTO[]>(this.url);
  }
}
