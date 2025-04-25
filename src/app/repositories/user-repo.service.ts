import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile-repo.service';
import { CrudRepo } from './crud-repo';

export type User = {
  id: number;
  email: string;
  password: string;
  role_id: number;
  last_active: string;
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserRepoService extends CrudRepo<User> {
  constructor(override http: HttpClient) {
    super(http, 'user-management', 'users');
  }

  importFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("role", "teacher");
    formData.append("importFile", file);

    const req = new HttpRequest("POST", `http://localhost:8081/api/user-management/users/bulk`, formData, {
      reportProgress: true,
      responseType: "json"
    });

    return this.http.request(req);
  }
}
