import {Component, OnInit} from '@angular/core';
import {Task} from "../../../models/task/task.model";
import {Kanban} from "../../../models/kanban/kanban.model";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {TaskServiceService} from "../../../services/task-service.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit{

	kanban: Kanban;
	todos: Task[] =[];
	inProgress:Task[] =[];
	dones :Task[]=[];

	constructor(private kanbanService:KanbanServiceService,
				private taskService:TaskServiceService,
				private route:ActivatedRoute,
				private dialog:MatDialog) {
	}
	ngOnInit(): void {
		this.getKanban();
	}

	drop(event: CdkDragDrop<string[]>){
		if(event.previousContainer === event.container){
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}else {
			this.updateTaskStatusAfterDragDrop(event);
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex)
		}
	}

}
