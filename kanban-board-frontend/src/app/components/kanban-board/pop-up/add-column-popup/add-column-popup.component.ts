import {Component, Inject, OnInit} from '@angular/core';
import {Board} from "../../../../models/kanban/board.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../dialog.data";
import {Column} from "../../../../models/kanban/column.model";

@Component({
	selector: 'app-add-column-popup',
	templateUrl: './add-column-popup.component.html',
	styleUrls: ['./add-column-popup.component.css']
})
export class AddColumnPopupComponent implements OnInit {
	boardToDisplay?: Board;
	isColumnValid?: boolean;
	columnNames: String[] = [];
	messageToDisplay?: string;

	constructor(public dialogRef: MatDialogRef<AddColumnPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

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
