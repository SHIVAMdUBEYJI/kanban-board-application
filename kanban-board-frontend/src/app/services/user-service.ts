import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UserService implements OnInit {

	registerURL: string = `http://localhost:9000/home/register`
	loginURL: string = `http://localhost:9000/home/login`

	constructor(private httpClient: HttpClient) {
		this.httpClient = httpClient;
	}

	ngOnInit(): void {
	}

	registerUser(user: User): Observable<User> {
		return this.httpClient.post<User>(`${this.registerURL}`, user);
	}

	loginUser(user: User): Observable<User> {
		return this.httpClient.post<User>(`${this.loginURL}`,user);
	}
}
