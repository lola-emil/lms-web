import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type GradeLevel = {
  id: number,
  level: number;
};

@Injectable({
  providedIn: 'root'
})
export class GradeLevelRepoService extends CrudRepo<GradeLevel> {

  constructor(http: HttpClient) {
    super(http, "academic-management", "grade-levels");
  }
}
