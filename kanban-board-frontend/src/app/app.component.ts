import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user-service";
import {NotificationService} from "./services/notification.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'kanban-board';

  constructor(
	  private userService:UserService,
	  private notification:NotificationService
  ) {
  }
	ngOnInit(): void {
	  if(localStorage.getItem('token') !=null){
		  this.userService.getUserProfile();
		  this.notification.getNotification();
	  }
	}
}
