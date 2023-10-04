import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user-service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {User} from "../../models/user/user.model";
import {Message} from "../../models/notification/message.model";

@Component({
	selector: 'app-running-head',
	templateUrl: './running-head.component.html',
	styleUrls: ['./running-head.component.css']
})
export class RunningHeadComponent implements OnInit {

	currentUser?: User;
	isLoggedIn: boolean = false;
	currentUserNotification?: Notification;
	noOfUnreadNotifications?: number;

	constructor(private userService: UserService, private notification: NotificationService, private router: Router) {
	}

	ngOnInit(): void {
		if (`${localStorage.getItem('token')}` !== "null") {
			this.isLoggedIn = true;
			setTimeout(() => {
				this.currentUser = this.userService.currentUser;
				this.currentUserNotification = this.notification?.currentUserNotifications;
				this.noOfUnreadNotifications = this.currentUserNotification?.messages?.filter(message => message.messageRead === false).length;
				console.log(this.currentUserNotification);
				console.log(this.noOfUnreadNotifications);
			}, 1000)
		}
		window.addEventListener('scroll', () => {
			if (window.scrollY >= 5) {
				document.body.style.setProperty('--header-background-color', 'rgba(243, 106, 62, 1)');
				document.body.style
			} else {
				document.body.style.setProperty('--header-background-color', 'rgba(0, 0, 0, 0)');
			}
		})
	}

	logout() {
		this.userService.logoutUser();
	}

	goToNotification() {
		this.router.navigateByUrl('/notification').then(() => {
			window.location.reload();
		});
	}

}
