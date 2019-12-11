import { Injectable } from '@angular/core';
import { Client } from '../../models/client';
import { ClientService } from '../client/client.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentClient: Client = {
    _id: "",
    name: "",
    password: "",
    email: "",
    age: null,
    height: null,
    weight: null,
    sport: "",
    role: "",
    location: "",
    bio: ""
  };

  private currentClientSource;
  globalCurrentClient;
  clients: Client[];

  constructor(
    private clientService: ClientService
  ) {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients()
    .subscribe(
      clients => {
        console.log(this.clients);
        this.clients = clients;
      }
    )
  }

  login(clientInfo: Client): boolean {
    this.getClients();
    this.currentClient = new Client();

    for(var i = 0; i < this.clients.length; i++) {
      if(this.clients[i].name === clientInfo.name && this.clients[i].password === clientInfo.password) {
        this.currentClient = this.clients[i];
        this.setCurrentClient(this.currentClient);
        return true;
      } else {
        return false;
      }
    }
  }

  setCurrentClient(client: Client) {
    this.currentClient = client;
    this.currentClientSource = new BehaviorSubject(this.currentClient);
    this.globalCurrentClient = this.currentClientSource.asObservable();
    this.globalCurrentClient.subscribe(
      client => {
        console.log(client);
      }
    )
  }
}
