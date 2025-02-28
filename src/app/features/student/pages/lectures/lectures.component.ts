import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseModule, CourseModuleService } from '../../services/course-module.service';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-lectures',
  imports: [RouterLink],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService
  ) {}


  lessons: any = [];

  courseModuleSubscription?: Subscription;

  ngOnInit(): void {
    const courseId = this.route.parent?.snapshot.paramMap.get("id")!;

    this.courseModuleSubscription =
    this.courseModuleService.getByCourseId(courseId)
    .pipe(
      tap(val => {
        this.lessons = (val as any).data;
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.courseModuleSubscription?.unsubscribe();
    console.log("🔫 Destroyed")
  }
}
