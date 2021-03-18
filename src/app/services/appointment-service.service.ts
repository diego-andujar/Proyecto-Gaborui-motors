import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import firebase from "firebase";
import { FirestoreService } from './firestore.service';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  appointmentCollection!: AngularFirestoreCollection<Appointment>;
  db = firebase.firestore();

  constructor(
    private fireService: FirestoreService,
    public database: AngularFirestore,
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

  /*getCarsWaiting(): Observable<Appointment[]> {
    const list: Array<Appointment> = [];
    return this.db.collection('citas')
    .where("estado", "==", "solicitada").get()
    .then((querySnapshot) =>{
      return querySnapshot.forEach(doc => ({
          car: doc.get("car"),
          date: doc.get("date"),
          userid: doc.get("userid"),
          estado: doc.get("estado"),
          diagnosis: doc.get("diagnosis"),
          appId: doc.get("appId"),
        })
      })
  }*/

  getAPP(){
    const collection = this.database.collection<Appointment>("citas");
    return collection.valueChanges();
  }

  async getClientApp(userId: string): Promise<any[]>{
    const collection = this.db.collection("citas");
    let query = collection.where("userId", "==", userId).orderBy('dateCreated', 'desc');
    return query.get().then((snapshot) =>
    {
        return snapshot.docs.map(doc => doc.data());
    })
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
        list.push(cita);
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
