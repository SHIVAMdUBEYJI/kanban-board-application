import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Message} from "../../models/notification/message.model";

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	currentUserNotification?: Notification;

	constructor(private notificationService: NotificationService) {
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.currentUserNotification = this.notificationService.currentUserNotifications;
			this.currentUserNotification?.messages?.forEach(message => message.messageRead = true);
			this.notificationService.updateNotification(this.currentUserNotification!);
		}, 1000);
	}

	deleteNotification(message: Message) {
		this.currentUserNotification?.messages?.splice(this.currentUserNotification?.messages?.indexOf(message), 1);
		this.notificationService.updateNotification(this.currentUserNotification!);
	}

}
