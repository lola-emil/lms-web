import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type PaginationOpt = {
  _page?: string,
  _per_page?: string
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiURL = "http://localhost:3000/courses"
  constructor(private http: HttpClient) { }

  get(opt?: PaginationOpt) {

    let query = new URLSearchParams({
      _page: opt?._page || "1",
      _per_page: opt?._per_page || "10"
    });

    console.log(query.toString());

    return this.http.get(this.apiURL + "?" + query.toString());
  }

  getById(id: number | string) {
    return this.http.get<any>(this.apiURL + "/" + id);
  }



}
