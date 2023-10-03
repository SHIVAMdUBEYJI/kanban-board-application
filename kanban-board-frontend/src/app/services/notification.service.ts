import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	endPointURL: string = "http://localhost:9000/notification";
	currentUserNotifications?: Notification;

	constructor(private httpClient: HttpClient) {
	}


}
