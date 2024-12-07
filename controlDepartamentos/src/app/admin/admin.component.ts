import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarComponent } from './topBar/topBar.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        RouterModule,
        TopBarComponent,
        CommonModule,
    ],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent { }
