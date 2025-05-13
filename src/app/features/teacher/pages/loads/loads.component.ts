import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { TopbarComponent } from "../../components/topbar/topbar.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LoadsService, TeacherAssignedSubjectsByTeacherIdResponse } from './services/loads.service';
import { catchError, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-loads',
  imports: [DrawerComponent, TopbarComponent, RouterLink],
  templateUrl: './loads.component.html',
  styles: ``
})
export class LoadsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];


  data?: TeacherAssignedSubjectsByTeacherIdResponse;

  constructor(
    private authService: AuthService,
    private loadsService: LoadsService
  ) { }

  ngOnInit(): void {
    const userDetail = this.authService.getUserDetail();
    this.subscriptions.push(
      this.loadsService.getTeacherSubjects(userDetail.id)
        .pipe(
          tap(val => {
            this.data = val.data;
            console.log(this.data);
          }),
          catchError(res => {
            console.log(res);
            return of(null);
          })
        )
        .subscribe()

    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(val => val.unsubscribe());
  }

}
