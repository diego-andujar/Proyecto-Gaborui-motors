import { FirestoreService } from './firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Car } from './../models/car';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userCollection: AngularFirestoreCollection<User>;
  db = firebase.firestore();
  user!: User;
  bool!: Promise<boolean>;

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private afsAuth: AngularFireAuth,
    public database: AngularFirestore,
    private fireService: FirestoreService,
    ) { 
      this.getUser(localStorage.getItem("user"))
  }

  getDoc(id:string){
    const collection = this.database.collection("users")
    return  collection.doc(id).valueChanges();
  }

  createDoc(user: User){
    const id = this.fireService.getId();
    user.refId = id;
    return this.db.collection("citas").doc(id).set(user);
  }

  getDocId(id:string){
    const collection = this.database.collection("cars")
    return  collection.doc(id).valueChanges();
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

  getFireUserId(): string {
    return JSON.parse(localStorage.getItem("CurrentUser"))
  }


  isUserAdmin(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  creatingUserInLocalStorage(doc: any){
    this.user = {
      id: doc.data().id,
      refId: doc.data().refId,
      name: doc.data().name,
      email: doc.data().email,
      cedula: doc.data().cedula,
      phoneNumber: doc.data().phoneNumber,
      address: doc.data().address,
      city: doc.data().city,
      state: doc.data().state,
      postalCode: doc.data().postalCode,
      birthDate: doc.data().birthDate,
      rol: doc.data().rol,
      genero: doc.data().genero,
    }
    localStorage.setItem("CurrentUser", JSON.stringify(this.user))
    localStorage.setItem("UserFireId", doc.id)
  }


  getUser(userId: string) {
    let user: User;
    this.db.collection("users").where("id", "==", userId).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        localStorage.setItem("UserFireId", doc.id)
        user = this.creatingUserInLocalStorage(doc)
      })
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
  /*
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
        localStorage.setItem("num", doc.id);
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
  }*/

 

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

  getUserByUid(userId: string) {
    this.db.collection("users")
    .where("id", "==", userId).get()
    .then(querySnapshot => {
      console.log("hola " + querySnapshot);
      return querySnapshot.docs[0];
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

  /**
   * DELETE car BY ID
   * @param userId
   */
  deleteUser(userId: string): Promise<void> {
    return this.userCollection.doc<User>(userId).delete();
  }
}
