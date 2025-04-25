import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type SubjectMaterial = {
  id: number;
  title: string;

  file_url?: string;

  type: "document" | "quiz" | "video";
  subject_id: number;


  material_order: number;


  created_by: number;
  updated_by: number;

  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root'
})
export class SubjectMaterialRepoService extends CrudRepo<SubjectMaterial> {

  constructor(http: HttpClient) {
    super(http, "subject-management", "subject-materials");
  }
}
