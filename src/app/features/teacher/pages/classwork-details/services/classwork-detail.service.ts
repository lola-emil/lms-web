import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';

export type Attachment = {
  id: number;
  fileURL: string;

};

export type Student = {
  firstname: string;
  lastname: string;
};

export type Submission = {
  id: number;
  title: string;
  comment: string;
  createdAt: string;

  hps: number;

  score?: number;

  student: Student,
  attachments: Attachment[];
};

export type Assignment = {
  id: number;
  title: string;
  dueDate: string;
  hps: number;
  createdAt: string;
  assignmentSubmissions: Submission[]
};


@Injectable({
  providedIn: 'root'
})
export class ClassworkDetailService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }


  getSubmissions(assignmentId: number) {
    return this.apollo.watchQuery<{ assignment: Assignment; }>({
      query: gql`
        query Assignment {
            assignment(id: ${assignmentId}) {
                id
                title
                dueDate
                hps
                createdAt
                assignmentSubmissions {
                    id
                    title
                    comment
                    score
                    createdAt
                    attachments {
                        id
                        fileURL
                    }
                    student {
                        firstname
                        lastname
                    }
                }
            }
        }

      `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }


  addScore(body: {
    submissionId: number;
    score: number;
  }) {
    return this.http.post(`${environment.apiURL}/graphql-ext/score-assignment`, body);
  }
}
