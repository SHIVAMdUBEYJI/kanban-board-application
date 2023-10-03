import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user/user.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
	providedIn: 'root'
})
export class UserService implements OnInit {

	endPointURL:string = 'http://localhost:9000/home';
	currentUser? :User;
	isLoggedIn:boolean = false;

	constructor(
		private httpClient: HttpClient,
		private router:Router,
		private snackBar:MatSnackBar
	) {
	}
	ngOnInit(): void {
	}

	registerUser(user:User):Observable<any>{
		user.email = user?.email?.toLowerCase();
		return this.httpClient.post(`${this.endPointURL}/register`,user);
	}


}
