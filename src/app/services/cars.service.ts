import { Car } from './../models/car';
import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  carCollection: AngularFirestoreCollection<Car>;

  constructor(private firestore: AngularFirestore) { 
    this.carCollection = this.firestore.collection<Car>('cars', (ref) =>
      ref.orderBy('brand')
    );
  }

  /**
   * GET ALL POSTS
   */
  getAllCars(): Observable<Car[]> {
    return this.carCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((car) => ({
          id: car.payload.doc.id,
          ...car.payload.doc.data(),
        }));
      })
    );
  }

  /**
   * GET car BY ID
   * @param carId
   */
  getCarById(carId: string): Observable<Car> {
    return this.carCollection
      .doc<Car>(carId)
      .snapshotChanges()
      .pipe(
        map((car) => {
          return {
            id: car.payload.id,
            ...car.payload.data(),
          };
        })
      );
  }

  /**
   * CREATE NEW car
   * @param newPost
   */
  createNewCar(newCar: Car): Promise<DocumentReference> {
    return this.carCollection.add(newCar);
  }

  /**
   * UPDATE car BY ID
   * @param carId
   * @param carData
   */
  updateCar(carId: string, postData: Car): Promise<void> {
    return this.carCollection.doc<Car>(carId).update(postData);
  }

  /**
   * DELETE car BY ID
   * @param carId
   */
  deleteCar(carId: string): Promise<void> {
    return this.carCollection.doc<Car>(carId).delete();
  }

}
