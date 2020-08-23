import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
	sub
	username: string
	profilePic: string

	password: string
	newpassword: string

  constructor(      
      private afs: AngularFirestore,
      private router: Router,
      
      private user: UserService) {
      
        this.mainuser = afs.doc(`user/${user.getUID()}`)
      
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.username = event.username        
		  })
  }
  
  ngOnInit() {
  }

  async updateDetails() {				

		try {

      await this.user.reAuth(this.user.getUsername(), this.password)
      
		} catch(error) {
			
		}

		if(this.newpassword) {
			await this.user.updatePassword(this.newpassword)
		}

		if(this.username !== this.user.getUsername()) {
			await this.user.updateEmail(this.username)
			this.mainuser.update({
				username: this.username
			})
		}

		this.password = ""
		this.newpassword = ""		

		this.router.navigate(['/profile'])
	}

}
