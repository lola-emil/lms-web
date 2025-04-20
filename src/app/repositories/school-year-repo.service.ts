import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';


export type SchoolYear = {
  id: number;
  start_year: number;
  end_year: number;

  created_at: string;
  updated_at: string;
};


@Injectable({
  providedIn: 'root'
})
export class SchoolYearRepoService extends CrudRepo<SchoolYear> {

  constructor(http: HttpClient) {
    super(http, "academic-management", "school-years");
  }
}
