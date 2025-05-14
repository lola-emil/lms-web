import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Subject = {
  id: number;
  title: string;
};

@Injectable({
  providedIn: 'root'
})
export class DocEditorService {

  constructor(
    private readonly apollo: Apollo,
    private readonly http: HttpClient
  ) { }

  getSubjects() {
    return this.apollo.watchQuery<{ subjects: Subject[]; }>({
      query: gql`
        query Subjects {
            subjects {
                id
                title
            }
        }
      `
    }).valueChanges;
  }




  uploadMaterial(data: {
    files: File[],
    title: string | null;
    subjectId: number | null;
    content: string | null;
  }) {

    console.log(data);
    const formData = new FormData();

    data.files.forEach(data => formData.append("files", data));

    formData.append("title", data.title ?? "");
    formData.append("content", data.content ?? "");
    formData.append("subjectId", data.subjectId + "");


    return this.http.post(`${environment.apiURL}/graphql-ext/upload-subject-material`, formData);
  }
}
