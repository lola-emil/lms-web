import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { environment } from '../../../../../../environments/environment';


export type ClassSection = {
  id: number;
  sectionName: string;

  classLevel: {
    id: number;
    level: number;
  };
};

export type ClassLevel = {
  id: number;
  level: number;
};



@Injectable({
  providedIn: 'root'
})
export class ClassSectionService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  getSections() {
    return this.apollo.watchQuery<{ classSections: ClassSection[]; }>({
      query: gql`
          query ClassSections {
              classSections {
                  id
                  sectionName
                  classLevel {
                      id
                      level
                  }
              }
          }
        `,
      fetchPolicy: "no-cache"
    }).valueChanges;
  }


  submitSection(body: Partial<{
    classLevelId: number;
    sectionName: string;
  }>) {
    return this.http.post(`${environment.apiURL}/graphql-ext/add-section`, body);
  }


    getGradeLevels() {
      return this.apollo.watchQuery<{ classLevels: ClassLevel[]; }>({
        query: gql`
          query ClassLevels {
              classLevels {
                  id
                  level
              }
          }
        `
      }).valueChanges;
    }


}
