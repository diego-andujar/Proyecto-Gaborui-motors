import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    public database: AngularFirestore,) {}

  ngOnInit(): void {}

  async onHandleSignUp(formData: { displayName: string; email: string; password: string; }) {
    const user = await this.authService.signUpWithEmail(
      formData.displayName,
      formData.email,
      formData.password
    );
    if (user) {
      let userDB: User = {
        photoUrl: user.photoURL!,
        name: this.toTitleCase(formData.displayName),
        email: user.email!,
        phoneNumber: user.phoneNumber!,
        id: user.uid,
        rol: {
          client: true,
        }
      }
      console.log(userDB);
      const id = this.database.createId()
      userDB.refId = id;
      firebase.firestore().collection("users").doc(id).set(userDB);
      this.router.navigate(['/']);
    }
  }

  toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  
}
