import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SubscriberInfo } from '../models/subscriber-info.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private http: HttpClient) {}

  api: string = 'https://lab.app.invertebrado.co/api/subscribers';

  getAllSubscribers(
    count: number,
    page: number,
    criteria?: string,
    sortType?: string,
    sortOrder?: string
  ): Observable<any> {
    let params = new HttpParams();
    if (criteria) {
      params = params.set('criteria', criteria);
    }
    if (sortType) {
      params = params.set('sortType', sortType);
    }
    if (sortOrder) {
      params = params.set('sortOrder', sortOrder);
    }
    return this.http.get(`${this.api}/?count=${count}&page=${page}`, {
      params,
    });
  }

  getSubscriberById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  createSubscriber(subscriber: any) {
    return this.http.post(this.api, subscriber);
  }

  updateSubscriber(subscriber: SubscriberInfo): Observable<any> {
    return this.http.put(`${this.api}/${subscriber.Id}`, subscriber);
  }

  deleteSubscriber(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
