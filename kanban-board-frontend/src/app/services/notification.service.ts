import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user.model";
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser";

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
}
