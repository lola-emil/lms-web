import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActivityService, Assignment } from './services/activity.service';


// interface Activity {
//   id: number;
//   title: string;
//   description: string;
//   type: 'Project' | 'Assignment' | 'Live Session';
//   postedDate: string;
//   dueDate?: string;
// }

@Component({
  selector: 'app-activities',
  imports: [CommonModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  studentSubjectId?: number;
  activities2: Assignment[] = [];

  @ViewChild("activityModal") activityModal?: ElementRef<HTMLDialogElement>;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {
    this.route.parent?.params.subscribe(val => this.studentSubjectId = val['id']);
  }

  ngOnInit(): void {
    this.activityService.getAssignments(this.studentSubjectId ?? 0)
      .subscribe(val => {
        this.activities2 = val.data.assignments;
        console.log(val.data);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  activities = [
    {
      id: 1,
      title: "📖 Math Assignment 1",
      description: "Solve the given problems",
      dueDate: "2025-03-10",
      postedDate: "2025-03-01",
      score: 95 // Already graded
    },
    {
      id: 2,
      title: "🧪 Science Report",
      description: "Write a report on climate change",
      dueDate: "2025-03-15",
      postedDate: "2025-03-03",
      score: null // Not yet graded
    }
  ];

  selectedActivity: any = null;
  isModalOpen = false;
  submissionText = '';
  submittedFiles: File[] = [];

  openModal(activity: any) {
    this.selectedActivity = activity;
    this.activityModal?.nativeElement.showModal();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedActivity = null;
    this.submissionText = '';
    this.submittedFiles = [];
  }

  handleFileInput(event: any) {
    this.submittedFiles = Array.from(event.target.files);
  }

  submitActivity() {
    console.log("📝 Submitted Text:", this.submissionText);
    console.log("📂 Submitted Files:", this.submittedFiles);
    this.closeModal();
  }
}
