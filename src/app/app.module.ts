import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ContactComponent } from './components/contact/contact.component';
import { MapsComponent } from './components/maps/maps.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GallerygridComponent } from './components/gallerygrid/gallerygrid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MecanicoPageComponent } from './pages/mecanico-page/mecanico-page.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { UsernameBarComponent } from './components/username-bar/username-bar.component';
// import { AdmingPageComponent } from './pages/adming-page/adming-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
//import { ScannerqrComponent } from './components/scannerqr/scannerqr.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    CarruselComponent,
    ContactComponent,
    MapsComponent,
    GalleryComponent,
    GallerygridComponent,
    MecanicoPageComponent,
    UsernameBarComponent,
    // AdmingPageComponent,
    AdminPageComponent,
    //ScannerqrComponent
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
    MatGridListModule,
    QRCodeModule,
    NgQrScannerModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

