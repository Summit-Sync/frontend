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
  getAllLocationDTOs(): Observable<LocationDTO[]> {
    return this.http.get<LocationDTO[]>(this.baseUrl);
  }

  getLocationDTOById(id: number): Observable<LocationDTO> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<LocationDTO>(apiUrl);
  }

  //Put
  putLocationDTO(id: number, location: LocationDTO): Observable<LocationDTO> {    
    console.log(location);
    
    let apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<LocationDTO>(apiUrl, location);
  }

  //Post
  postLocationDTO(location: LocationDTO): Observable<LocationDTO> {
    const apiUrl: string = `${this.baseUrl}`;
    return this.http.post<LocationDTO>(apiUrl, location);
  }

  //Delete
  deleteLocationDTOById(id: number): Observable<void> {
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(apiUrl);
  }
}
