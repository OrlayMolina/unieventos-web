import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CuentaService } from '../../servicios/cuenta.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { CambiarPasswordDTO } from '../../dto/cambiar-password-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertaComponent
  ],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {

  codigoActivacion: string = '';
  email: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  alerta!:Alerta;

  constructor(private cuentaService: CuentaService, private router: Router) {}

  onActualizar(): void {
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.alerta = new Alerta('Las contraseñas no coinciden', 'danger');
      return;
    }

    // Crear el objeto CambiarPasswordDTO con los valores del formulario
    const cambiarPasswordDTO = new CambiarPasswordDTO(
      this.email,
      this.codigoActivacion,
      this.nuevaContrasena
    );

    this.cuentaService.cambiarPassword(cambiarPasswordDTO).subscribe({
      next: (data) => {

        Swal.fire({
          title: 'Actualizar contraseña',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar contraseña',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
