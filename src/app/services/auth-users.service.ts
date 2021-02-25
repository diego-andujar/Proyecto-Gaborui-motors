import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService {

  constructor(private afAuth: AngularFireAuth) { }

  /**
   * LOGIN USING EMAIL AND PASSWORD
   * @param email
   * @param password
   */
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<firebase.User> {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      localStorage.setItem('user', user.uid);
      return user;
    } catch (err) {
      console.log(err);
      localStorage.removeItem('user');
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
      const res = await this.afAuth.createUserWithEmailAndPassword(
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
  }

  /**
   * GET CURRENT LOGGED IN USER
   */
  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  /**
   * LOGOUT FUNCTION
   */
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
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
