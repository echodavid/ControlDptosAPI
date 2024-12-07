import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NotificationComponent } from "../../../../common/components/notification/notification.component";
import { NotificationsService } from '../../../../common/services/notifications.service';
import { NotificationResponse } from '../../../../common/interfaces';
import { NotificationPanelComponent } from "../../../../common/components/notificationPanel/notificationPanel.component";

@Component({
    selector: 'app-nots',
    standalone: true,
    imports: [
    CommonModule,
    MatListModule,
    NotificationComponent,
    NotificationPanelComponent
],
    templateUrl: './nots.component.html',
    styleUrl: './nots.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotsComponent {

    public notifications = computed(() => this.notificationsService.notifications());
    public notificationOpened = signal<NotificationResponse | null>(null);



    constructor(private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.notificationsService.getNotifications().subscribe({
          next: (response) => {
            console.log('Notifications fetched successfully', this.notifications());
          },
          error: (error) => {
            console.error('Error fetching notifications:', error);
          }
        });
      }
    
      onNotificationClick(notification: NotificationResponse) {
        this.notificationOpened.set(notification);
        console.log('Notification clicked:', notification);
      }

      
      public markAsRead(notification: NotificationResponse) {
        console.log('Marking as read:', notification);
        this.notificationsService.markAsRead(notification).subscribe({
          next: () => {
            this.notificationOpened.set(null);
            console.log('Notification marked as read:', notification);
          },
          error: (error) => {
            console.error('Error marking notification as read:', error);
          }
        });
      }







}
