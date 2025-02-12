import {Component, OnInit} from '@angular/core';
import {Kanban} from "../../../models/kanban/kanban.model";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {KanbanDialogComponent} from "../kanban-dialog/kanban-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-kanban-home', templateUrl: './kanban-home.component.html', styleUrls: ['./kanban-home.component.css']
})
export class KanbanHomeComponent implements OnInit {

	kanbanList : Kanban[] = [
	] ;

	constructor(private kanbanService: KanbanServiceService,
				private router: Router,
				private dialog: MatDialog) {
	}

	ngOnInit(): void {
		this.retrieveAllKanbanBoards();
	}

	openDialogForNewKanban(): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			kanban: new Kanban(),
		};
		dialogConfig.disableClose =false;
		dialogConfig.id = 'kanban-dialog';
		this.dialog.open(KanbanDialogComponent, dialogConfig)
	}

	private retrieveAllKanbanBoards(): void {
		this.kanbanService.retrieveAllKanbanBoards()
			.subscribe(response => {
			this.kanbanList = response;
			console.log(response);
		})
	}

}
