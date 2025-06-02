import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from '../../../../../services/auth.service';

export type TeacherSubject = {
  id: number;
  teacherId: number;
  subject: {
    title: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class DocEditorService {

  constructor(
    private readonly apollo: Apollo,
    private readonly http: HttpClient,
    private authService: AuthService
  ) { }

  getSubjects() {
    const user = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ teacherSubjectsPerTeacher: TeacherSubject[]; }>({
      query: gql`
        query TeacherSubject {
            teacherSubjectsPerTeacher(teacherId: ${user.id}) {
                id
                teacherId
                schoolYearId
                subject {
                    title
                }
            }
        }
      `
    }).valueChanges;
  }


  uploadMaterial(data: {
    files: File[],
    title: string | null;
    teacherSubjectId: number | null;
    content: string | null;
  }) {

    console.log(data);
    const formData = new FormData();

    data.files.forEach(data => formData.append("files", data));

    formData.append("title", data.title ?? "");
    formData.append("content", data.content ?? "");
    formData.append("teacherSubjectId", data.teacherSubjectId + "");


    return this.http.post(`${environment.apiURL}/graphql-ext/upload-subject-material`, formData);
  }
}
