import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type GradeSectionBody = {
  grade_level_id?: number | null,
  section_name?: string | null;
};


export type GradeSection = {
  id: number,

  grade_level_id: number,
  section_name: string,

  created_at: string,
  updated_at: string,
};

@Injectable({
  providedIn: 'root'
})
export class GradeSectionService {
  apiURL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  addGradeSection(body: GradeSectionBody) {
    return this.http.post(`${this.apiURL}/grade-sections`, body);
  }

  getGradeSections(levelId: string) {
    const query = new URLSearchParams();
    query.append("grade_level_id", levelId);

    return this.http.get<GradeSection[]>(`${this.apiURL}/grade-sections?${query.toString()}`);
  }

  count() {
    return this.http.get<{ count: number; }>(`${this.apiURL}/grade-sections/count`);
  }
}
