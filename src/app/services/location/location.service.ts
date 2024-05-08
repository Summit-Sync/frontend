import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Location } from '../../models/location/Location';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrl: string = `${environment.serviceUrl}/location`;

  constructor(private http: HttpClient) {}

  //Get
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  getLocationById(id: number): Observable<Location> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Location>(apiUrl);
  }

  //Put
  putLocation(id: number, location: Location): Observable<Location> {    
    console.log(location);
    
    let apiUrl: string = `${this.baseUrl}/${id}`;
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
