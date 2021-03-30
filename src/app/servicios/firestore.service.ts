import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore, private authservice: AuthService) {
   }

  createDoc(data: any, path: string, refId: string){
  //  this.createLogin(nombre,email,password)
    const collection = this.database.collection(path)
    return collection.doc(refId).set(data)
  }

  // async createLogin(nombre:string, email:string, password:string){
  //   await this.authservice.signUpWithEmailAdmin(nombre,email,password)
  // }

  getDoc(path:string, refId:string){
    const collection = this.database.collection(path)
    return  collection.doc(refId).valueChanges();
  }

  deleteDoc(path:string, refId:string){
    const collection = this.database.collection(path)
    return  collection.doc(refId).delete();
  }

  updateDoc(data:any, path:string, refId:string){
    const collection = this.database.collection(path)
    return  collection.doc(refId).update(data);
  }
  getrefId(){
   return this.database.createId()
  }

  getCollection<tipo>(path:string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

}
