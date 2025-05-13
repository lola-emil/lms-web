import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export type Assignment = {
  id: number;
  title: string;
  instructions: string;
  dueDate: string;
  hps: number;
  createdAt: string;
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getAssignments(teacherSubjectId: number) {
    return this.apollo.watchQuery<{ assignments: Assignment[]; }>({
      query: gql`
        query Assignments {
            assignments(teacherSubjectId: ${teacherSubjectId}) {
                id
                title
                instructions
                dueDate
                hps
                createdAt
            }
        }
      `
    }).valueChanges;
  }
}
