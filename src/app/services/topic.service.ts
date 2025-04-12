import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Topic = {
  id: number,
  subject_id: number,

  title: string,
  description: string,

  created_at: string,
  updated_at: string
};

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  apiURL = "http://localhost:8080/modules/academic-management";

  constructor(
    private http: HttpClient
  ) { }

    get(query: any) {
      const queryParams = new URLSearchParams(query);

      return this.http.get<Topic[]>(`${this.apiURL}/topics?${queryParams.toString()}`);
    }
}
