import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, of } from 'rxjs';
import { environment } from '@env/environment';
import { Location } from '@models/location.model';

@Injectable()
export class DataService {
  #http = inject(HttpClient);

  constructor() {}

  isInstalled() {
    return of(true).pipe(delay(5000));
  }

  getLocations(){
    console.log('getLocations');
    const path = `${environment.API_URL}/api/v1/locations`;
    return this.#http.get<Location[]>(path)
    .pipe(delay(5000));
  }
}
