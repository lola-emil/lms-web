import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Subject = {
  id: number;
  title: number;
  classLevelId: number;
  teacherSubjects: TeacherSubject[];
};

export type TeacherSubject = {
  id: number;
  teacher: Teacher;
  createdAt: string;
  subject: Subject
};

export type TeacherSubjectSection = {
  id: number;
  teacherSubjectId: number;
  classSectionId: number;
  teacherSubject: TeacherSubject;
  classSection: {
    id: number;
    sectionName: string;
    classLevelId: number;
    classLevel: {
      level: number;
    };
  };
};

export type Teacher = {
  id: number;
  email: string;
  firstname: string;
  middlename?: string;
  lastname: string;
};

export type ClassSection = {
  id: number;
  sectionName: string;
  classLevel: {
    level: number;
  };
};

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getTeacherSubjects(subjectId: number) {
    return this.apollo.watchQuery<{ subject: Subject; }>({
      query: gql`
        query Subjects {
            subject(id: ${subjectId}) {
              id
                teacherSubjects {
                  id
                  createdAt
                    teacher {
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
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }


  getTeachers(subjectId: number) {
    return this.apollo.watchQuery<{ unassignedTeachers: Teacher[]; }>({
      query: gql`
        query TeacherSubject {
            unassignedTeachers(subjectId: ${subjectId}) {
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

  getSections(levelId: number) {
    return this.apollo.watchQuery<{
      classSectionsPerLevel: ClassSection[],
      teacherSubjectSections: TeacherSubjectSection[];
    }>({
      query: gql`
        query ClassSections {
            classSectionsPerLevel(classLevelId: ${levelId}) {
                id
                sectionName
                classLevel {
                    level
                }
            }
            teacherSubjectSections {
                id
                classSectionId
                teacherSubjectId
                teacherSubject {
                  id
                  subject {
                    id
                  }
                }
            }

        }
      `
    }).valueChanges;
  }

  getTeacherSections(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ teacherSubjectSectionsPerTeacher: TeacherSubjectSection[]; }>({
      query: gql`
        query TeacherSubjectSectionsPerTeacher {
            teacherSubjectSectionsPerTeacher(teacherSubjectId: ${teacherSubjectId}) {
                id
                teacherSubjectId
                classSectionId
                classSection {
                    id
                    sectionName
                    classLevelId

                    classLevel {
                      id
                      level
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

  getSubject(id: number) {
    return this.apollo.watchQuery<{ subject: Subject; }>({
      query: gql`
        query ClassSections {
            subject(id: ${id}) {
                id
                title
                coverImgUrl
                classLevelId
                createdAt
                updatedAt
            }
        }
      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }

  addTeacher(body: {
    subjectId: number;
    teacherId: number;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/add-teacher-to-subject`, body);
  }

  assignNewSubject(body: Partial<{
    teacherSubjectId: number;
    classSectionId: number;
  }>) {
    return this.http.post(`${environment.apiURL}/graphql-ext/assign-teacher-section`, body);
  }
}
