import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }



  requestChangePassword(newPassword: string) {
    const userDetail = this.authService.getUserDetail();
    return this.http.post<{
      id: number;
      message: string;
      email: string;
      expiry: string;
    }>(`${environment.apiURL}/graphql-ext/request-user-update`, {
      password: newPassword,
      userId: userDetail.id
    });
  }

  confirmChangePassword(body: {
    updateRequestId: number;
    code: number;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/confirm-user-update`, body);
  }
}
