import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { NoPageComponent } from './pages/no-page/no-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

export const routes: Routes = [
    {
        path: "",
        component: LandingPageComponent
    },
    {
        path: "about",
        component: AboutPageComponent
    },


    {
        path: "login",
        component: SignInPageComponent
    },

    {
        path: "registration",
        component: SignUpPageComponent
    },


    // Insert diri ang mga role specific routes
       // 


    // 404 page
    {
        path: "**",
        component: NoPageComponent
    }
];
