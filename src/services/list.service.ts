import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../types/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getData`);
  }

  saveData(data: List): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  deleteData(name: String): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteItem/${name}`);
  }
}
