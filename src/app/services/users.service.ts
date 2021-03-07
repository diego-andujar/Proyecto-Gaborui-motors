import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userCollection: AngularFirestoreCollection<User>;

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

  /**
   * DELETE car BY ID
   * @param userId
   */
  deleteUser(userId: string): Promise<void> {
    return this.userCollection.doc<User>(userId).delete();
}
