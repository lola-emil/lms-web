import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService, Assignment } from './services/activity.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-activities',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  teacherSubjectId?: number;
  activities2: Assignment[] = [];

  @ViewChild("activityModal") activityModal?: ElementRef<HTMLDialogElement>;

  comment = new FormControl("");

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private authService: AuthService
  ) {
    this.route.parent?.params.subscribe(val => this.teacherSubjectId = val['id']);

  }

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments() {
    const user = this.authService.getUserDetail();


      this.activityService.getAssignments(this.teacherSubjectId ?? 0, user.id)
        .subscribe(val => {
          this.activities2 = val.data.assignments;
        });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectedActivity: any = null;
  isModalOpen = false;
  submissionText = '';
  submittedFiles: File[] = [];

  openModal(activity: any) {
    this.selectedActivity = activity;
    this.activityModal?.nativeElement.showModal();
  }

  closeModal() {
    this.activityModal?.nativeElement.close();
    this.selectedActivity = null;
    this.submissionText = '';
    this.submittedFiles = [];
  }

  handleFileInput(event: any) {
    this.submittedFiles = Array.from(event.target.files);
  }

  submitActivity() {
    const user = this.authService.getUserDetail();
    this.activityService.submitActivity({
      assignmentId: this.selectedActivity.id,
      comment: this.comment.value ?? "",
      files: this.submittedFiles,
      studentId: user.id
    }).subscribe(val => {
      this.loadAssignments();
    });
    this.closeModal();
  }
}
