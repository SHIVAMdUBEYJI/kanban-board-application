import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";

import {HomeComponent} from "./components/home/home.component";
import {KanbanBoardComponent} from "./components/kanban-board/kanban-board.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {NotificationComponent} from "./components/notification/notification.component";
import {ErrorNotFoundComponent} from "./components/error-not-found/error-not-found.component";

const routes: Routes = [
	{
		path:"",component:HomeComponent
	},
	{
		path:'register',component:RegisterFormComponent
	},
	{
		path:'login',component:LoginFormComponent
	},
	{
		path:'dashboard',component:KanbanBoardComponent
	},
	{
		path:'profile',component:UserProfileComponent
	},
	{
		path:'notification',component:NotificationComponent
	},
	{
		path:"**",component:ErrorNotFoundComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
