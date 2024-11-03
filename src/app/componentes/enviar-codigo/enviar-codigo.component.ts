import { Component } from '@angular/core';
import { CuentaService } from '../../servicios/cuenta.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-codigo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AlertaComponent
  ],
  templateUrl: './enviar-codigo.component.html',
  styleUrl: './enviar-codigo.component.css'
})
export class EnviarCodigoComponent {

  email: string = '';
  alerta!:Alerta;

  constructor (private cuentaService: CuentaService, private router: Router){}

  onActualizar(correo: string): void {

    this.cuentaService.enviarCodigo(correo).subscribe({
      next: (data) => {

        Swal.fire({
          title: 'Actualizar contraseña',
          text: 'Hemos enviado un código para actualizar su contraseña',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        setTimeout(() => {
          this.router.navigate(['/cambiar-password']);
        }, 2500);
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
