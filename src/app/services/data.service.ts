import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable()
export class DataService {

  #http = inject(HttpClient);

  constructor() { }

  isInstalled() {
    return of(true).pipe(delay(5000));
  }

}
