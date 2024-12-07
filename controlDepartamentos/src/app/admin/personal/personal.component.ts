import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-personal',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './personal.component.html',
    styleUrl: './personal.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalComponent { }
