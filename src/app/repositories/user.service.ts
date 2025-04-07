import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type EnrolledSubjectField = {
  subject_id: number;
  grade_level_id: number;
  grade_section_id: number;
};

export type StudentInfoField = {
  student_no?: string;
  grade_level_id: number;
  grade_section_id: number;
};

export type UserBody = {
  firstname: string;
  middlename?: string;
  lastname: string;
  address?: string;
  email: string;
  password: string;

  role_id: number;

  enrolled_subjects?: EnrolledSubjectField[];
  student_info: StudentInfoField;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  addUser(body: UserBody) {
    return this.http.post(`${this.apiURL}/users`, body);
  }

  getUsers() {
    return this.http.get(`${this.apiURL}/users`);
  };

  userCount() {
    return this.http.get(`${this.apiURL}/users/count`);
  }
}
