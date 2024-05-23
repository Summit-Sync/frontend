import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationDTO } from '../../models/location/LocationDTO';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrl: string = `${environment.serviceUrl}/location`;

  constructor(private http: HttpClient) {}

  //Get
  getAllLocations(): Observable<LocationDTO[]> {
    return this.http.get<LocationDTO[]>(this.baseUrl);
  }

  getLocationById(id: number): Observable<LocationDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<LocationDTO>(apiUrl);
  }

  //Put
  putLocation(id: number, location: LocationDTO): Observable<LocationDTO> {    
    console.log(location);
    
    let apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<LocationDTO>(apiUrl, location);
  }

  //Post
  postLocation(location: LocationDTO): Observable<LocationDTO> {
    const apiUrl: string = `${this.baseUrl}`;
    return this.http.post<LocationDTO>(apiUrl, location);
  }

  //Delete
  deleteLocationById(id: number): Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}
