import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInPageComponent } from '../common/sign-in-page/sign-in-page.component';
import { ForgotCredentialComponent } from '../common/forgot-credential/forgot-credential.component';

const routes: Routes = [
  {
    path: "",
    component: SignInPageComponent
  },

  {
    path: "forgot-credential",
    component: ForgotCredentialComponent
  },
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class CommonRoutingModule { }
