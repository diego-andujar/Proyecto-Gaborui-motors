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

  getCitasDeterminadas(estado: string): Array<Appointment> {
    const list: Array<Appointment> = [];
    const usersRef = this.db.collection('citas')
    .where("estado", "==", estado).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let cita: Appointment = ({
          car: doc.get("car"),
          date: doc.get("appointmentDate"),
          userid: doc.get("userid"),
          estado: doc.get("estado"),
          diagnosis: doc.get("diagnosis"),
        })
        list.push(cita);
      })
    });
    return list;
  }

  crearCita(appointment: Appointment): Promise<DocumentReference> {
    return this.db.collection("citas").add(appointment);
  }
}
