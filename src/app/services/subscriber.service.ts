import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubscriberInfo } from '../models/subscriber-info.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private http: HttpClient) {}

  api: string = 'https://lab.app.invertebrado.co/api/subscribers';

  getAllSubscribers(): Observable<any> {
    return this.http.get(this.api);
  }

  getSubscriberById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  createSubscriber(subscriber: SubscriberInfo) {
    return this.http.post(this.api, subscriber);
  }

  updateSubscriber(subscriber: SubscriberInfo): Observable<any> {
    return this.http.put(this.api, subscriber);
  }

  deleteSubscriber(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
