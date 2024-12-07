import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationResponse } from '../../interfaces';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
    selector: 'app-notification-panel',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ],
    templateUrl: './notificationPanel.component.html',
    styleUrl: './notificationPanel.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationPanelComponent {
    @Input()
    notification: NotificationResponse|null = null;

    @Output()
    public onMarked: EventEmitter<NotificationResponse> = new EventEmitter();


    markAsRead() {
        if (this.notification) {
            this.onMarked.emit(this.notification);
        }
    }


}
