import {Component, OnInit} from '@angular/core';
import {Kanban} from "../../../models/kanban/kanban.model";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-kanban-home',
  templateUrl: './kanban-home.component.html',
  styleUrls: ['./kanban-home.component.css']
})
export class KanbanHomeComponent implements OnInit{

	kanbanList: Kanban[] | undefined;

	constructor(private kanbanService:KanbanServiceService,
				private dialog: MatDialog) {
	}
	ngOnInit(): void {
	}

}
