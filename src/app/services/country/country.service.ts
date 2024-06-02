import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  api: string = 'https://lab.app.invertebrado.co/api/countries';

  getAllCountries(
    count?: number,
    page?: number,
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
}
