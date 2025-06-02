import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type StudentSection = {
  id: number;
  studentId: number;
  classSectionId: number;
  schoolYearId: number;
  createdAt: string;
  updatedAt: string;
};


export type StudentSubject = {
  id: number;
  teacherSubject: {
    id: number;
    subject: {
      id: number;
      title: string;
      coverImgUrl?: string;
      gradeLevel: {
        level: number;
      };
    },
    subjectMaterials: { id: number; }[];
    teacher: {
      firstname: string;
      lastname: string;
    };
  };
};

export type TeacherSubjectSection = {
  id: number;
  teacherSubjectId: number;
  classSectionId: number;
  createdAt: string;
  updatedAt: string;
  teacherSubject: {
    id: number;
    subjectId: number;
    teacherId: number;
    createdAt: string;
    updatedAt: string;
    subjectMaterials: { id: number; }[];
    teacher: {
      firstname: string;
      lastname: string;
    },
    subject: {
      id: number;
      title: string;
      coverImgUrl: string;
      classLevelId: number;
      createdAt: string;
      updatedAt: string;
      gradeLevel: {
        level: number;
      };
    };
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
  subject: {id: number, title: string, coverImgUrl: string, gradeLevel: {level: number}}
  teacher: {firstname: string, lastname: string}
  subjectMaterials: SubjectMaterial[];
}


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }

  getEnrolledSubjects(sectionId: number) {
    return this.apollo.watchQuery<{ teacherSubjectSectionsPerSection: TeacherSubjectSection[]; }>({
      query: gql`
        query TeacherSubjectSectionsPerSection {
            teacherSubjectSectionsPerSection(sectionId: ${sectionId}) {
                id
                teacherSubjectId
                classSectionId
                createdAt
                updatedAt
                teacherSubject {
                    id
                    subjectId
                    teacherId
                    createdAt
                    updatedAt
                    subjectMaterials {
                      id
                    }
                    teacher {
                      firstname
                      lastname
                    }
                    subject {
                        id
                        title
                        coverImgUrl
                        classLevelId
                        createdAt
                        updatedAt
                        gradeLevel {
                          level
                        }
                    }
                }
            }
        }
        `
    }).valueChanges;
  }

    getEnrolledSection() {
      const user = this.authService.getUserDetail();
      return this.apollo.watchQuery<{ studentCurrentEnrolledSection: StudentSection[]; }>({
        query: gql`
          query StudentEnrolledSections {
              studentCurrentEnrolledSection(studentId: ${user.id}) {
                  id
                  studentId
                  classSectionId
                  schoolYearId
                  createdAt
                  updatedAt
              }
          }
        `
      }).valueChanges;
    }
}
