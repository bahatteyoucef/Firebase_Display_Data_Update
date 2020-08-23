import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { NavController } from '@ionic/angular';
import { UserService } from '../user.service';

import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  email:any;
  password:any;

  constructor(private nav:NavController, private user:UserService, public afstore: AngularFirestore) {}

  login()
  {  
      firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(resp=>{

        this.user.setUser({
					username  : resp.user.email ,
					uid       : resp.user.uid
				})

        this.nav.navigateForward("/profile");            
      },err=>{
        
        console.log("ttttt");
        //Fail! Login Failed!
      });
  }


  async register() {
		
		try {
			const res = await firebase.auth().createUserWithEmailAndPassword(this.email , this.password)

			this.afstore.doc(`users/${res.user.uid}`).set({
				email : this.email
			});

			this.user.setUser({
				username  : res.user.email ,
				uid       : res.user.uid
			});			

      this.nav.navigateForward("/profile");            

		} catch(error) {
			console.dir(error)
		}
	}


}
