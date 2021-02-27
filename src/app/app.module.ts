import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { AuthFormComponent } from './component/auth-form/auth-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CarQueueComponent } from './component/car-queue/car-queue.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CarViewComponent } from './component/car-view/car-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PaginatorPipe } from './pipes/paginator.pipe';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPageComponent,
    LogInPageComponent,
    AuthFormComponent,
    CarQueueComponent,
    ManagerPageComponent,
    CarViewComponent,
    PaginatorPipe,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSidenavModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
