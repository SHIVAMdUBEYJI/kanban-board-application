import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user.model";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import {Notification} from "../models/notification/Notification";


@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	endPointURL: string = "http://localhost:9000/notification";
	currentUserNotifications?: Notification;

	constructor(private httpClient: HttpClient) {
	}

	sendMail(user: User) {
		emailjs.send('service_spywz99', 'template_swzyasm', {
			email: user.email, firstName: user.firstName
		}, 'U5Dd7D-6H0Gi074Pr')
			.then((result: EmailJSResponseStatus) => {
				console.log(result.text);
			}, (error: { text: any; }) => {
				console.log(error.text);
			})
	}
	getNotification() {
		this.httpClient.get<Notification>(`${this.endPointURL}/getByEmail/${localStorage.getItem('user_email')}`)
			.subscribe({
				next: (response) => this.currentUserNotifications = response,
				error: (err) => console.log(err)
			})
	}
	updateNotification(notification: Notification) {
		this.httpClient.put<Notification>(`${this.endPointURL}/updateNotification`, notification)
			.subscribe({
				next: (response) => this.currentUserNotifications = response,
				error: (err) => console.log(err)
			})
	}
	deleteNotification() {
		this.httpClient.delete(`${this.endPointURL}/delete/${localStorage.getItem('user_email')}`)
			.subscribe({
				next: () => console.log("Notification deleted"),
				error: (err) => console.log(err)
			})
	}
}
