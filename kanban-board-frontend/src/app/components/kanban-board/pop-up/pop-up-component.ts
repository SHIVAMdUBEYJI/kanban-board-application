import {Component, Inject, OnInit} from "@angular/core";
import {Kanban} from "../../../models/kanban/kanban.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../dialog.data";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {Board} from "../../../models/kanban/board.model";
import {Column} from "../../../models/kanban/column.model";
import {UserService} from "../../../services/user-service";
import {User} from "../../../models/user/user.model";

@Component({
	selector: 'app-add-board-popup',
	templateUrl: './add-board-popup.component.html',
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
		console.log(this.currentUserKanban)
		this.currentUserKanban = this.kanbanService.currentUserKanban;
		console.log(this.currentUserKanban)
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


@Component({
	selector: 'app-add-member-popup',
	templateUrl: './add-member-popup.component.html',
})
export class AddMemberPopupComponent implements OnInit{
	allEmails?: string[];
	isEmailValid?: boolean;

	constructor(public dialogRef: MatDialogRef<AddMemberPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService) {
	}

	onNoClick() {
		this.dialogRef.close(null);
	}

	checkEmail() {
		this.isEmailValid = this.allEmails?.includes(this.data.email, 0);
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.userService.getAllEmails().subscribe({
				next: (result: string[] | undefined) => {
					this.allEmails = result;
				}
			});
		}, 1000);
	}
}


@Component({
	selector: 'app-add-task-popup',
	templateUrl: './add-task-popup.component.html',
})
export class AddTaskPopupComponent implements OnInit {

	priorities = ['Low', 'Medium', 'High'];
	boardMembers?: string[];
	users?: User[] = [];
	boardToDisplay?: Board;
	isTaskNameValid?: boolean;
	taskNames: String[] = [];
	messageToDisplay?: string;
	currentDate: Date = new Date();
	isTaskAssigneeValid?: boolean = true;
	minimumDate: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
	numberOfTasksAssignedToUsers: Map<string, number> = new Map<string, number>();

	constructor(public dialogRef: MatDialogRef<AddTaskPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService) {
	}

	checkTaskName() {
		this.isTaskNameValid = !this.taskNames.includes(this.data.taskName, 0);
	}

	onNoClick() {
		this.dialogRef.close(null);
	}

	ngOnInit(): void {
		console.log(this.isTaskAssigneeValid);
		this.boardToDisplay = this.data.boardToDisplay;
		this.boardMembers = this.data.boardToDisplay?.members;
		this.numberOfTasksAssignedToUsers = this.data.numberOfTasksAssignedToUsers;
		console.log(this.numberOfTasksAssignedToUsers);
		this.boardMembers?.forEach((m: string) => {
			this.userService.getUserByEmail(m).subscribe((user: User) => {
				this.users?.push(user);
			});
		});
		this.messageToDisplay = this.data.messageToDisplay;
		this.boardToDisplay.columns?.forEach((c: Column) => {
			c.tasks?.forEach((t) => {
				if (t.name === this.data.taskName) {
					this.taskNames.push("");
				} else {
					this.taskNames.push(t.name!);
				}
			});
		});
		this.isTaskNameValid = !this.taskNames.includes(this.data.taskName, 0);
	}

	checkTaskAssignee() {
		if (this.numberOfTasksAssignedToUsers.get(this.data.taskAssignee!)! >= 3) {
			this.isTaskAssigneeValid = false;
		} else {
			this.isTaskAssigneeValid = true;
		}
		console.log("Is valid - " + this.isTaskAssigneeValid);
	}
}

