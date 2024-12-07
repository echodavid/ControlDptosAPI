import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AuthService } from '../../auth/services/auth.service';
@Component({
    selector: 'app-dahsboard',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatSidenavModule,
        MatDividerModule,
        MatIconModule,
        MatListModule
    ],
    templateUrl: './dahsboard.component.html',
    styleUrl: './dahsboard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DahsboardComponent {
    private authService = inject(AuthService);

    public user = computed (() => this.authService.currentUser());



}
