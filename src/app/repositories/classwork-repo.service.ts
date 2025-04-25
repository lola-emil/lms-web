import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';


export interface Classwork {
  id: number;
  title: string;
  instruction: string;
  teacher_subject_id: number;
  due_date: string;

  hps: number;

  created_at: string; // or Date if you're parsing it
  updated_at: string; // or Date
}

@Injectable({
  providedIn: 'root'
})
export class ClassworkRepoService extends CrudRepo<Classwork> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "classworks");
  }
}
