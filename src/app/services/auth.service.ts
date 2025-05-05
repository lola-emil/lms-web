import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    return this.http.post(`${environment.apiURL}/auth/sign-in`, { email, password });
  }

  setUserDetail(data: {
    // role: string;
    // token: string;
    // user_id: number;

    id: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    role: string;

    section_id: number;
  }) {
    localStorage.setItem("user_detail", JSON.stringify(data));
  }

  getUserDetail(): {
    id: number;
    firstname: string;
    middlename?: string;
    lastname: string;
    email: string;
    role: string;
    section_id: number;

  } {
    return JSON.parse(localStorage.getItem("user_detail") ?? "{}");
  }

  signOut() {
    localStorage.removeItem("user_detail");
  }
}
