import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
	loginUser(user:User):void {
		user.email = user?.email?.toLowerCase();
		this.httpClient.post(`${this.endPointURL}/login`,user).subscribe({
			next: (response:any) =>{
				this.isLoggedIn = true;
				localStorage.setItem('token',response.token);
				localStorage.setItem('user_email',user.email!);
				this.getUserProfile();
				this.snackBar.open("Login Successfully !!","Done",{duration: 3000});
				this.router.navigateByUrl("").then(()=>{
					setTimeout(()=>{
						window.location.reload()
					},100);
				})
			},
			error:(err)=>{
				if(err.status == 404){
					this.snackBar.open("Login Failed !!  Email or Password is Incorrect","Ok",{duration:3000} )
				}
			}
		});
	}

	logoutUser(){
		localStorage.removeItem('token');
		localStorage.removeItem('user_email');
		localStorage.removeItem('user_firstname');
		this.isLoggedIn = false;
		this.router.navigateByUrl("").then(()=>{
			setTimeout(()=>{
				window.location.reload()
			},100)
		})
	}

	getUserProfile(){
		return this.httpClient.get<User>(
			`${this.endPointURL}/guard/email/${localStorage.getItem('user_email')}`,
			{headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
				).subscribe({
			next:(response) =>{
				this.currentUser = response ;
				this.isLoggedIn = true;
				localStorage.setItem('user_firstname',response.firstName!);
				console.log(this.currentUser)
			}
		});
	}


}
