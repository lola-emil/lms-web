import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { ClassworkSubmission, ClassworkSubmissionRepoService } from '../../../../repositories/classwork-submission-repo.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { Classwork, ClassworkService } from './services/classwork.service';

@Component({
  selector: 'app-classwork',
  imports: [DatePipe, RouterLink],
  templateUrl: './classwork.component.html',
  styles: ``
})
export class ClassworkComponent implements OnInit {

  @ViewChild("createActivityModal") createActivityModal!: ElementRef<HTMLDialogElement>;

  teacherSubjectId?: number;


  activities: (Classwork & {showSubmissions: boolean})[] = [];

  constructor(
    private route: ActivatedRoute,
    private classworkService: ClassworkService
  ) {
    this.route.parent?.params.subscribe(val => {
      this.teacherSubjectId = val["id"];
    });
  }
  ngOnInit(): void {
    this.classworkService.getClassworks(this.teacherSubjectId ?? 0)
      .subscribe(val => {
        console.log(val);

        this.activities = val.data.assignments.map(val => ({
          ...val,
          showSubmissions: false
        }));

        this.activities.forEach(val => val.showSubmissions = false);
      });
  }

  showSubmissions(index: number) {
    this.activities[index].showSubmissions = true;
  }

  hideSubmissions(index: number) {
    this.activities[index].showSubmissions = false;
  }

  openModal() {
    this.createActivityModal.nativeElement.show();
  }

  closeModal() {
    this.createActivityModal.nativeElement.close();
  }


  getAvatar(seed: string): string {
    return createAvatar(pixelArt, { seed }).toDataUri();
  }
}
