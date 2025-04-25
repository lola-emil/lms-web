import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClassworkRepoService } from '../../../../repositories/classwork-repo.service';

@Component({
  selector: 'app-classwork-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './classwork-form.component.html',
  styles: ``
})
export class ClassworkFormComponent {

  loadId: string = "";

  classworkFormGroup = new FormGroup({
    title: new FormControl(""),
    instruction: new FormControl(""),

    hps: new FormControl(),
    due_date: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private classworkRepo: ClassworkRepoService,
    private router: Router
  ) {
    this.route.parent?.params.subscribe(val => {
      this.loadId = val["id"];
    });
  }

  submit() {
    console.log(this.classworkFormGroup.value);

    this.classworkRepo.post({
      ...this.classworkFormGroup.value,
      teacher_subject_id: this.loadId
    }).subscribe(val => {
      this.router.navigate(['/teacher/loads', this.loadId, 'classwork'])
    });

  }
}
