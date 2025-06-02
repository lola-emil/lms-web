import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, SubjectDetailService } from './services/subject-detail.service';

@Component({
  selector: 'app-subject-detail-page',
  imports: [DrawerComponent, TopbarComponent, CommonModule, RouterLink, ReactiveFormsModule, RouterOutlet, RouterLinkActive],
  templateUrl: './subject-detail-page.component.html',
  styles: ``
})
export class SubjectDetailPageComponent implements OnInit {
  lessons$!: Observable<any>;

  @ViewChild("uploadModal") uploadModal!: ElementRef<HTMLDialogElement>;


  subjectId: any;

  subjectDetail: Subject | null = null;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private subjectDetailService: SubjectDetailService
  ) {
    this.route.params.subscribe(val => this.subjectId = val['id']);
  }

  ngOnInit(): void {
    this.subjectDetailService.getSubjectDetail(this.subjectId)
      .subscribe(val => {
        console.log(val.data)
        // this.subjectDetail = val.data.subject;
      });
  }


}
