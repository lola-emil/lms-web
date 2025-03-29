import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentLayoutComponent } from "./components/layout/student-layout/student-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lms-design';
}
