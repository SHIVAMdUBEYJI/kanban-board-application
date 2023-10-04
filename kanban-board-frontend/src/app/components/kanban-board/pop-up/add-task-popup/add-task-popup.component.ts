import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user.model";
import {Board} from "../../../../models/kanban/board.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../dialog.data";
import {UserService} from "../../../../services/user-service";
import {Column} from "../../../../models/kanban/column.model";

@Component({
	selector: 'app-add-task-popup',
	templateUrl: './add-task-popup.component.html',
	styleUrls: ['./add-task-popup.component.css']
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
