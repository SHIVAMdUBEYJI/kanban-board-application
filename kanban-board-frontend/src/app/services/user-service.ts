import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnInit {

    userURL: string = `http://localhost:8081/home/register`

    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    ngOnInit(): void {
    }

    registerUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${this.userURL}`, user);
    }

	loginUser(): Observable<User[]> {
		return this.httpClient.get<User[]>(this.userURL);
	}
}
