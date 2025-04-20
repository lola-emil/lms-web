import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL = "http://localhost:8081/auth";

  constructor(
    private http: HttpClient
  ) { }

  signIn(body: Partial<{ email: string | null, password: string | null; }>) {
    return this.http.post<{ role: string; token: string; user_id: number; }>(`${this.apiURL}/sign-in`, body);
  }

  setUserDetail(payload: { role: string; token: string; user_id: number; }) {
    localStorage.setItem("user-detail", JSON.stringify(payload));
    return;
  }

  getUserDetail(): { role: string; token: string; user_id: number; } {
    const userDetail = JSON.parse(localStorage.getItem("user-detail") ?? "{}");
    return userDetail;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("user-detail");
  }
}
