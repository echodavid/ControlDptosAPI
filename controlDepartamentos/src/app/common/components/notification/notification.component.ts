import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [
        CommonModule,
        MatListModule,
        MatCardModule
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
    @Input() title: string = 'Title';
    @Input() description: string = 'Description';
    @Input() date: Date = new Date();




}
