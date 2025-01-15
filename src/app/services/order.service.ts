import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

	baseurl = `http://localhost:5235/api/Orders`;
  constructor(private http: HttpClient) {
  }



  addOrder(order:any): Observable<any> {

    return this.http.post(this.baseurl, order);
  }

}
