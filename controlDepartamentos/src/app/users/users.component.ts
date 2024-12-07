import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarComponent } from './components/topBar/topBar.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
        RouterModule,
        TopBarComponent,
        CommonModule,
    ],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent { }
