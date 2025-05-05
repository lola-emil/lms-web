import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewRef } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SubjectDetailService, TeacherAssignedSubject2Response } from './services/subject-detail.service';
import { catchError, of, Subscription, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MeetingService } from './services/meeting.service';

@Component({
  selector: 'app-subject-detail',
  imports: [DrawerComponent, TopbarComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  @ViewChild("createActivityModal") createActivityModal!: ElementRef<HTMLDialogElement>;

  teacherSubjectId?: number;


  data?: TeacherAssignedSubject2Response;

  constructor(
    private route: ActivatedRoute,
    private subjectDetailService: SubjectDetailService,
    private meetingService: MeetingService
  ) {
    this.route.params.subscribe(val => this.teacherSubjectId = val['id']);
  }

  ngOnInit(): void {
    if (this.teacherSubjectId)
      this.subscriptions.push(
        this.subjectDetailService.getSubjectDetail(this.teacherSubjectId)
          .pipe(
            tap(val => {
              this.data = val.data;
            }),
            catchError(res => {
              console.log(res);
              return of(null);
            })
          )
          .subscribe()
      );
  }

  initateMeeting() {
    this.meetingService.authorize()
      .subscribe(val => {
        console.log(val);
        location.href = val.redirect_url
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe());
  }

  openModal() {
    this.createActivityModal.nativeElement.show();
  }

  closeModal() {
    this.createActivityModal.nativeElement.close();
  }
}
