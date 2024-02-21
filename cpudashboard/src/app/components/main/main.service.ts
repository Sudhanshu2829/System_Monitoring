// main.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) { }

  getSystemInfo(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/system');
  }
}
