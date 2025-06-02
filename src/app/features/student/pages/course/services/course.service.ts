import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type StudentSubject = {
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title:  string;
    },
    teacher: {
      firstname: string;
      lastname: string;
    }
  }
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
  quizSessions: {
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
  subject: {id: number, title: string}
  teacher: {firstname: string, lastname: string}
  subjectMaterials: SubjectMaterial[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjectDetail(teacherSubjectId: number) {
    return this.apollo.watchQuery<{teacherSubject: TeacherSubject}>({
      query: gql`
        query TeacherSubject {
                teacherSubject(id: ${teacherSubjectId}) {
                  id
                subjectId
                teacherId
                schoolYearId
                createdAt
                updatedAt
                teacher {
                  firstname
                  lastname
                }
                subject {
                  title
                }
                subjectMaterials {
                    id
                    title
                    teacherSubjectId
                    materialType
                    content
                    createdAt
                    updatedAt
                    quizSessions {
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

      `
    }).valueChanges;
  }
}
