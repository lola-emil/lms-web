import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type Subject = {
  id: number;
  title: string;
  coverImgUrl?: string;
  classLevelId: number;
  createdAt: string;
  updatedAt: string;

  subjectMaterials: {
    id: number;
    title?: string;
    materialType: string;
    fileURL?: string;
    mdContentId?: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type TeacherAssignedSubject = {
  id: number;
  schoolYearId: number;
  subject: {
    id: number;
    title: string;
    classLevelId: number;
  };
  subjectMaterials: {
    id: number;
    title: string;
    materialType: "MODULE" | "QUIZ";
    content: string;
    createdAt: string;
    updatedAt: string;
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class SubjectDetailService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getSubjectDetail(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ teacherAssignedSubject: TeacherAssignedSubject; }>({
      query: gql`
        query TeacherAssignedSubject {
            teacherAssignedSubject(id: ${teacherSubjectId}) {
                id
                schoolYearId
                subject {
                    id
                    title
                    classLevelId
                }
                subjectMaterials {
                        id
                        title
                        materialType
                        content
                        createdAt
                        updatedAt
                }
            }
        }

      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }
}
