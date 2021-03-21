import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  db = firebase.firestore();

  constructor(
    public database: AngularFirestore,
  ) { }


  getOrderByApp(carId: string) {
    const collection = this.db.collection("citas").doc(carId);
    return collection.collection("orden").get().then(doc => {
      doc.docs
    });
  }

  async getOrder(id: string){
    const lista: Array<Order> = [];
    const collection = this.db.collection("citas").doc(id).collection("orden").get()
    await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
  }

  updateOrder(data: any, id: string | undefined, idOrder: string | undefined){
    const collection = this.db.collection("citas").doc(id).collection("orden")
    return  collection.doc(idOrder).update(data);
  }

}
