import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {
  editarEventoForm: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private administradorService: AdministradorService
  ) {
    this.editarEventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      fechaEvento: ['', Validators.required],
      imagenPortada: [''],
      estado: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.cargarEvento(this.id);
  }

  cargarEvento(id: string): void {
    this.administradorService.obtenerEvento(id).subscribe(data => {
      this.editarEventoForm.patchValue(data.respuesta);
    });
  }

  onSubmit(): void {
    if (this.editarEventoForm.valid) {
      const editarEventoDTO = {
        id: this.id,
        ...this.editarEventoForm.value
      };
      this.administradorService.actualizarEvento(editarEventoDTO).subscribe({
        next: () => {
          alert('Evento actualizado con éxito');
        },
        error: (err) => {
          console.error('Error al actualizar el evento:', err);
        }
      });
    }
  }
}
