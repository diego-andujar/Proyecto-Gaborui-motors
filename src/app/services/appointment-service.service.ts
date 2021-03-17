import { Appointment } from './../models/appointment';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  appointmentCollection!: AngularFirestoreCollection<Appointment>;
  db = firebase.firestore();

  constructor() { }

  crearCita(appointment: Appointment): Promise<DocumentReference> {
    return this.db.collection("citas").add(appointment);
  }
}
