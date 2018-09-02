import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { VinylListComponent } from './vinyl-list/vinyl-list.component';
import { SingleVinylComponent } from './vinyl-list/single-vinyl/single-vinyl.component';
import { VinylFormComponent } from './vinyl-list/vinyl-form/vinyl-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {VinylsService} from './services/vinyls.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';


const appRoutes: Routes = [
    { path: 'auth/signup', component: SignupComponent},
    { path: 'auth/signin', component: SigninComponent},
    { path: 'vinyls',canActivate: [AuthGuardService], component: VinylListComponent},
    { path: 'vinyls/new',canActivate: [AuthGuardService], component: VinylFormComponent},
    { path: 'vinyls/view/:id',canActivate: [AuthGuardService], component: SingleVinylComponent},
    { path: '', redirectTo: 'vinyls', pathMatch: 'full' },
    { path: '**', redirectTo: 'vinyls' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    VinylListComponent,
    SingleVinylComponent,
    VinylFormComponent,
    HeaderComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,VinylsService,AuthGuardService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
