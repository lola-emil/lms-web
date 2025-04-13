import { Component, OnDestroy, OnInit } from '@angular/core';
import { GradeLevel, GradeLevelRepoService } from '../../../../repositories/grade-level-repo.service';
import { Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-form',
  imports: [ReactiveFormsModule],
  templateUrl: './subject-form.component.html',
  styles: ``
})
export class SubjectFormComponent implements OnInit, OnDestroy {
  subjectFormGroup: FormGroup;

  subscriptions: Subscription[] = [];
  gradeLevels: GradeLevel[] = [];

  constructor(
    private fb: FormBuilder,
    private gradeLevelRepo: GradeLevelRepoService
  ) {
    this.subjectFormGroup = new FormGroup({
      title: new FormControl(""),
      grade_level: new FormControl(""),
      description: new FormControl(""),

      topics: this.fb.array([this.createTopic()])
    });
  }

  get topics(): FormArray {
    return this.subjectFormGroup.get('topics') as FormArray;
  }

  addTopicForm() {
    this.topics.push(this.createTopic());
  }

  createTopic(): FormGroup {
    return this.fb.group({

    });
  };

  ngOnInit(): void {
    this.subscriptions.push(
      this.gradeLevelRepo.get()
        .subscribe(val => {
          this.gradeLevels = val;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
