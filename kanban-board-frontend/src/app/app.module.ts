import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { RunningHeadComponent } from './components/running-head/running-head.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import { NotificationComponent } from './components/notification/notification.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { AddBoardPopupComponent } from './components/kanban-board/pop-up/add-board-popup/add-board-popup.component';
import { AddColumnPopupComponent } from './components/kanban-board/pop-up/add-column-popup/add-column-popup.component';
import { AddMemberPopupComponent } from './components/kanban-board/pop-up/add-member-popup/add-member-popup.component';
import { AddTaskPopupComponent } from './components/kanban-board/pop-up/add-task-popup/add-task-popup.component';
import { DeleteAccountPopupComponent } from './components/user-profile/delete-account-popup/delete-account-popup.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { NotificationModel } from './models/notification/notification.model';
import { SecureComponent } from './components/secure/secure.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterFormComponent,
    LoginFormComponent,
    RunningHeadComponent,
    NotificationComponent,
    UserProfileComponent,
    ErrorNotFoundComponent,
    KanbanBoardComponent,
    AddBoardPopupComponent,
    AddColumnPopupComponent,
    AddMemberPopupComponent,
    AddTaskPopupComponent,
    DeleteAccountPopupComponent,
    NotificationModel,
    SecureComponent,
  ],
	imports: [
		FormsModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		ReactiveFormsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-right'
		}),
		CdkDropList,
		CdkDrag,
		MatDialogModule,
		MatSelectModule,
		MatCardModule,
		MatMenuModule,
		MatBadgeModule,
		MatTooltipModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
