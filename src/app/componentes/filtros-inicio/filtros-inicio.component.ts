import { Component, EventEmitter, Output } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CiudadDTO } from '../../dto/ciudad-dto';
import { AlertaComponent } from '../alerta/alerta.component';
import { TipoEventoDTO } from '../../dto/tipo-evento-dto';
import { FiltroEventoDTO } from '../../dto/filtro-evento-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros-inicio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    AlertaComponent,
    CommonModule
  ],
  templateUrl: './filtros-inicio.component.html',
  styleUrl: './filtros-inicio.component.css'
})
export class FiltrosInicioComponent {

  ciudades: CiudadDTO[] = [];
  tipoEventos: TipoEventoDTO[] = [];
  filtroForm: FormGroup;

  @Output() filtrosAplicados = new EventEmitter<FiltroEventoDTO>();

  constructor(
    private publicoService: PublicoService,
    private fb: FormBuilder
  ) {
    // Inicialización del FormGroup
    this.filtroForm = this.fb.group({
      tipo: [''],
      ciudad: [''],
      nombre: ['']
    });

    this.listarCiudades();
    this.listarTiposEventos();
  }

  public listarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta.map((item: CiudadDTO) => item.nombre);
      },
      error: (error) => {
        console.error('Error al cargar las ciudades:', error);
      }
    });
  }

  public listarTiposEventos() {
    this.publicoService.listarTipos().subscribe({
      next: (data) => {
        this.tipoEventos = data.respuesta.map((item: TipoEventoDTO) => item.nombre);
      },
      error: (error) => {
        console.error('Error al cargar los tipos de eventos:', error);
      }
    });
  }

  public aplicarFiltros() {
    const filtro: FiltroEventoDTO = this.filtroForm.value;
    this.filtrosAplicados.emit(filtro);
  }

}
