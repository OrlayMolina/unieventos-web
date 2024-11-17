import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './crear-cupon.component.html',
  styleUrl: './crear-cupon.component.css'
})
export class CrearCuponComponent {

  crearCuponForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdministradorService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      descuento: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaVencimiento: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  public crearCupon() {
    if (this.crearCuponForm.valid) {
      const cuponData = this.crearCuponForm.value;

      this.adminService.crearCupon(cuponData).subscribe({
        next: (data: { respuesta: any }) => {
          Swal.fire('¡Éxito!', 'Se ha creado un nuevo cupón.', 'success');
          this.crearCuponForm.reset(); // Limpiar el formulario tras crear el cupón
        },
        error: (error: { error: { respuesta: string | undefined } }) => {
          Swal.fire('¡Error!', error.error.respuesta, 'error');
        },
      });
    } else {
      Swal.fire('¡Error!', 'Por favor, complete todos los campos requeridos.', 'error');
    }
  }
}
