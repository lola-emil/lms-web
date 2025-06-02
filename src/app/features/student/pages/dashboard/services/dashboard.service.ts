import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from '../../../../../services/auth.service';

export type EnrolledSubjectsByStudentIdResponse = {
  enrolledSubjectsByStudentId: {
    id: string;
    teacherSubject: {
      id: string;
      subject: {
        id: string;
        title: string;
        coverImgUrl: string;
        gradeLevel: {
          level: number;
        };

      };
      subjectMaterials: {
        quizSessions: {}[];
      }[];
      teacher: {
        firstname: string;
        middlename: string;
        lastname: string;
        role: string;
      };
    };
  }[];
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

export type StudentSection = {
  id: number;
  studentId: number;
  classSectionId: number;
  schoolYearId: number;
  createdAt: string;
  updatedAt: string;
};


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private readonly apollo: Apollo,
    private authService: AuthService
  ) { }

  getEnrolledSubjects() {
    const userDetails = this.authService.getUserDetail();

    return this.apollo.watchQuery<EnrolledSubjectsByStudentIdResponse>({
      query: gql`
            query EnrolledSubjectsByStudentId {
              enrolledSubjectsByStudentId(studentId: ${userDetails.id}) {
                  id
                  teacherSubject {
                      subject {
                          id
                          title
                          coverImgUrl
                          gradeLevel{
                            level
                          }

                      }
                      subjectMaterials {
                        quizSessions {
                          id
                        }
                      }
                      teacher {
                          firstname
                          middlename
                          lastname
                          role
                      }
                      id
                  }
              }
          }
          `
    }).valueChanges;
  }


  getActivities() {
    return this.apollo.watchQuery({
      query: gql`
        query EnrolledSubjectsByStudentId {
            enrolledSubjectsByStudentId(studentId: 2) {
                teacherSubject {
                    subject {
                        title
                    }
                    assignments {
                        id
                        title
                        instructions
                        dueDate
                        hps
                        createdAt
                        updatedAt
                        assignmentSubmissions {
                            id
                            title
                            comment
                            assignmentId
                            studentId
                            score
                            createdAt
                            updatedAt
                        }
                    }
                }
            }
        }
      `
    }).valueChanges;
  }


  getSubjects(sectionId: number) {
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
