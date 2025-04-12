import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Subject = {
  id: number,

  grade_level_id: number,
  subject_name: string,

  creatd_at: string,
  updated_at: string
};


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  apiURL = "http://localhost:8080/modules/academic-management";

  constructor(
    private http: HttpClient
  ) { }

  getSubjectOverview() {
    return this.http.get(`${this.apiURL}/subjects`);
  }

  getSubjects(query: any) {
    const queryParams = new URLSearchParams(query);

    return this.http.get<Subject[]>(`${this.apiURL}/subjects?${queryParams.toString()}`);
  }
}
