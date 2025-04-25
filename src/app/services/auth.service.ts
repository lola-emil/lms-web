import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  signIn(email: string, password: string) {
    return this.http.post(`${this.apiURL}/auth/sign-in`, { email, password });
  }

  setUserDetail(data: {
    role: string;
    token: string;
    user_id: number;
  }) {
    localStorage.setItem("user_detail", JSON.stringify(data));
  }

  getUserDetail(): {
    role: string;
    section_id: number;
    token: string;
    user_id: number;
  } {
    return JSON.parse(localStorage.getItem("user_detail") ?? "{}");
  }

  signOut() {
    localStorage.removeItem("user_detail");
  }
}
