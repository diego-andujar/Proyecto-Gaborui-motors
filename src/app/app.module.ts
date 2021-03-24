import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';


import { UsuarioComponent } from './usuario/usuario.component';
import { FormularioComponent } from './usuario/formulario/formulario.component';
import { BotonComponent } from './usuario/boton/boton.component';
import { UsuarioCalendarioComponent } from './usuario-calendario/usuario-calendario.component';
import { UsernameComponent } from './username/username.component';
import { GerenteComponent } from './gerente/gerente.component';
import { GerenteReportesComponent } from './gerente/gerente-reportes/gerente-reportes.component';
import { UsernameGerenteComponent } from './gerente/gerente-reportes/username-gerente/username-gerente.component';
import { GerenteStatusComponent } from './gerente/gerente-status/gerente-status.component';
import { GerenteFormularioComponent } from './gerente/gerente-formulario/gerente-formulario.component'; // a plugin

import { DataService } from './services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { NgCalendarModule } from 'ionic2-calendar'

import * as $ from 'jquery'

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    FormularioComponent,
    BotonComponent,
    UsuarioCalendarioComponent,
    UsernameComponent,
    GerenteComponent,
    GerenteReportesComponent,
    UsernameGerenteComponent,
    GerenteStatusComponent,
    GerenteFormularioComponent,
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    NoopAnimationsModule,
    FullCalendarModule,
    NgbModule,
    FlexLayoutModule,
    NgCalendarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
