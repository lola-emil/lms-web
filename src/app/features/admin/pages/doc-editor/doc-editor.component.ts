import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { DocEditorService, Subject } from './services/doc-editor.service';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';


@Component({
  selector: 'app-doc-editor',
  imports: [QuillModule, ReactiveFormsModule, DrawerComponent, TopbarComponent],
  templateUrl: './doc-editor.component.html',
  styles: ``
})
export class DocEditorComponent implements OnInit {

  subject = new FormControl<number | null>(null);
  content = new FormControl("");
  title = new FormControl("");

  files: File[] = [];

  subjects: Subject[] = [];

  submitInProgress = false;

  subjectId: number;

  constructor(
    private katungService: DocEditorService,
    private route: ActivatedRoute
  ) {

    const param = this.route.snapshot.queryParamMap;
    this.subjectId = parseInt(param.get("subject_id") ?? "");
    this.subject = new FormControl(this.subjectId);


    const Color: any = Quill.import('formats/color');

    Color.blotName = 'color';
    Color.tagName = 'span';
    Color.className = '';  // Don't use class, instead use inline styles
    Color.styleName = 'color';  // Apply color as inline style

    Quill.register(Color);
  }

  ngOnInit(): void {
    this.katungService.getSubjects()
      .subscribe(val => {
        console.log(val);

        this.subjects = val.data.subjects;
      });
  }

  submit() {
    this.submitInProgress = true;
    this.katungService.uploadMaterial({
      title: this.title.value,
      content: this.content.value,
      subjectId: this.subject.value,
      files: this.files
    }).subscribe(val => {
      console.log(val);
      this.submitInProgress = false;

      location.href = `http://${window.location.host}/admin/content-management/${this.subjectId}`;
    });
  }

  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    if (!input.files) return;

    this.files = Array.from(input.files);

    console.log(this.files);
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
