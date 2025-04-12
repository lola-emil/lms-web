import { Component, OnInit } from '@angular/core';
import { UserRepoService } from '../../../../repositories/user-repo.service';
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { ModalService } from '../../../../ui/modal/modal.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  imports: [AdminLayoutComponent, RouterModule, RouterLink],
  templateUrl: './user-management.component.html',
  styles: ``
})
export class UserManagementComponent implements OnInit {



  constructor(
    private userRepoService: UserRepoService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
  }

}
