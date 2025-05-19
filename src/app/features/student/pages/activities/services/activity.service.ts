import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Assignment = {
  id: number;
  title: string;
  instructions: string;
  dueDate: string;
  hps: number;
  createdAt: string;
  studentSubmissions: {
    id: number;
    comment?: string;
    createdAt: string;
    score?: string;
    updatedAt: string;
    feedback: {
      id: number;
      comment?: string;
      mark: number,
      createdAt: string;
    }[]
  }[]
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private readonly apollo: Apollo,
    private readonly http: HttpClient
  ) { }

  getAssignments(teacherSubjectId: number, studentId: number) {
    return this.apollo.watchQuery<{ assignments: Assignment[]; }>({
      query: gql`
        query Assignments {
            assignments(teacherSubjectId: ${teacherSubjectId}) {
                id
                title
                instructions
                teacherAssignedSubjectId
                dueDate
                hps
                createdAt
                studentSubmissions(studentId: ${studentId}) {
                    id
                    comment
                    score
                    createdAt
                    updatedAt
                    feedback {
                        id
                        comment
                        mark
                        teacherId
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

  submitActivity(body: {
    comment: string;
    studentId: number;
    assignmentId: number;
    files: File[];
  }) {
    const formData = new FormData();

    body.files.forEach(data => formData.append("files", data));

    formData.append("comment", body.comment);
    formData.append("studentId", body.studentId + "");
    formData.append("assignmentId", body.assignmentId + "");

    return this.http.post(`${environment.apiURL}/graphql-ext/submit-assignment`, formData);
  }
}
