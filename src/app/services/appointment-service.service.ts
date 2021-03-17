import { Appointment } from './../models/appointment';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import firebase from "firebase";
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  appointmentCollection!: AngularFirestoreCollection<Appointment>;
  db = firebase.firestore();

  constructor(
    private fireService: FirestoreService,
  ) { }

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

  getUserAppointments(userId: string): Array<Appointment>{
    const list: Array<Appointment> = [];
    const usersRef = this.db.collection('citas')
    .where("userid", "==", userId).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let cita: Appointment = ({
          car: doc.get("car"),
          date: doc.get("date"),
          userid: doc.get("userid"),
          estado: doc.get("estado"),
          diagnosis: doc.get("diagnosis"),
          appId: doc.get("appId"),
        })
        if (cita.estado != "cerrada"){
          list.push(cita);
        }
      })
    });
    return list;
  }

  deleteAppointment(id: string){
    const ref = this.db.collection("citas")
    return ref.doc(id).delete();
  }

  crearCita(appointment: Appointment): any {
    const id = this.fireService.getId();
    appointment.appId = id;
    return this.db.collection("citas").doc(id).set(appointment);
  }
}
