import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { DrawerComponent } from "../../../student/components/drawer/drawer.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditLessonService, Lesson, Subject } from './services/edit-lesson.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-edit-lesson',
  imports: [TopbarComponent, DrawerComponent, ReactiveFormsModule, QuillModule],
  templateUrl: './edit-lesson.component.html',
  styles: ``
})
export class EditLessonComponent implements OnInit {
  subjects: Subject[] = [];
  lesson?: Lesson;
  submitInProgress = false;

  subjectId: number;
  lessonId: number;


  subject = new FormControl<number | null>(null);
  title = new FormControl("");
  content = new FormControl("");

  files: File[] = [];

  constructor(
    private editLessonService: EditLessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const param = this.route.snapshot.queryParamMap;
    this.subjectId = parseInt(param.get("subject_id") ?? "");
    this.lessonId = parseInt(param.get("lesson_id") ?? "");
    this.subject = new FormControl(this.subjectId);
  }


  ngOnInit(): void {
    this.editLessonService.getSubjects()
      .subscribe(val => {
        this.subjects = val.data.subjects;
      });

    this.editLessonService.getLesson(this.lessonId).subscribe(res => {
      this.lesson = res.data.subjectMaterial;

      this.subject = new FormControl(this.lesson.subject.id);
      this.title = new FormControl(this.lesson.title);
      this.content = new FormControl(this.lesson.content);
    });
  }

  submit() {
    this.submitInProgress = true;
    this.editLessonService.updateLesson({
      title: this.title.value,
      subjectId: this.lesson?.subjectId,
      content: this.content.value,
      subjectMaterialId: this.lesson?.id
    }).pipe(
      tap(res => {
        this.submitInProgress = false;
        this.router.navigate(['/admin', 'lesson-content', this.lesson?.id]);
      }),
      catchError(errRes => {
        this.submitInProgress = false;
        return of(null);
      })
    ).subscribe();
  }


  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files) return;

    this.files = Array.from(input.files);

    console.log(this.files);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
