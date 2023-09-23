import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KanbanServiceService} from "../../../services/kanban-service.service";

@Component({
	selector: 'app-kanban-dialog',
	templateUrl: './kanban-dialog.component.html',
	styleUrls: ['./kanban-dialog.component.css']
})
export class KanbanDialogComponent implements OnInit {
	private title: any;
	form: FormGroup;

	// @ts-ignore
	constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<KanbanDialogComponent>, @Inject(MAT_DIALOG_DATA) data, private kanbanService: KanbanServiceService) {
		this.form = formBuilder.group({
			title: [this.title, Validators.required]
		});
	}

	ngOnInit(): void {
	}

	close() {
		this.dialogRef.close();
	}

	save() {
		this.title = this.form.get('title')?.value;
		if (this.title) {
			this.kanbanService.saveNewKanban(this.title).subscribe(response => {
				console.log(response)
			})
		}
		this.dialogRef.close();
		window.location.reload();
	}
}
