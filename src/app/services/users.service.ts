import { state } from '@angular/animations';
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

  userCollection!: AngularFirestoreCollection<User>;
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
      this.getUser(localStorage.getItem("user")  || '{}')
  }

  getDoc(id:string){
    const collection = this.database.collection("users")
    return  collection.doc(id).valueChanges();
  }

  getDBUser(id:string): Promise<any>{
    const collection = this.db.collection("users").where("id", "==", id)
    return collection.get()
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
    return JSON.parse(localStorage.getItem("CurrentUser")  || '{}')
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

  async updateEntireUser(user: User, userId: string){
    const collection = this.database.collection("users");
    return await collection.doc(userId).set({
      birthDate: user.birthDate,
      cedula: user.cedula,
      phoneNumber: user.phoneNumber,
      genero: user.genero,
      address: user.address,
      state: user.state,
      city: user.city,
      postalCode: user.postalCode,
    }, {merge: true});
  }

  getUserId(userId: string) {
    const collection = this.database.collection("users");
    return collection.doc(userId).valueChanges();
  }


  getUser(userId: string) {
    let user: User | void;
    this.db.collection("users").where("id", "==", userId).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        localStorage.setItem("UserFireId", doc.id)
        user = this.creatingUserInLocalStorage(doc);
      })
    })
  }

  isUserManager(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  isUserMechanic(userUid: string){
    return this.firestore.doc<User>(`users/${userUid}`).valueChanges()
  }

  getClientUser():User[]{
    const userList: User[]=[];
    this.db.collection("users").where("rol.client","==",true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId")
        })
        userList.push(user)
      })}
    )
    return userList;
    
  }

  async getClientUserr():Promise<User[]>{
    const userList: User[]=[];
    await this.db.collection("users").where("rol.client","==",true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId"),
          photoUrl:doc.get("photoUrl"),
        })
        userList.push(user)
      })}
    )
    return userList;
    
  }

  async getMechanicUserr():Promise<User[]>{
    const userList: User[]=[];
    await this.db.collection("users").where("rol.mechanic", "==", true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId"),
          photoUrl:doc.get("photoUrl"),
        })
        userList.push(user)
      })}
    )
    return userList;
    
  }

  async getClientUserForManager(): Promise<any[] | void>{
    const collection = this.db.collection("users").where("rol.client", "==", true).get()
    return await collection.then(snapshot => {
      snapshot.docs.forEach( doc => {
        return doc;
        //lista.push(doc.data())
      })
    });
    
  }

  getMechanicUser():User[]{
    const userList: User[]=[];
    this.db.collection("users").where("rol.mechanic","==",true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId"),
          photoUrl:doc.get("photoUrl"),
        })
        userList.push(user)
      })}
    )
    return userList;
    
  }
  getManagerUser():User[]{
    const userList: User[]=[];
    this.db.collection("users").where("rol.manager","==",true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId"),
          photoUrl:doc.get("photoUrl"),
        })
        userList.push(user)
      })}
    )
    return userList;
    
  }
  getAdminUser():User[]{
    const userList: User[]=[];
    this.db.collection("users").where("rol.admin","==",true).get().then(
      query=>{query.forEach(doc=>{
        let user=({
          id:doc.get("id"),
          address:doc.get("address"),
          birthDate:doc.get("birthDate"),
          cedula:doc.get("cedula"),
          city:doc.get("city"),
          email:doc.get("email"),
          genero:doc.get("genero"),
          name:doc.get("name"),
          phoneNumber:doc.get("phoneNumber"),
          postalCode:doc.get("postalCode"),
          rol:doc.get("rol"),
          state:doc.get("state"),
          refId:doc.get("refId"),
          photoUrl:doc.get("photoUrl"),
        })
        userList.push(user)
      })}
    )
    return userList;
    
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

  updateDoc(data:any, id:string){
    const collection = this.database.collection("users")
    return  collection.doc(id).update(data);
  }

  /**
   * DELETE car BY ID
   * @param userId
   */
  deleteUser(userId: string): Promise<void> {
    return this.userCollection.doc<User>(userId).delete();
  }
}
