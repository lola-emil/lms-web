import { Component, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { LectureContentService, SubjectMaterial } from './services/lecture-content.service';

@Component({
  selector: 'app-lecture-content',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './lecture-content.component.html',
  styleUrl: './lecture-content.component.css'
})
export class LectureContentComponent implements OnInit {

  material?: SubjectMaterial;
  materialId?: number;
  studentSubjectId?: number;

  constructor(
    private router: ActivatedRoute,
    private lectureContentService: LectureContentService
  ) {
    this.router.params.subscribe(val => this.materialId = val["id"]);

    this.router.queryParams.subscribe(val => this.studentSubjectId = val['studentSubjectId']);
  }


  ngOnInit(): void {
    this.lectureContentService.getLessonContent(this.materialId ?? 0)
      .subscribe(val => {
        this.material = val.data.subjectMaterial;
      });
  }

}
