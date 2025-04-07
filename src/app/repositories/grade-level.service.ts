import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type GradeLevel = {
  id: number,
  grade_level: number,
};


@Injectable({
  providedIn: 'root'
})
export class GradeLevelService {
  apiURL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getGradeLevels() {
    return this.http.get<GradeLevel[]>(`${this.apiURL}/grade-levels`);
  }
}
