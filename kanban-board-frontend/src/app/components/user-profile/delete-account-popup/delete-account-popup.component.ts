import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {KanbanServiceService} from "../../../services/kanban-service.service";
import {NotificationService} from "../../../services/notification.service";
import {UserService} from "../../../services/user-service";

@Component({
    selector: 'app-delete-account-popup', templateUrl: './delete-account-popup.component.html', styleUrls: ['./delete-account-popup.component.css']
})
export class DeleteAccountPopupComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<DeleteAccountPopupComponent>, private kanbanService: KanbanServiceService, private notificationService: NotificationService, public userService: UserService) {
    }

    ngOnInit(): void {
    }

    onNoClick() {
        this.dialogRef.close(null);
    }

    deleteAccount() {
        setTimeout(() => {
            this.userService.deleteUserAccount();
            this.kanbanService.deleteKanban();
            this.notificationService.deleteNotification();
            this.userService.logoutUser();
        }, 1000);
    }
}
