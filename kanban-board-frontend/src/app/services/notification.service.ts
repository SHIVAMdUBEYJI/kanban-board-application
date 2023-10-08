import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user/user.model";
import {Notification} from "../models/notification/Notification";
import * as nodemailer from 'nodemailer';



@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	endPointURL: string = "http://localhost:9002/notification";
	currentUserNotifications?: Notification;

	// private transporter: nodemailer.Transporter;

	constructor(private httpClient: HttpClient) {
		// this.transporter = nodemailer.createTransport({
		// 	service:'gmail',
		// 	auth:{
		// 		user:'saran201496@gmail.com',
		// 		pass:'Saraneswar@4896'
		// 	}
		// });
	}

	// async sendMail(user: User) {
	// 	const emailContent =`
	// 	<p>Hello ${user.firstName} ${user.lastName},</p>
    //     <p>Thank You for registeration with us</p>
    //     <p>Your login credentials:</p>
    //     <p>Email: ${user.email}</p>
    //     <p>Password: ${user.password}</p>
    //     <p>Regards,</p>
    //     <p>the TEAM</p>`;
	//
    // const toEmail = user.email || '';
	// const mailOptions = {
	// 	from: 'saran201496@gmail.com',
	// 	to: toEmail,
	// 	subject: 'Registration confirmation',
	// 	html: emailContent,
	// };
	// try {
	// 	const info = await this.transporter.sendMail(mailOptions);
	// 	console.log('Email sent: ' +info.response);
	// }catch (error){
	// 	console.log('Error sending email: '+ error);
	// }
	// }
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
