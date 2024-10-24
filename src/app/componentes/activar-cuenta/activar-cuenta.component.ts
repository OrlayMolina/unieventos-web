import { Component } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';

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
  alerta: Alerta | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  validarEntradas(): boolean {
    return this.codigo.trim() !== '' && this.email.trim() !== '';
  }

  onAceptar(): void {
    if (this.codigo.trim() && this.email.trim()) {
      this.authService.activarCuenta(this.email, this.codigo).subscribe({
        next: (response) => {
          this.alerta = new Alerta(response.respuesta, 'success');

          setTimeout(() => {
            this.alerta = null;
            this.router.navigate(['/login']);
          }, 3000);

        },
        error: (error) => {
          this.alerta = new Alerta(error.error.respuesta, 'danger');

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
