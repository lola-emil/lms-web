import { Component } from '@angular/core';
import { LayoutComponent, Menu } from "../../../../components/layout/layout/layout.component";

@Component({
  selector: 'app-quiz',
  imports: [LayoutComponent],
  templateUrl: './quiz.component.html',
  styles: ``
})
export class QuizComponent {
  constructor() {

  }

  menus: Menu[] = [
    {
      title: "Questions",
      actions: [
        {
          label: "Q1",
        },

        {
          label: "Q2",
        },

        {
          label: "Q3",
        },

        {
          label: "Q4",
        },

        {
          label: "Q5",
        },
        {
          label: "Finish Quiz",
          handler: () => {alert("Hello")}
        }
      ]
    }
  ]
}
