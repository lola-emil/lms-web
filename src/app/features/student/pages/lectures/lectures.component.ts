import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseModuleService } from '../../services/course-module.service';
import { Observable, switchMap, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lectures',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lectures.component.html',
  styleUrl: './lectures.component.css'
})
export class LecturesComponent {
  lessons$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private courseModuleService: CourseModuleService
  ) {
    this.lessons$ = this.route.parent!.params.pipe(
      map(param => param['id']),
      switchMap(courseId => this.courseModuleService.getByCourseId(courseId)),
      map(response => (response as any).data)
    );
  }
}
