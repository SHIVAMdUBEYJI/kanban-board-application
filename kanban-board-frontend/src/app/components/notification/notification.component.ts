import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Message} from "../../models/notification/message.model";
import {Notification} from "../../models/notification/notification.model";

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	currentUserNotification?: Notification ;

	constructor(private notificationService: NotificationService) {
	}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	//deleteNotification(message: Message) {
		//this.currentUserNotification?.messages?.splice(this.currentUserNotification?.messages?.indexOf(message), 1);
		//this.notificationService.updateNotification(this.currentUserNotification!);
	//}
}
