import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Assignment, ClassworkDetailService, Submission } from './services/classwork-detail.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-classwork-details',
  imports: [DrawerComponent, TopbarComponent, ReactiveFormsModule],
  templateUrl: './classwork-details.component.html',
  styles: ``
})
export class ClassworkDetailsComponent implements OnInit {
  classworkId?: number;

  @ViewChild("submissionDetailModal") submissionDetailModal!: ElementRef<HTMLDialogElement>;

  constructor(
    private route: ActivatedRoute,
    private classworkService: ClassworkDetailService
  ) {
    this.route.params.subscribe(val => this.classworkId = parseInt(val["id"]));
  }

  assignment?: Assignment;

  submissions: Submission[] = [];


  ngOnInit(): void {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.classworkService.getSubmissions(this.classworkId!)
      .subscribe(res => {
        this.assignment = res.data.assignment;
        this.submissions = res.data.assignment.assignmentSubmissions;
      });
  }

  selectedSubmission?: Submission;
  score = new FormControl<number | null>(null);
  editingScore = false;


  editScore() {
    this.editingScore = true;
  }


  showSubmissionDetail(index: number) {
    this.selectedSubmission = this.submissions[index];
    this.submissionDetailModal.nativeElement.showModal();
  }

  resetModal() {
    this.editingScore = false;
    this.score.setValue(null);
    this.selectedSubmission = undefined;
  }

  addScore() {
    this.classworkService.addScore({
      submissionId: this.selectedSubmission?.id!,
      score: this.score.value!
    }).pipe(
      tap(res => {
        this.submissionDetailModal.nativeElement.close();
        this.loadSubmissions();
      }),
      catchError(errRes => {
        console.log(errRes);
        return of(null);
      })
    ).subscribe();
  }
}

