import { Injectable } from '@angular/core'
import * as firebase from 'firebase';
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
  email: string,
  password: string,
	uid: string
}

@Injectable()
export class UserService {
  
  private user: user

	constructor() {

	}

	setUser(user: user) {
		this.user = user
	}

	getUsername(): string {
		return this.user.email
	}

	reAuth(username: string, password: string) {
		return firebase.auth().currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@codedamn.com', password))
	}

	updatePassword(newpassword: string) {
		return firebase.auth().currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return firebase.auth().currentUser.updateEmail(newemail)
	}

	getUID(): string {
		return this.user.uid
	}
}