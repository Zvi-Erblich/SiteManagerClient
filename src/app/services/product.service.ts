import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

	baseurl = `http://localhost:5235/api/Products`;
  constructor(private http: HttpClient) {
  }



  getProducts(): Observable<any> {
	return this.http.get<Product[]>(this.baseurl);
  }

}
