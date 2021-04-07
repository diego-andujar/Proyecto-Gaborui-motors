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

  getDoc(id:string){
    const collection = this.database.collection("cars")
    return  collection.doc(id).valueChanges();
  }

  getAppointmentsCar(carId: string){
    const collection = this.database.collection<Car>("cars").doc(carId);
    return collection.valueChanges();
  }

  async getUsCars(id:string): Promise<Car[]>{
    const lista: Array<Car> = [];
    const collection = this.db.collection("cars").where("userid", "==", id).where("active", "==", true).get()
    await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
  }

  async getCarUserr(id: string):Promise<Car[]>{
    const userList: Car[]=[];
    await this.db.collection("cars").where("userId", "==", id).get().then(
      query=>{query.forEach(doc=>{
        let car=({
          active: doc.get("active"),
          brand: doc.get("brand"),
          carId: doc.get("carId"),
          inAppointment: doc.get("inAppointment"),
          model: doc.get("model"),
          photo: doc.get("photo"),
          plate: doc.get("plate"),
          registerDate: doc.get("registerDate"),
          serialMotor: doc.get("serialMotor"),
          year: doc.get("year"),
        })
        console.log(car)
        userList.push(car)
      })}
    )
    return userList;
    
  }

  async getUsCarsForManager(id:string): Promise<any[] | void>{
    const lista: Array<Car> = [];
    const collection = this.db.collection("cars").where("userid", "==", id).get()
    return await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        console.log(doc.data())
        return doc.data();
        //lista.push(doc.data())
      })
    })
    //return lista;
  }

  async getUsCarsNoApp(id:string): Promise<Car[]>{
    const lista: Array<Car> = [];
    const collection = this.db.collection("cars").where("userid", "==", id).where("inAppointment", "==", false).get()
    await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
  }

  carForAppointment(id: string, bool: boolean){
    const collection = this.database.collection("cars")
    return  collection.doc(id).update({inAppointment: bool});
  }

  async checkIfCarExists(serialMotor: string): Promise<boolean>{
    let existe: boolean = false;
    const collection = this.db.collection("cars").where("serialMotor", "==", serialMotor).get()
    return collection.then( doc => {
      if (doc.size > 0){
        existe = true;
      }
      return existe
    })
  }

  getUsCarsApp(id:string): Array<Car>{
    const lista: Array<Car> = [];
    const collection = this.db.collection("cars").where("userid", "==", id).get()
    collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        lista.push(doc.data())
      })
    })
    return lista;
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
  getCarById(carId: any) {
    const collection = this.database.collection("cars");
    return collection.doc(carId).valueChanges();
  }

  async updateEntireCar(car: Car, carId: string){
    const collection = this.database.collection("cars");
    return await collection.doc(carId).set({
      brand: car.brand,
      model: car.model,
      year: car.year,
      plate: car.plate,
      color: car.color,
      kmWhenIn: car.kmWhenIn,
      gasTankWhenIn: car.gasTankWhenIn,
      accesories: car.accesories,
    }, {merge: true});
  }

  updateCar(data:any, id:string){
    const collection = this.database.collection("cars");
    return  collection.doc(id).update(data);
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
   * DELETE car BY ID
   * @param carId
   */
  deleteCar(carId: string): Promise<void> {
    return this.carCollection.doc<Car>(carId).delete();
  }

}
