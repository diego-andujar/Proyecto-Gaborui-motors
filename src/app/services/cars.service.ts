import { FirestoreService } from './firestore.service';
import firebase  from "firebase";
import { AuthService } from 'src/app/services/auth.service';
import { Car } from './../models/car';
import { Injectable } from '@angular/core';
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

  carCollection!: AngularFirestoreCollection<Car>;
  db = firebase.firestore();

  constructor(
    private fireService: FirestoreService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    public database: AngularFirestore,
    ) { 
    this.db.collection('cars').orderBy('brand');
  }

  getAppointmentsCar(carId: string){
    const collection = this.database.collection<Car>("cars").doc(carId);
    return collection.valueChanges();
  }

  /**
   * GET ALL POSTS
   */
  getAllCars(): Array<Car> {
    const list: Array<Car> = [];
    const usersRef = this.db.collection('cars').get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let car = ({
          brand: doc.get("brand"),
          model: doc.get("model"),
          year: doc.get("year"),
          plate: doc.get("plate"),
          carId: doc.get("carId"),
        })
        list.push(car);
      })
    });
    return list;
  }

  /**
   * GET car BY ID
   * @param carId
   */
  getCarById(carId: string): Array<Car> {
    const list: Array<Car> = [];
    const carRef = this.db.collection("cars").doc(carId); 
    carRef.get().then().then((querySnapshot) =>{
        let car = ({
          brand: querySnapshot.get("brand"),
          model: querySnapshot.get("model"),
          year: querySnapshot.get("year"),
          plate: querySnapshot.get("plate"),
          carId: querySnapshot.get("carId"),
        })
        list.push(car);
      })
    return list;
  }

  getUserCars(userId: string): Array<Car> {
    const list: Array<Car> = [];
    const usersRef = this.db.collection('cars')
    .where("userid", "==", userId).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let car = ({
          brand: doc.get("brand"),
          model: doc.get("model"),
          year: doc.get("year"),
          plate: doc.get("plate"),
          carId: doc.get("carId"),
        })
        list.push(car);
      })
    });
    return list;
  }

  /**
   * CREATE NEW car
   * @param newPost
   */
  createNewCar(newCar: Car): any {
    const id = this.fireService.getId();
    newCar.carId = id;
    return this.db.collection("cars").doc(id).set(newCar);
  }

  /**
   * UPDATE car BY ID
   * @param carId
   * @param carData
   */
  updateCar(carId: string, postData: Car): Promise<void> {
    return this.carCollection.doc<Car>(carId).update(postData).then(
      
    );
  }

  /**
   * DELETE car BY ID
   * @param carId
   */
  deleteCar(carId: string): Promise<void> {
    return this.carCollection.doc<Car>(carId).delete();
  }

}
