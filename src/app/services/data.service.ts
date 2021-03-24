import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getUserDate(){
    return this.firestore.collection('events').snapshotChanges();
  }

  updateUserDate(id: any, user: any){
    return this.firestore.collection('events').doc(id).update(user)
  }

  deleteUserDate(id:any){
    return this.firestore.collection('events').doc(id).delete();

  }

  createUserDate(user:any){
    return this.firestore.collection('events').add(user);
  }

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
}
