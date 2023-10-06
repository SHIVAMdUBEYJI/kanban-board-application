import {Injectable} from '@angular/core';
import {Kanban} from "../models/kanban/kanban.model";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {Board} from "../models/kanban/board.model";
import {Column} from "../models/kanban/column.model";
import {Task} from '../models/kanban/task.model';

@Injectable({
	providedIn: 'root'
})
export class KanbanServiceService {

	endPointURL: string = 'http://localhost:9002/kanban';
	currentUserKanban?: Kanban;

	constructor(private httpClient: HttpClient, private notificationService: NotificationService) {
	}

	saveKanban(kanban: Kanban) {
		return this.httpClient.post<Kanban>(`${this.endPointURL}/save-kanban`, kanban);
	}

	getCurrentUserKanban() {
		return this.httpClient.get<Kanban>(`${this.endPointURL}/get-kanban/${localStorage.getItem('user_email')}`)
			.subscribe({
				next: (response: Kanban) => {
					response.boards?.forEach((board: Board) => {
						board.columns?.forEach((column: Column) => {
							column.tasks?.forEach((task: Task) => {
								task.startDate = new Date(task.startDate!);
								task.startDate = new Date(task.startDate?.getFullYear()!, task.startDate?.getMonth()!, task.startDate?.getDate()! + 1);
								task.dueDate = new Date(task.dueDate!);
								task.dueDate = new Date(task.dueDate?.getFullYear()!, task.dueDate?.getMonth()!, task.dueDate?.getDate()! + 1);
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
		console.log(kanban)
		return this.httpClient.put<Kanban>(`http://localhost:9002/kanban/update-kanban`, kanban)
			.subscribe({
				next: (response: Kanban) => this.currentUserKanban = response, error: (err) => console.log(err)
			});
	}

	deleteKanban() {
		return this.httpClient.delete(`${this.endPointURL}/delete-kanban/${localStorage.getItem('user_email')}`).subscribe({
			next: () => console.log("Kanban deleted")
		})
	}

	addMemberToBoard(kanban: Kanban, email: string) {
		return this.httpClient.put<Kanban>(`${this.endPointURL}/add-member-to-board/${email}`, kanban);
	}

	sendMessageToMember(message: string, email: string) {
		let messageDTO = {
			email: email, message: message
		};
		return this.httpClient.put(`${this.endPointURL}/send-message`, messageDTO).subscribe({
			next: () => this.notificationService.getNotification(), error: (err) => console.log(err)
		});
	}
}
