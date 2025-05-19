import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Classwork, ClassworkService, Submission } from './services/classwork.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-classwork',
  imports: [DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './classwork.component.html',
  styles: ``
})
export class ClassworkComponent implements OnInit {

  @ViewChild("createActivityModal") createActivityModal!: ElementRef<HTMLDialogElement>;
  @ViewChild("submissionModal") submissionModal!: ElementRef<HTMLDialogElement>;

  teacherSubjectId?: number;

  classworkFormGroup = new FormGroup({
    title: new FormControl(""),
    instruction: new FormControl(""),

    hps: new FormControl(),
    due_date: new FormControl()
  });


  activities: (Classwork & { showSubmissions: boolean; })[] = [];

  constructor(
    private route: ActivatedRoute,
    private classworkService: ClassworkService
  ) {
    this.route.parent?.params.subscribe(val => {
      this.teacherSubjectId = parseInt(val["id"]);
    });
  }
  ngOnInit(): void {
    this.loadClassworks();
  }

  loadClassworks() {
    this.classworkService.getClassworks(this.teacherSubjectId ?? 0)
      .subscribe(val => {
        console.log(val);

        this.activities = val.data.assignments.map(val => ({
          ...val,
          showSubmissions: false
        }));

        this.activities.forEach(val => val.showSubmissions = false);
      });
  }

  showSubmissions(index: number) {
    this.activities[index].showSubmissions = true;
  }

  hideSubmissions(index: number) {
    this.activities[index].showSubmissions = false;
  }

  openModal() {
    this.createActivityModal.nativeElement.showModal();
  }

  closeModal() {
    this.createActivityModal.nativeElement.close();
  }


  getAvatar(seed: string): string {
    return createAvatar(pixelArt, { seed }).toDataUri();
  }

  selectedSubmission?: Submission;

  openSubmissionModal(submission: Submission) {
    console.log(submission);
    this.selectedSubmission = submission;
    this.submissionModal.nativeElement.showModal();
  }


  createClasswork() {
    const {
      title,
      instruction,
      due_date,
      hps
    } = this.classworkFormGroup.value;

    this.classworkService.createClasswork({
      title: title!,
      instructions: instruction!,
      dueDate: new Date(due_date).toISOString(),
      hps,
      teacherAssignedSubjectId: this.teacherSubjectId
    }).subscribe(res => {
      console.log(res);

      this.createActivityModal.nativeElement.close();
      this.loadClassworks();
    });
  }
}
