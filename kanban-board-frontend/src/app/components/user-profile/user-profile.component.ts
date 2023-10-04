import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user-service";
import {KanbanServiceService} from "../../services/kanban-service.service";
import {NotificationService} from "../../services/notification.service";
import {ImageService} from "../../services/image.service";

@Component({
    selector: 'app-user-profile', templateUrl: './user-profile.component.html', styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    image?: File
    wantToUpdate: boolean = false;
    currentUser?: User;
    imageURL?: string;
    isFileValid?: boolean;

    constructor(public userService: UserService, private imageService: ImageService, private snackbar: MatSnackBar, public dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    updateUser(): void {
        console.log(this.currentUser)
        this.userService.updateUserProfile(this.currentUser!).subscribe({
            next: () => this.snackBar.open("Profile Update Successfully !!!", "Done", {duration: 3000}), error: (error) => console.log(error)
        });
    }

    uploadProfilePicture() {
        if (this.isFileValid) {
            this.imageService.uploadProfilePicture(this.image!).subscribe({
                next: (response: any) => {
                    this.imageURL = response['secure_url'];
                    this.snackbar.open("Profile Image updated successfully!", "Close", {duration: 3000});
                }, error: (err) => console.log(err)
            });
            setTimeout(() => {
                this.currentUser!.imageURL = this.imageURL!;
                this.updateUser();
            }, 3000);
        }
    }

    updateImage(event: any) {
        this.image = event.target.files![0];
        this.isFileValid = this.image?.size! <= 1024000;
        if (!this.isFileValid) this.snackbar.open("File is too big!", "Close", {duration: 3000});
    }

    ngOnInit(): void {
        this.currentUser = this.userService.currentUser;
        setTimeout(() => {
            this.currentUser = this.userService.currentUser;
        }, 1000)
    }

    openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(DeleteAccountPopupComponent, {
            width: '300px', enterAnimationDuration, exitAnimationDuration,
        });
    }
}

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
