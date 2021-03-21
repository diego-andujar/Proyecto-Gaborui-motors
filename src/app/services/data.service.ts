import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUser(){
    return this.firestore.collection('datos-usuarios').snapshotChanges();
  }

  createUser(user:any){
    return this.firestore.collection('datos-usuarios').add(user);
  }

  updateUser(id: any, user: any){
    return this.firestore.collection('datos-usuarios').doc(id).update(user)
  }

  deleteUser(id:any){
    return this.firestore.collection('datos-usuarios').doc(id).delete();

  }

  // private contactCollection: AngularFirestoreCollection<any>;

  // constructor(afs: AngularFirestore) {
  //   this.contactCollection = afs.collection<any>('datos-usuarios');
  //  }

  //  saveMessage(newContact: any): void {
  //    this.contactCollection.add(newContact);
  //  }
}
