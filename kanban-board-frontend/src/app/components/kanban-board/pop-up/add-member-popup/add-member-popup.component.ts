import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../dialog.data";
import {UserService} from "../../../../services/user-service";

@Component({
	selector: 'app-add-member-popup',
	templateUrl: './add-member-popup.component.html',
	styleUrls: ['./add-member-popup.component.css']
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
