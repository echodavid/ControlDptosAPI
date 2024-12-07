import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'admin-top-bar',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
    ],
    templateUrl: './topBar.component.html',
    styleUrl: './topBar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent { 

    constructor(
        private authService: AuthService
    ) {
    }

    logout() {
        this.authService.logout();
    }

}
