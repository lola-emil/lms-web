import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { catchError, Subscription, of, tap } from 'rxjs';
import { CoursesService, StudentSubject, TeacherSubject, TeacherSubjectSection } from './services/courses.service';
import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';
import { AvatarService } from '../../../../services/avatar.service';

@Component({
  selector: 'app-courses',
  imports: [DrawerComponent, TopbarComponent, RouterLink, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(
    private coursesService: CoursesService,
    private avatarService: AvatarService
  ) { }

  page: number = 1;
  pageItems: number = 9;

  enrolledSubjects: TeacherSubjectSection[] = [];

  searchQuery?: string;


  ngOnInit(): void {

    this.coursesService.getEnrolledSection()
      .subscribe(res => {
        console.log(res);
        const studentSection = res.data.studentCurrentEnrolledSection[0];

        this.coursesService.getEnrolledSubjects(studentSection.classSectionId)
          .subscribe(res => {
            console.log("Mga Subjects", res.data.teacherSubjectSectionsPerSection);

            this.enrolledSubjects = res.data.teacherSubjectSectionsPerSection;
          });
      });
  }

  ngOnDestroy(): void {
  }

  avatar(seed: any) {
    return this.avatarService.avatar(seed);
  }


  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  filterSubject() {
    const lowerQuery = this.searchQuery?.toLowerCase() ?? "";
    return this.enrolledSubjects.filter(subject =>
      subject.teacherSubject.subject.title.toLowerCase().includes(lowerQuery));
  }

}
