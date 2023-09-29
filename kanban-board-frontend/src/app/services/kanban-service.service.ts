import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Kanban} from "../models/kanban/kanban.model";
import {environment} from "../../environments/environment";
import {Task} from "../models/task/task.model";


@Injectable({
	providedIn: 'root'
})
export class KanbanServiceService {

	private kanbanAppUrl = environment.kanbanAppUrl

	URL:string = 'http://localhost:9000/api/v1/kanbans/';

	constructor(private httpClient: HttpClient) {
	}

	retrieveAllKanbanBoards(): Observable<Kanban[]> {
		return this.httpClient.get<Kanban[]>(this.kanbanAppUrl + '/api/v1/kanbans/getAll');
	}

	retrieveKanbanById(id: string | null): Observable<Kanban>{
		return this.httpClient.get<Kanban>(this.kanbanAppUrl + '/api/v1/kanbans/' +id);
	}
	saveNewKanban(title:string): Observable<string> {
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		let options = {headers : headers};
		let jsonObject = this.prepareTitleJsonObject(title);
		return this.httpClient.post<string>(
			this.kanbanAppUrl + '/api/v1/kanbans/create',
			jsonObject,
			options
		);
	}

	saveNewTaskInKanban(kanbanId: number, task: Task):Observable<Task>{
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		let options = {headers:headers};
		console.log(this.URL + kanbanId +'/tasks');
		console.log(this.kanbanAppUrl);
		return this.httpClient.post<Task>(this.URL + kanbanId + '/tasks/',
			task,
			options
		);
	}

	private prepareTitleJsonObject(title:string){
		const object = {
			title:title
		}
		return JSON.stringify(object);
	}

}
