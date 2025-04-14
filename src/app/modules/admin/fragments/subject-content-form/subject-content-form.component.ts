import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from "@angular/forms";
import { Topic, TopicRepoService } from '../../../../repositories/topic-repo.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-content-form',
  imports: [ReactiveFormsModule],
  templateUrl: './subject-content-form.component.html',
  styles: ``
})
export class SubjectContentFormComponent implements AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];
  topicFormGroup: FormGroup;

  subjectId: string | null = null;

  topics: Topic[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private topicRepo: TopicRepoService,
  ) {
    this.topicFormGroup = new FormGroup({
      title: new FormControl("New Topic"),
      lessons: this.fb.array([this.createLessonField()])
    });


  }


  updateTopicForm(event: Event) {
    const target = event.target as HTMLSelectElement;
    console.log(target.value);
  }

  get lessonFields() {
    return this.topicFormGroup.get('lessons') as FormArray;
  }

  addLessonField() {
    this.lessonFields.push(this.createLessonField());
  }

  deleteLessonField(index: number) {
    this.lessonFields.removeAt(index);
  }

  createLessonField() {
    return this.fb.group({
      title: new FormControl(""),
      file_upload: new FormControl(null)
    });
  }

  submit() {
    console.log(this.topicFormGroup.value);
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.subjectId = params.get("id");
      console.log(this.subjectId);
    });

    this.subscriptions.push(
      this.topicRepo.get({
        subject_id: parseInt(this.subjectId ?? "")
      })
        .subscribe(val => {
          this.topics = val;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
