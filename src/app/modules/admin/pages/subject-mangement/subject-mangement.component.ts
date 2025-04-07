import { Component } from '@angular/core';
import { LayoutComponent } from "../../layout/layout.component";
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { TableComponent, TableHeader } from "../../../../components/ui/table/table.component";

@Component({
  selector: 'app-subject-mangement',
  imports: [LayoutComponent, SectionComponent, TableComponent],
  templateUrl: './subject-mangement.component.html',
  styles: ``
})
export class SubjectMangementComponent {
  subjectTableHeaders: TableHeader[] = [
    {
      label: "Title",
      value: "title",
      clickable: true
    },
    {
      label: "Grade Level",
      value: "level",
      align: "center"
    },
    {
      label: "Lessons",
      value: "lessons",
      align: "center"
    },
  ]
  subjects = [
    {
      title: "Mathematics",
      level: 7,
      lessons: 50
    }
  ];
}
