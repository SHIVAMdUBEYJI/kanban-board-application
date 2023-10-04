import {Injectable} from '@angular/core';
import {Kanban} from "../models/kanban/kanban.model";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";


class kanban {
}

@Injectable({
	providedIn: 'root'
})
export class KanbanServiceService {

	endPointURL: string ='http://losthost:9000/kanban';
    currentUserKanban?:Kanban;

	constructor(
		private httpClient:HttpClient,
		private notificationService:NotificationService) {
	}

	saveKanban(Kanban: kanban){
		return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`,kanban);
	}




}
