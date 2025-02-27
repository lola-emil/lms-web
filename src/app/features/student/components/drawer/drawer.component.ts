import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drawer',
  imports: [RouterLink],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  subjects = [
    {
      name: "Mathematics",
      code: "MATH101",
      instructor: "Dr. Alice Johnson",
      credits: 3
    },
    {
      name: "Computer Science",
      code: "CS102",
      instructor: "Prof. Brian Smith",
      credits: 4
    },
    {
      name: "Physics",
      code: "PHYS103",
      instructor: "Dr. Emily Davis",
      credits: 3
    },
    {
      name: "English Literature",
      code: "ENG104",
      instructor: "Ms. Sarah Williams",
      credits: 2
    }
  ];
}
