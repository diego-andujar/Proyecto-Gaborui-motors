import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import firebase from "firebase";
import { FirestoreService } from './firestore.service';
import { Observable, Observer } from 'rxjs';
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

  updateDoc(data:any, id:string){
    const collection = this.database.collection("citas")
    return  collection.doc(id).update(data);
  }

  getSpecificApp(id:string): Observable<unknown>{
    const collection = this.database.collection("citas")
    return  collection.doc(id).valueChanges();
  }

  async getClientApp(userId: string): Promise<any[]>{
    const collection = this.db.collection("citas");
    let query = collection.where("userId", "==", userId).orderBy('dateCreated', 'desc');
    return query.get().then((snapshot) =>
    {
        return snapshot.docs.map(doc => doc.data());
    })
  }

  async endApp(appId: string | undefined, date: string, status: string){
    const collection = this.database.collection("citas");
    return await collection.doc(appId).set({
      dateEnded: date,
      estado: status,
    }, {merge: true});
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
          carPhoto: doc.get("carPhoto"),
          carInfo: doc.get("carInfo"),
          userName: doc.get("userName")
        })
        list.push(cita);
      })
    });
    return list;
  }

  async getUserAppoint(userId: string): Promise<Appointment[]>{
    const lista: Array<Appointment> = [];
    const collection = this.db.collection("citas").where("userid", "==", userId).get()
    await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
  }
    /*.get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let cita: Appointment = ({
          car: doc.get("car"),
          date: doc.get("date"),
          userid: doc.get("userid"),
          estado: doc.get("estado"),
          diagnosis: doc.get("diagnosis"),
          appId: doc.get("appId"),
          carPhoto: doc.get("carPhoto"),
          carInfo: doc.get("carInfo"),
          userName: doc.get("userName")
        })
        list.push(cita);
      })
    });*/


  deleteAppointment(id: string){
    const ref = this.db.collection("citas")
    return ref.doc(id).delete();
  }

  crearCita(appointment: Appointment): any {
    const id = this.fireService.getId();
    appointment.appId = id;
    return this.db.collection("citas").doc(id).set(appointment);
  }

  deleteApp(id: string): any {
    return this.db.collection("citas").doc(id).delete();
  }
}
