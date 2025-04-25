import { Injectable } from '@angular/core';
import { CrudRepo } from './crud-repo';
import { HttpClient } from '@angular/common/http';

export interface Question {
  id: number; // Primary key, Auto Increment
  question_text: string; // Text field for the question content
  subject_item_id: number; // Foreign key to the subject_items table
  question_type: 'multiple-choice' | 'true-or-false' | 'fill-in-blank'; // Enum for question type
  created_at: string; // ISO string format for the date and time
  updated_at: string; // ISO string format for the date and time (updated on change)
}
@Injectable({
  providedIn: 'root'
})
export class QuestionsRepoService extends CrudRepo<Question> {

  constructor(http: HttpClient) {
    super(http, "curriculum", "questions");
  }
}
