import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubjectLessonService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }


  deleteMaterial(id: number) {
    return this.http.delete(`${environment.apiURL}/graphql-ext/delete-material/${id}`);
  }
}
