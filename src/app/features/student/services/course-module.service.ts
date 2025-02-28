import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type PaginationOpt = {
  _page?: string,
  _per_page?: string
};

export interface CourseModule {
  id: number,
  title: string,
  duration: string,
  course_id: number,
  done: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CourseModuleService {
  apiURL = "http://localhost:3000/course_modules"
  constructor(private http: HttpClient) { }

  
  get(opt?: PaginationOpt) {

    let query = new URLSearchParams({
      _page: opt?._page || "1",
      _per_page: opt?._per_page || "10"
    });

    return this.http.get<CourseModule>(this.apiURL + "?" + query.toString());
  }

  getById(id: number | string) {
    return this.http.get<CourseModule>(this.apiURL + "/" + id);
  }

  getByCourseId(courseId: number | string, opt?: PaginationOpt) {

    let query = new URLSearchParams({
      _page: opt?._page || "1",
      _per_page: opt?._per_page || "10",
      course_id: courseId + ""
    });

    return this.http.get(this.apiURL + "?" + query.toString());
  }
}
