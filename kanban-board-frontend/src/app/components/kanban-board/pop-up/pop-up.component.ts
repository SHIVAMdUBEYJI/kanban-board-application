import {Component, Inject, OnInit} from "@angular/core";
import {Kanban} from "../../../models/kanban/kanban.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog.data";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {Board} from "../../../models/kanban/board.model";
import {Column} from "../../../models/kanban/column.model";

@Component({
	selector: 'app-add-board-popup',
	templateUrl: './add-board-popup.component.html',
	styleUrls: ['./add-board-popup.component.css']
})
export class AddBoardPopupComponent implements OnInit {
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


@Component({
	selector: 'app-add-column-popup',
	templateUrl: './add-column-popup.component.html',
	styleUrls: ['./add-column-popup.component.css']
})
export class AddColumnPopupComponent implements OnInit{
	boardToDisplay?: Board;
	isColumnValid?: boolean;
	columnNames: String[] = [];
	messageToDisplay?: string;

	constructor(
		public dialogRef: MatDialogRef<AddColumnPopupComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {

	}

	checkColumnName() {
		this.isColumnValid = !this.columnNames.includes(this.data.columnName, 0);
	}

	onNoClick() {
		this.dialogRef.close(null);
	}

	ngOnInit(): void {
		this.boardToDisplay = this.data.boardToDisplay;
		this.messageToDisplay = this.data.messageToDisplay;
		this.boardToDisplay.columns?.forEach((c: Column) => {
			this.columnNames.push(c.columnName!);
		});
		this.columnNames.push("");
	}

}


@Component({
	selector: 'app-add-member-popup',
	templateUrl: './add-member-popup.component.html',
	styleUrls: ['./add-member-popup.component.css']
})
export class AddMemberPopupComponent {

}


@Component({
	selector: 'app-add-task-popup',
	templateUrl: './add-task-popup.component.html',
	styleUrls: ['./add-task-popup.component.css']
})
export class AddTaskPopupComponent {

}








