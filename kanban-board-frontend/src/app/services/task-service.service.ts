import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../models/task/task.model";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class TaskServiceService {

	private kanbanAppUrl = environment.kanbanAppUrl

	constructor(private httpClient: HttpClient) {
	}

	updateTask(task: Task): Observable<Task> {
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		let options = {headers: headers};
		return this.httpClient.put<Task>(this.kanbanAppUrl + '/api/v1/tasks/' + task.id, task, options);
	}

	getTaskById(id: number): Observable<Task> {
		return this.httpClient.get<Task>(this.kanbanAppUrl + '/api/v1/tasks/' + id);
	}
}
