import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Site } from '../models/site';

@Injectable({
  providedIn: 'root',
})
export class SiteService {

	baseurl = `http://localhost:5235/api/Sites`;
  constructor(private http: HttpClient) {
  }



  getSites(): Observable<any> {
	return this.http.get<Site[]>(this.baseurl);
  }

}
