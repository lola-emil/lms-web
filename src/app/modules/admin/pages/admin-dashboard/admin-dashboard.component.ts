import { Component } from '@angular/core';
import { SectionComponent } from "../../../../components/ui/section/section.component";
import { LayoutComponent } from "../../layout/layout.component";
import { CardComponent } from "../../../../components/ui/card/card.component";
import { UserService } from '../../../../repositories/user.service';
import { GradeSectionService } from '../../../../repositories/grade-section.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SectionComponent, LayoutComponent],
  templateUrl: './admin-dashboard.component.html',
  styles: ``
})
export class AdminDashboardComponent {

  totalUsers = 0;
  totalGradeSections = 0;
  totalSubjects = 0;


  constructor(
    private userService: UserService,
    private gradeSectionService: GradeSectionService,
  ) {
    this.userService.userCount().subscribe(value => {
      this.totalUsers = (<any>value).count;
      console.log(value);
    });

    this.gradeSectionService.count().subscribe(data => {
      this.totalGradeSections = data.count;
      console.log("data", data);
    })
  }

}
