import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'users-top-bar',
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
    private router = inject(Router);

    constructor(
        private authService: AuthService

    ) {
    }

    logout() {
        this.authService.logout();
    }
    goToProfile() {
        this.router.navigate(['/users/profile']);

    }

}
