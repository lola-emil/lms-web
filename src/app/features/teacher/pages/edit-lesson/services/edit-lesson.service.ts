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

export type Lesson = {
  id: number;
  title: string;
  subjectId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};


@Injectable({
  providedIn: 'root'
})
export class EditLessonService {

  constructor(
    private readonly apollo: Apollo,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSubjects() {
    const user = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ teacherAssignedSubjectsByTeacherId: TeacherSubject[]; }>({
      query: gql`
        query Subject {
            teacherAssignedSubjectsByTeacherId(teacherId: ${user.id}) {
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


  getLesson(lessonId: number) {
    return this.apollo.watchQuery<{ subjectMaterial: Lesson; }>({
      query: gql`
        query SubjectMaterial {
            subjectMaterial(id: ${lessonId}) {
                id
                title
                content
                createdAt
                updatedAt
                teacherSubject {
                  id
                  subject {
                    id
                    title
                    createdAt
                    updatedAt
                  }
                }
            }
        }
        `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  updateLesson(body: {
    title?: string | null;
    content?: string | null;
    subjectId?: number | null;
    subjectMaterialId?: number | null;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/update-lesson`, body);
  }
}
