import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type TeacherSubjectSection = {
  id: string;
  teacherSubjectId: string;
  classSectionId: string;
  schoolYearId: string;
  createdAt: string;
  updatedAt: string;
  classSection: {
    id: number;
    sectionName: string;
    classLevelId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type StudentEnrolledSections = {
  id: string;
  studentId: string;
  classSectionId: string;
  schoolYearId: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    email: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private apollo: Apollo
  ) { }

  getSections(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ teacherSubjectSectionsPerTeacher: TeacherSubjectSection[]; }>({
      query: gql`
        query TeacherSubjectSectionsPerTeacher {
            teacherSubjectSectionsPerTeacher(teacherSubjectId: ${teacherSubjectId}) {
                id
                teacherSubjectId
                classSectionId
                schoolYearId
                createdAt
                updatedAt
                classSection {
                  id
                  sectionName
                  classLevelId
                  createdAt
                  updatedAt
              }
            }
        }
      `
    }).valueChanges;
  }

  getStudents(sectionId: number) {
    return this.apollo.watchQuery<{ studentEnrolledSections: StudentEnrolledSections[]; }>({
      query: gql`
        query StudentEnrolledSections {
            studentEnrolledSections(sectionId: ${sectionId}) {
                id
                studentId
                classSectionId
                schoolYearId
                createdAt
                updatedAt
                student {
                    id
                    email
                    firstname
                    middlename
                    lastname
                    role
                    createdAt
                    updatedAt
                }
            }
        }
      `
    }).valueChanges;
  }
}
