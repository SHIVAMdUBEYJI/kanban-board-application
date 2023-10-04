import {Injectable} from '@angular/core';
import {Kanban} from "../models/kanban/kanban.model";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {Board} from "../models/kanban/board.model";
import {Column} from "../models/kanban/column.model";
import {Task} from '../models/kanban/task.model';


class kanban {
}

@Injectable({
	providedIn: 'root'
})
export class KanbanServiceService {

	endPointURL: string = 'http://losthost:9000/kanban';
	currentUserKanban?: Kanban;

	constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
	}

	saveKanban(Kanban: kanban) {
		return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`, kanban);
	}

	getCurrentUserKanban() {
		return this.httpClient.get<Kanban>(`${this.endPointURL}/get-kanban/${localStorage.getItem('user_email')}`)
			.subscribe({
				next: (response: Kanban) => {
					response.boards?.forEach((b: Board) => {
						b.columns?.forEach((c: Column) => {
							c.tasks?.forEach((t: Task) => {
								t.startDate = new Date(t.startDate!);
								t.startDate = new Date(t.startDate?.getFullYear()!, t.startDate?.getMonth()!, t.startDate?.getDate()! + 1);
								t.dueDate = new Date(t.dueDate!);
								t.dueDate = new Date(t.dueDate?.getFullYear()!, t.dueDate?.getMonth()!, t.dueDate?.getDate()! + 1);
							})
						})
					})
					this.currentUserKanban = response;
				}, error: (error) => console.log(error)
			})
	}

	getKanbanByEmail(email: string) {
		return this.httpClient.get<Kanban>(`${this.endPointURL}/get-kanban/${email}`);
	}

	updateKanban(kanban: Kanban) {
		return this.httpClient.put<Kanban>(`${this.endPointURL}/update-kanban`, kanban)
			.subscribe({
				next: (response: Kanban) => this.currentUserKanban = response, error: (err) => console.log(err)
			});
	}

	deleteKanban() {
		return this.httpClient.delete(`${this.endPointURL}/delete-kanban/${localStorage.getItem('user_email')}`).subscribe({
			next: () => console.log("Kanban deleted")
		})
	}



}
