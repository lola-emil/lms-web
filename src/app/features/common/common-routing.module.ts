import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotCredentialComponent } from "./pages/forgot-credential/forgot-credential.component";
import { SignInPageComponent } from "./pages/sign-in-page/sign-in-page.component";

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
