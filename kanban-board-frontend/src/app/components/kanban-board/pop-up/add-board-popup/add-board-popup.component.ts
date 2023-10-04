import {Component, Inject, OnInit} from '@angular/core';
import {Kanban} from "../../../../models/kanban/kanban.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../dialog.data";
import {KanbanServiceService} from "../../../../services/kanban-service.service";
import {Board} from "../../../../models/kanban/board.model";

@Component({
	selector: 'app-add-board-popup',
	templateUrl: './add-board-popup.component.html',
	styleUrls: ['./add-board-popup.component.css']
})
export class AddBoardPopupComponent implements OnInit{
	currentUserKanban?: Kanban;
	isBoardNameValid?: boolean;
	boardNames: String[] = [];
	messageToDisplay?: string;

	constructor(public dialogRef: MatDialogRef<AddBoardPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private kanbanService: KanbanServiceService) {
	}

	checkBoardName() {
		this.isBoardNameValid = !this.boardNames.includes(this.data.boardName, 0);
	}

	onNoClick() {
		this.dialogRef.close(null);
	}

	ngOnInit(): void {
		this.currentUserKanban = this.kanbanService.currentUserKanban;
		this.messageToDisplay = this.data.messageToDisplay;
		this.currentUserKanban?.boards?.forEach((b: Board) => {
			this.boardNames.push(b.boardName!);
		});
		this.boardNames.push("");
	}
}
