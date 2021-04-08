import { Order } from 'src/app/models/order';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase";
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  db = firebase.firestore();

  constructor(
    private fireService: FirestoreService,
    public database: AngularFirestore,
  ) { }


  createOrder(data: Order, id: string){
    const refId = this.fireService.getId();
    data.refId = refId;
    const collection = this.database.collection("citas").doc(id).collection("orden");
    return collection.doc(refId).set(data)
  }

  getOrderByApp(carId: string) {
    const collection = this.db.collection("citas").doc(carId);
    return collection.collection("orden").get().then(doc => {
      doc.docs
    });
  }

  async getOrder(id: string | undefined){
    const lista: Array<Order> = [];
    const collection = this.db.collection("citas").doc(id).collection("orden").get()
    await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
  }

  updateOrder(data: any, idApp: string | undefined, idOrder: string | undefined){
    const collection = this.db.collection("citas").doc(idApp).collection("orden")
    return  collection.doc(idOrder).update(data);
  }

  
}
