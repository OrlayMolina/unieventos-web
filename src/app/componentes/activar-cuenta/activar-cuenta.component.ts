import { Component } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';
import { ActivarCuentaDTO } from '../../dto/activar-cuenta-dto';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, AlertaComponent ],
  templateUrl: './activar-cuenta.component.html',
  styleUrl: './activar-cuenta.component.css'
})
export class ActivarCuentaComponent {

  codigo: string = '';
  email: string = '';
  activarCuentaDTO: ActivarCuentaDTO
  alerta: Alerta | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.activarCuentaDTO = {
      correo: '',
      codigoActivacion: ''
    }
  }

  validarEntradas(): boolean {
    return this.codigo.trim() !== '' && this.email.trim() !== '';
  }

  onAceptar(): void {
    if (this.codigo.trim() && this.email.trim()) {

      this.activarCuentaDTO.correo = this.email;
      this.activarCuentaDTO.codigoActivacion = this.codigo;
      this.authService.activarCuenta(this.activarCuentaDTO).subscribe({

        next: (response) => {

          Swal.fire({
            title: 'Activación de la Cuenta',
            text: response.respuesta,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#065f46',
          });

          setTimeout(() => {
            this.alerta = null;
            this.router.navigate(['/login']);
          }, 3000);

        },
        error: (error) => {

          Swal.fire({
            title: 'Activación de la Cuenta',
            text: error.error.respuesta,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#065f46',
          });

          setTimeout(() => {
            this.alerta = null;
          }, 3000);
        }
      });
    } else {
      this.alerta = new Alerta('Por favor, ingrese el código de activación y correo válidos.', 'warning');

      setTimeout(() => {
        this.alerta = null;
      }, 3000);
    }
  }
}
