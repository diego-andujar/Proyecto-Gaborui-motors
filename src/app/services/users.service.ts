import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { userInfo } from 'node:os';
import { Car } from './../models/car';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { query } from '@angular/animations';
import { snapshotChanges } from '@angular/fire/database';
import { isPromise } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userCollection: AngularFirestoreCollection<User>;
  db = firebase.firestore();
  user!: Observable<User>;
  bool!: Promise<boolean>;

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private afsAuth: AngularFireAuth,
    ) { 
    this.userCollection = this.firestore.collection<User>('users', (ref) =>
      ref.orderBy('name')
    );
  }

  /**
   * GET ALL POSTS
   */
  getAllUsers(): Observable<User[]> {
    return this.userCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((car) => ({
          id: car.payload.doc.id,
          ...car.payload.doc.data(),
        }));
      })
    );
  }

  getCurrentUser(): string{
    let userId: string = this.auth.getCurrentUserId();
    return userId;
  }

  isUserAdmin(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  async isUserClient(): Promise<any> {
    let users: User;
    await this.delay(3000);
    await this.db.collection('users')
    .where("id", "==", this.getCurrentUser()).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        let user = ({
          name: doc.get("name"),
          rol: doc.get("rol"),
          emil: doc.get("email"),
        })
        this.bool = user.rol.client;
        return this.bool;
      })
    })
  }

  isUserClients(): any {
    this.isUserClient()
    console.log("primera vez " + this.bool)  
    return this.bool;
  }

  isUserClientss(): any {
    this.db.collection('users')
    .where("id", "==", this.getCurrentUser()).get({
      
    })
  }

  isUserManager(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  isUserMechanic(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  
  /**
   * GET car BY ID
   * @param carId
   */
  getUserById(userId: string): Observable<User> {
    return this.userCollection
      .doc<User>(userId)
      .snapshotChanges()
      .pipe(
        map((user) => {
          return {
            name: user.payload.data(name),
            ...user.payload.data(),
          };
        })
      );
  }

  getUserByUid(userId: string): Observable<User> {
    let id: string = "";
    const list: Observable<User>[] = [];
    const usersRef = this.db.collection('users')
    .where("id", "==", userId).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach(doc => {
        id = doc.id;
        list.push(this.getUserById(doc.id));
      })
    });
    return list[0];
  }

  getUserByEmail(emailId: string): Observable<User> {
    return this.userCollection
      .doc<User.id>(emailId)
      .snapshotChanges()
      .pipe(
        map((user) => {
          return {
            name: user.payload.id,
            ...user.payload.data(),
          };
        })
      );
  }

 

  getUserCars(userId: string): Array<Car> {
    
    const carList: Array<Car> = [];

    this.db.collection("users").get()
    .then(querySnapshot => {
      return querySnapshot.docs[0].ref.collection("cars").get()
    })
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let car = ({
          brand: doc.get("brand"),
          model: doc.get("model"),
          year: doc.get("year"),
          plate: doc.get("plate"),
        })
        carList.push(car);
      })
    })
    return carList;
  }

  getAllCars(): Array<Car> {
    
    const carList: Array<Car> = [];

    this.db.collection("users")
    .where("id", "!=", null).get()
    .then(querySnapshot => {
      return querySnapshot.docs[0].ref.collection("cars").get()
    })
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let car = ({
          brand: doc.get("brand"),
          model: doc.get("model"),
          year: doc.get("year"),
          plate: doc.get("plate"),
        })
        carList.push(car);
      })
    })
    return carList;
  }

  /**
   * CREATE NEW car
   * @param newPost
   */
  createNewUser(newUser: User): Promise<DocumentReference> {
    return this.userCollection.add(newUser);
  }

  createUserCar(newCar: Car, userId: string) {
    this.db.collection("users")
    .where("id", "==", userId).get()
    .then(querySnapshot => {
      return querySnapshot.docs[0].ref.collection("cars").add(newCar);
    })
  }

  /**
   * UPDATE car BY ID
   * @param carId
   * @param carData
   */
  updateUser(userId: string, userData: User): Promise<void> {
    return this.userCollection.doc<User>(userId).update(userData);
  }

  updateUserCar(userId: string, userCar: Car): Promise<void> {
    return this.userCollection.doc<User>(userId).update({
      cars: thisfirestore.FieldValue.arrayUnion(userCar)
    });
  }

  /**
   * DELETE car BY ID
   * @param userId
   */
  deleteUser(userId: string): Promise<void> {
    return this.userCollection.doc<User>(userId).delete();
  }
}
