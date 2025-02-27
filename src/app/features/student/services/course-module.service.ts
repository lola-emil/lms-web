import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type PaginationOpt = {
  _page?: number,
  _per_page?: number
};

@Injectable({
  providedIn: 'root'
})
export class CourseModuleService {
  apiURL = "http://localhost:3000/course-modules"
  constructor(private http: HttpClient) { }

  
  get(opt?: PaginationOpt) {
    if (opt) {
      opt._page = opt._page ?? 1;
      opt._per_page = opt._per_page ?? 10
    }
    return this.http.get(this.apiURL);
  }

  getById(id: number | string) {
    return this.http.get(this.apiURL + "/" + id);
  }
}
