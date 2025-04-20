import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export type SubjectMaterial = {
  id: number;
  title: string;

  teacher_subject_id: number;
  subject_topic_id: number;

  file_url?: string;

  material_type: "lesson" | "quiz" | "video-quiz";

  material_order: number;


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
