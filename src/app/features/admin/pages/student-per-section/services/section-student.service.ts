import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Student = {
  id: number;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
};

export type StudentSection = {
  student: Student;
};

export type Section = {
  id: number;
  sectionName: string;
  classLevel: {
    level: number;
  };
};

@Injectable({
  providedIn: 'root'
})
export class SectionStudentService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  loadSection(sectionId: number) {
    return this.apollo.watchQuery<{ classSection: Section; }>({
      query: gql`
        query ClassSection {
            classSection(id: ${sectionId}) {
                id
                sectionName
                classLevel {
                    level
                }
            }
        }
      `
    }).valueChanges;
  }

  loadStudents() {
    return this.apollo.watchQuery<{ unEnrolledStudents: Student[]; }>({
      query: gql`
        query UnEnrolledStudents {
            unEnrolledStudents {
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
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  loadSectionStudents(sectionId: number) {
    return this.apollo.watchQuery<{ studentEnrolledSections: StudentSection[]; }>({
      query: gql`
        query StudentEnrolledSections {
            studentEnrolledSections(sectionId: ${sectionId}) {
              student {
                id
                email
                firstname
                middlename
                lastname
              }
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  enrollStudentToSection(body: Partial<{
    studentId: number;
    sectionId: number;
  }>) {
    return this.http.post(`${environment.apiURL}/graphql-ext/enroll-student-to-section`, body);
  }
}
