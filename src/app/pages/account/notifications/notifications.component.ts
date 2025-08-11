import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/api/user.service';

import { SnackbarComponent } from '../../../custom/snackbar/snackbar.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{


  public notificationForm:UntypedFormGroup;

  constructor(
    public fb: UntypedFormBuilder,
    public snackBar: MatSnackBar, public userService: UserService){}

  ngOnInit() {

    this.notificationForm = this.fb.group({
      notification_auctions: false,
      notification_favorites: false,
      notification_news: false
    });

  }

  public onNotificationFormSubmit(values: Object):void {
    if (this.notificationForm.valid) {
      this.userService.updateUserNotifications(values).subscribe((response) => {

        console.log(response);
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success'],
          data: { message: 'Tu información se ha almacenado correctamente!' }
        });
        // this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      });
    }
  }

  registerNotification(){
    console.log("Clic save and continue Notification");
  }
}
