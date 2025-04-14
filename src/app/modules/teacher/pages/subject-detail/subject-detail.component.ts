import { Component, OnInit } from '@angular/core';
import { TeacherLayoutComponent } from "../../layout/teacher-layout/teacher-layout.component";
import { DatePipe } from '@angular/common';
import { UserProfile, UserProfileRepoService } from '../../../../repositories/user-profile-repo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-subject-detail',
  imports: [TeacherLayoutComponent, DatePipe],
  templateUrl: './subject-detail.component.html',
  styles: ``
})
export class SubjectDetailComponent implements OnInit {

  enrolledTeachers: UserProfile[] = [];

  constructor(
    private userProfileRepo: UserProfileRepoService
  ) { }

  ngOnInit(): void {
    this.userProfileRepo.get({ limit: 5, offset: 5 })
      .pipe(
        tap(val => {
          this.enrolledTeachers = val;
        })
      )
      .subscribe();
  }

}
