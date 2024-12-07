import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../../../common/services/user.service';
import { UserResponse } from '../../../../common/interfaces';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserItemComponent } from "./components/user-item/user-item.component";
import { UserPanelComponent } from "./components/user-panel/user-panel.component";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    UserItemComponent,
    UserPanelComponent,
    MatButtonModule
],
  templateUrl: './Usuarios.component.html',
  styleUrl: './Usuarios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent {
  constructor(
    private usersService: UserService,
    private dialog: MatDialog
  ) {}

  public users = computed(() => this.usersService.users());

  public userOpened = signal<UserResponse | null>(null);


  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        console.log('Users fetched successfully[]', this.users());
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

  }

  
  onUserClic(user: UserResponse) {
    this.userOpened.set(user);
    console.log('User clicked:', user);
  }


  openAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        // Lógica para agregar el nuevo servicio
        this.usersService.addUser(result).subscribe({
          next: (response) => {
            console.log('User added successfully', response);
            this.usersService.getUsers().subscribe({
              next: (response) => {
                console.log('Users fetched successfully', this.users());
              },
              error: (error) => {
                console.error('Error fetching users:', error);
              }
            });
            this.usersService
          }
        });
      }
    });
  }
  public delete(user: UserResponse) {
    this.usersService.removeUser(user).subscribe({
      next: (response) => {
        console.log('User deleted successfully', response);
        this.userOpened.set(null);
      },
      error: (error) => {
        alert('Error al eliminar el dpto: ' + error.message);

      }
    });



  }

  // public postService(servicio: ServiciosAsignadoPost) {
  //   this.dptosService.addServicio(servicio).subscribe({
  //     next: (response) => {
  //       console.log('Service added successfully', response);
  //     },
  //     error: (error) => {
  //       alert('Error al agregar el servicio: ' + error.message);
  //     }
  //   });
  // }


  // public edit(dpto: DptoReponse) {
  // }

  // public onUserSelect(event: UserSelectEvent) {
  //   this.dptosService.asignarUserDpto( event.departamento, event.event).subscribe({
  //     next: (response) => {
  //       console.log('User assigned successfully', response);
  //     },
  //     error: (error) => {
  //       alert('Error al asignar el usuario: ' + error.message);
  //     }
  //   });
  // }

}

