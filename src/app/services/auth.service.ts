import { UsersService } from 'src/app/services/users.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userCollection!: AngularFirestoreCollection<User>;
  user!: firebase.User | null;
  userId!: string;
  constructor(
    private afsAuth: AngularFireAuth,
    public database: AngularFirestore,
    ) { }
  /**
   * Log in with Google account
   */
  async loginWithGoogle(): Promise<firebase.User> {
    
    try {
      let primeraVez: boolean | undefined = false;
      const response = await this.afsAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
      const { user } = response;
      localStorage.setItem('user', user.uid);
      const actualUser = user;
      primeraVez = response.additionalUserInfo?.isNewUser;
      if (primeraVez){
        let userDB: User = {
          name: actualUser.displayName,
          email: actualUser.email,
          phoneNumber: actualUser.phoneNumber,
          id: actualUser.uid,
          rol: {
            client: true,
          }
        }
        const id = this.database.createId()
        userDB.refId = id;
        firebase.firestore().collection("users").doc(id).set(userDB);
      }
      return user;
    } catch (err) {
      console.log(err);
      localStorage.removeItem('user');
      alert("No se pudieron verificar los datos\nIntentelo Nuevamente")
      return null;
    }
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  /**
   * Sign in using an email and a password
   * @param email
   * @param password
   */
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const response = await this.afsAuth.signInWithEmailAndPassword(email, password);
      const { user } = response;
      localStorage.setItem('user', user.uid);
      return user;
    } catch (err) {
      console.log(err);
      localStorage.removeItem('user');
      alert("No se pudieron verificar los datos\nIntentelo Nuevamente")
      return null;
    }
  }

  /**
   * REGISTER USING EMAIL AND PASSWORD
   * @param email
   * @param password
   */
   async signUpWithEmail(
    displayName: string,
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const response = await this.afsAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = response;
      localStorage.setItem('user', user.uid);
      
      // Setting up user name and last name
      const actualUser: any = user;
      await actualUser.updateProfile({
        displayName,
        photoURL:
          'https://support.grasshopper.com/assets/images/care/topnav/default-user-avatar.jpg',
      });
      let userDB: User = {
        photoUrl: user?.photoURL,
        name: actualUser.displayName,
        email: actualUser.email,
        phoneNumber: actualUser.phoneNumber,
        id: actualUser.uid,
        rol: {
          client: true,
        }
      }
      const id = this.database.createId()
      userDB.refId = id;
      firebase.firestore().collection("users").doc(id).set(userDB);
      return user;
    } catch (err) {
      localStorage.removeItem('user');
      alert("No se pudieron verificar los datos\nIntentelo Nuevamente")
      return null;
    }
  }
  /*async signUpWithEmail(
    displayName: string,
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const res = await this.afsAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { user } = res;
      localStorage.setItem('user', user.uid);
      // Setting up user name and last name
      await user.updateProfile({
        displayName,
        photoURL:
          'https://support.grasshopper.com/assets/images/care/topnav/default-user-avatar.jpg',
      });
      return user;
    } catch (err) {
      localStorage.removeItem('user');
      return null;
    }
  }*/

  /**
   * GET CURRENT LOGGED IN USER
   */
  getCurrentUser(): Observable<firebase.User> {
    const actualUser: any = this.afsAuth.user;
    return actualUser;
  }

  getCurrentUserId(): string{
    const actualUser: any = firebase.auth().currentUser;
    return actualUser.uid;
  }

  /**
   * LOGOUT FUNCTION
   */
  async logout(): Promise<void> {
    try {
      await this.afsAuth.signOut();
      localStorage.removeItem('user');
    } catch (e) {
      localStorage.removeItem('user');
    }
  }

  /**
   * GET THE USER AUTHENTICATION STATUS
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

}
