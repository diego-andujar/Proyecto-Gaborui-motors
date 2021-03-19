import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Orden } from './models/orden';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  ordencollection!: AngularFirestoreCollection<Orden>;
  ordenes!:Observable<Orden[]>;
  constructor(public orden:AngularFirestore) { 
    this.ordencollection = this.orden.collection<Orden>('Ordenes');
  }
  /**
   * Get all post
   */
  getAllordenes() {
    return this.ordencollection;
  }
}


