import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Classwork, ClassworkRepoService } from '../../../../repositories/classwork-repo.service';
import { ClassworkSubmission, ClassworkSubmissionRepoService } from '../../../../repositories/classwork-submission-repo.service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-classwork',
  imports: [DatePipe, RouterLink],
  templateUrl: './classwork.component.html',
  styles: ``
})
export class ClassworkComponent implements OnInit {

  @ViewChild("createActivityModal") createActivityModal!: ElementRef<HTMLDialogElement>;

  teacherSubjectId: string = "";
  activities: {
    activity: Classwork,
    submissions: ClassworkSubmission[];
    showSubmissions: boolean;
  }[] = [];

  constructor(
    private classworkRepo: ClassworkRepoService,
    private classworkSubmissionRepo: ClassworkSubmissionRepoService,
    private route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe(val => {
      this.teacherSubjectId = val["id"];
    });
  }
  ngOnInit(): void {

    this.classworkRepo.get(
      {
        teacher_subject_id: parseInt(this.teacherSubjectId ?? "")
      }
    ).pipe(
      switchMap(activities => {
        const activityIds = activities.map(val => val.id);

        return forkJoin({
          activities: of(activities),
          submissions: this.classworkSubmissionRepo.get({
            classwork_id: activityIds
          })
        });
      })
    ).subscribe(data => {
      const formatted = data.activities.map(a => {
        const submissions = data.submissions.filter(val => val.classwork_id == a.id);
        return {
          activity: a,
          submissions,
          showSubmissions: false
        };
      });

      console.log(formatted);

      this.activities = formatted;
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
