import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../models/client';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsUrl = environment.apiUrl + 'clients';
  private clientUrl = environment.apiUrl + 'client/';
  private trainerUrl = environment.apiUrl + 'trainers';

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
  }

  getClient(clientName): Observable<Client> {
    return this.http.get<Client>(this.clientUrl + clientName);
  }

  getTrainers(): Observable<Client[]> {
    return this.http.get<Client[]>(this.trainerUrl);
  }
}
