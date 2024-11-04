import { Component } from '@angular/core';
import { Alerta } from '../../dto/alerta';
import Swal from 'sweetalert2';
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
import { CuentaService } from '../../servicios/cuenta.service';
import { EditarCuentaDTO } from '../../dto/editar-cuenta-dto';
import { TokenService } from '../../servicios/token.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  editarCuentaDTO: EditarCuentaDTO;
  actualizacionForm!: FormGroup;
  alerta!: Alerta;

  constructor(
    private cuentaService: CuentaService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.editarCuentaDTO = {
      id: '',
      nombre: '',
      telefono: '',
      direccion: '',
      password: ''
    }
    this.cargarDatosUsuario();
    this.crearFormulario();

  }

  private crearFormulario() {
    this.actualizacionForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
    },
    { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }

  public cargarDatosUsuario() {
    this.cuentaService.obtenerPerfil(this.tokenService.getIDCuenta()).subscribe({
      next: (data) => {

        this.editarCuentaDTO.id = data.respuesta.id;
        this.editarCuentaDTO.nombre = data.respuesta.nombre;
        this.editarCuentaDTO.telefono = data.respuesta.telefono;
        this.editarCuentaDTO.direccion = data.respuesta.direccion;

        this.actualizacionForm.patchValue({
          nombre: this.editarCuentaDTO.nombre,
          telefono: this.editarCuentaDTO.telefono,
          direccion: this.editarCuentaDTO.direccion,
        });

        console.log(data.respuesta);

      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los datos del perfil',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000'
        });
      }
    });
  }


  public actualizar() {
    console.log('Actualizar función llamada');

    const editarCuenta: EditarCuentaDTO = {
      ...this.actualizacionForm.value,
      id: this.editarCuentaDTO.id,
      password: this.actualizacionForm.value.password || ''
    };

    this.cuentaService.editarPerfil(editarCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cuenta actualizada',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        const token = this.tokenService.getToken();
        console.log(token);
        if (token) {
          this.authService.refresh({ token });
        }
        window.location.reload();
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
