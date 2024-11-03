import { Component } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import Swal from 'sweetalert2';
import { AlertaComponent } from '../alerta/alerta.component';
import { CrearCuentaDTO } from '../../dto/crear-cuenta-dto';
import { RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControlOptions,
} from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [AlertaComponent, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  crearCuentaDTO: CrearCuentaDTO;
  registroForm!: FormGroup;
  alerta!: Alerta;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.crearCuentaDTO = new CrearCuentaDTO();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group(
      {
        cedula: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        direccion: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.maxLength(10)]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(7),
          ],
        ],
        confirmaPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(7),
          ],
        ],
      },
      { validators: this.passwordsMatchValidator } as AbstractControlOptions
    );
  }

  public registrar() {
    const crearCuenta = this.registroForm.value as CrearCuentaDTO;

    this.authService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta creada',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        setTimeout(() => {
          this.router.navigate(['/activar-cuenta']);
        }, 5000);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000'
        });
      },
    });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    return password == confirmaPassword ? null : { passwordsMismatch: true };
  }
}
