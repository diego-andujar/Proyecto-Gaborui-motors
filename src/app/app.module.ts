import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
// import {MatPaginatorModule} from '@angular/material/paginator';
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
import { FooterComponent } from './components/footer/footer.component';
import { QuienesComponent } from './components/quienes/quienes.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
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
import { MecanicoPageComponent } from './pages/mecanico-page/mecanico-page.component';
import { UsernameBarComponent } from './components/username-bar/username-bar.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { PaginatorPipe } from './pipes/paginator.pipe';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { OrdenReparacionComponent } from './component/orden-reparacion/orden-reparacion.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VistaGnrlManagerComponent } from './component/vista-gnrl-manager/vista-gnrl-manager.component';
import { ClientPageComponent } from './pages/client-page/client-page.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BotonComponent } from './usuario/boton/boton.component';
import { UsuarioCalendarioComponent } from './usuario-calendario/usuario-calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { UsernameComponent } from './username/username.component';
import { NewCarFormComponent } from './components/new-car-form/new-car-form.component';
import { ClientFormComponent } from './components/client-form/client-form.component'; // a plugin
import { DatePipe } from '@angular/common';
import { ClientAppointmentFormComponent } from './components/client-appointment-form/client-appointment-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppointmentViewComponent } from './components/appointment-view/appointment-view.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { DinamicCarViewComponent } from './components/dinamic-car-view/dinamic-car-view.component';
import { AppointmentDinamicComponent } from './components/appointment-dinamic/appointment-dinamic.component';
import { MechanicsPageComponent } from './pages/mechanics-page/mechanics-page.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { NewPartFormComponent } from './components/new-part-form/new-part-form.component';
import { DiagnosisFormComponent } from './components/diagnosis-form/diagnosis-form.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PrompCompComponent } from './components/promp-comp/promp-comp.component';
import { PwaService } from './services/pwa.service';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';
import { XdComponent } from './components/xd/xd.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ReportsClientsComponent } from './components/reports-clients/reports-clients.component';
import { ManagerClientViewComponent } from './components/manager-client-view/manager-client-view.component';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ManagerMechanicViewComponent } from './components/manager-mechanic-view/manager-mechanic-view.component';
import { SelectMechanicComponent } from './components/select-mechanic/select-mechanic.component';
import { MechanicCarImagesComponent } from './components/mechanic-car-images/mechanic-car-images.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
]);

//const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

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
    FooterComponent,
    QuienesComponent,
    CarruselComponent,
    ImageSliderComponent,
    SignUpPageComponent,
    LogInPageComponent,
    AuthFormComponent,
    CarQueueComponent,
    ManagerPageComponent,
    CarViewComponent,
    PaginatorPipe,
    SideNavComponent,
    OrdenReparacionComponent,
    VistaGnrlManagerComponent,
    ClientPageComponent,
    UsuarioComponent,
    BotonComponent,
    UsuarioCalendarioComponent,
    UsernameComponent,
    NewCarFormComponent,
    AdminPageComponent,
    ClientFormComponent,
    ClientAppointmentFormComponent,
    AppointmentViewComponent,
    DinamicCarViewComponent,
    AppointmentDinamicComponent,
    MechanicsPageComponent,
    QrScannerComponent,
    NewPartFormComponent,
    DiagnosisFormComponent,
    ItemsListComponent,
    CarFormComponent,
    PrompCompComponent,
    OrderManagerComponent,
    CalendarManagerComponent,
    XdComponent,
    SelectDateComponent,
    ReportsClientsComponent,
    ManagerClientViewComponent,
    QrGeneratorComponent,
    ManagerMechanicViewComponent,
    SelectMechanicComponent,
    MechanicCarImagesComponent,
    HomeSliderComponent,
    MainNavComponent,
  ],
  imports: [
    MatCardModule,
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
    MatPaginatorModule,
    MatIconModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    NoopAnimationsModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    NgxQRCodeModule,
    ZXingScannerModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    QRCodeModule,
    CarouselModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [DatePipe,
    /*{provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},*/],
  bootstrap: [AppComponent],
  entryComponents: [ClientAppointmentFormComponent, NewPartFormComponent],
})
export class AppModule { }

