import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {LoginGuard} from "./guards/login.guard";
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
		path:'dashboard',component:KanbanBoardComponent,
		canActivate:[LoginGuard]

	},
	{
		path:'profile',component:UserProfileComponent,
		canActivate:[LoginGuard]
	},
	{
		path:'notification',component:NotificationComponent,
		canActivate:[LoginGuard]
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
