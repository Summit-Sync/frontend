import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../models/location/Location';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl:string="http://localhost:8080/api/v1/location"

  constructor(private http:HttpClient) { }

  //Get
  getAllLocations(): Observable<Location[]>{
    return this.http.get<Location[]>(this.baseUrl)
  }

  getLocationById(id: number): Observable<Location>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.get<Location>(apiUrl);
  }

  //Put
  putLocation(id: number, location: Location): Observable<Location>{
    const apiUrl: string = `${this.baseUrl}/${id}`;
    return this.http.put<Location>(apiUrl, location);
  }

  //Post
  postLocation(location: Location): Observable<Location>{
    const apiUrl: string = `${this.baseUrl}`
    return this.http.post<Location>(apiUrl, location);
  }

  //Delete
  deleteLocationById(id: number): void{
    const apiUrl: string = `${this.baseUrl}/${id}`
    this.http.delete(apiUrl);
  }

  /*
  getAllLocations():Observable<Location[]>{
    let location1:Location={
        locationId:1,
        room:'1',
        street:'1',
        postCode:'1',
        country:'1',
        email:'1',
        phone:'1',
        mapsUrl:'1'
    }
    let location2:Location={
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
    // return this.http.get<Location[]>(this.url);
  }

   */
}

