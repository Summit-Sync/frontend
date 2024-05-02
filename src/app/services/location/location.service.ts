import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Location } from '../../models/location/Location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrl: string = 'http://localhost:8080/api/v1/location';

  constructor(private http: HttpClient) {}

  //Get
  getAllLocations(): Observable<Location[]> {
    let location1: Location = new Location(
      1,
      'Morgenstraße 2',
      '27816',
      'Deutschland',
      'filler@email.com',
      '0148131564156156',
      'https://www.test.com/firstTest',
      'title 1',
      'city1'
    );
    let location2: Location = new Location(
      2,
      'Abendstraße',
      '27816',
      'Deutschland',
      'test@email.com',
      '0156487947787853',
      'https://www.test.com/secondTest',
      'title 2',
      'city2'
    );
    return of([location1, location2]);
    // return this.http.get<Location[]>(this.baseUrl);
  }

  getLocationById(id: number): Observable<Location> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Location>(apiUrl);
  }

  //Put
  putLocation(id: number, location: Location): Observable<Location> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Location>(apiUrl, location);
  }

  //Post
  postLocation(location: Location): Observable<Location> {
    const apiUrl: string = `${this.baseUrl}`;
    return this.http.post<Location>(apiUrl, location);
  }

  //Delete
  deleteLocationById(id: number): Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}
