import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Kanban} from "../models/kanban/kanban.model";
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class KanbanServiceService {

	private kanbanAppUrl = environment.kanbanAppUrl

	constructor(private httpClient: HttpClient) {
	}

	retrieveAllKanbanBoards(): Observable<Kanban[]> {
		return this.httpClient.get<Kanban[]>(this.kanbanAppUrl + '/kanbans/');
	}

	retrieveKanbanById(id: String): Observable<Kanban>{
		return this.httpClient.get<Kanban>(this.kanbanAppUrl + '/kanbans/' +id);
	}
	saveNewKanban(title:string): Observable<string> {
		let headers = new HttpHeaders({'Content-Type': 'application/json'});
		let options = {headers : headers};
		let jsonObject = this.prepareTitleJsonObject(title);
		return this.httpClient.post<string>(
			this.kanbanAppUrl + '/kanbans/',
			jsonObject,
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
