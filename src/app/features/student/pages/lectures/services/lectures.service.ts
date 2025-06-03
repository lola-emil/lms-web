import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type StudentSubject = {
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title: string;
    };
    subjectMaterials: {
      id: number;
      title?: string;
      materialType: any;
      createdAt: string;
      updatedAt: string;
      quizSessions: {
        id: number;
        createdAt: string;
        score: number;
      }[];
      questions: { id: number; }[];
    }[];
  };
};

export interface SubjectMaterial {
  id: string;
  title: string;
  teacherSubjectId: string;
  materialType: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  questions: { id: number; }[];
  studentQuizSessions: {
    id: number;
    createdAt: string;
    score: number;
  }[];
}

export interface TeacherSubject {
  id: string;
  subjectId: string;
  teacherId: string;
  schoolYearId: string;
  createdAt: string;
  updatedAt: string;
  subject: { id: number, title: string; };
  subjectMaterials: SubjectMaterial[];
}

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }

  getMaterials(teacherSubjectId: number) {
    const user = this.authService.getUserDetail();
    return this.apollo.watchQuery<{ teacherSubject: TeacherSubject; }>({
      query: gql`
        query TeacherSubject {
            teacherSubject(id: ${teacherSubjectId}) {
                id
                subjectId
                teacherId
                schoolYearId
                createdAt
                updatedAt
                subjectMaterials {
                    id
                    title
                    teacherSubjectId
                    materialType
                    content
                    createdAt
                    updatedAt
                    studentQuizSessions(studentId: ${user.id}) {
                      id
                      createdAt
                      score
                    }
                    questions {
                      id
                    }
                }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }
}
