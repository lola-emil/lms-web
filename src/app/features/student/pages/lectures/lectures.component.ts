import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseModuleService } from '../../services/course-module.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-lectures',
  imports: [RouterLink],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService
  ) {}

  lessons: any = [];

  ngOnInit(): void {
    const courseId = this.route.parent?.snapshot.paramMap.get("id")!;

    this.courseModuleService.getByCourseId(courseId)
    .pipe(
      tap(val => {
        this.lessons = (val as any).data;
      }),
    )
    .subscribe();
  }


}
