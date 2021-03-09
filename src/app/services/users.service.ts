import { Car } from './../models/car';
import { User } from './../models/user';
import { Injectable, Pipe } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userCollection: AngularFirestoreCollection<User>;
  db = firebase.firestore();

  constructor(private firestore: AngularFirestore) { 
    this.userCollection = this.firestore.collection<User>('users', (ref) =>
      ref.orderBy('email')
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
            name: user.payload.id,
            ...user.payload.data(),
          };
        })
      );
  }

  getUserByEmail(emailId: string): Observable<User> {
    return this.userCollection
      .doc<User>(emailId)
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

    this.db.collection("users")
    .where("id", "==", userId).get()
    .then(querySnapshot => {
      return querySnapshot.docs[0].ref.collection("cars").get();
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
