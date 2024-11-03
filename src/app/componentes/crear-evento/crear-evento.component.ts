import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControlOptions } from '@angular/forms';
import { EventoDTO } from '../../dto/evento-dto';
import Swal from 'sweetalert2';
import { EventosService } from '../../servicios/eventos.service';
import { EstadoEventoDTO } from '../../dto/estado-evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {

  estadoEvento: EstadoEventoDTO[];
  tiposDeEvento: string[];
  crearEventoForm!: FormGroup;
  alerta!:Alerta;

  constructor(private administradorService: AdministradorService, private formBuilder: FormBuilder,
  private eventosService: EventosService) 
  {
    this.estadoEvento = [];
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
    this.obtenerEstadosEvento();
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      localidades: this.formBuilder.array([]),
      imagenPortada: ['', [Validators.required]],
      imagenLocalidades: ['', [Validators.required]],
      estado: ['', Validators.required]
    });
  }

  public onFileChange(event:any, tipo:string){
    if (event.target.files.length > 0) {

      const files = event.target.files;

      switch(tipo){
        case 'localidades':
          this.crearEventoForm.get('imagenLocalidades')?.setValue(files[0]);
          break;
        case 'portada':
          this.crearEventoForm.get('imagenPortada')?.setValue(files[0]);
          break;
      }
    }
  }

  public crearEvento(){
    this.eventosService.crear(this.crearEventoForm.value as EventoDTO);
    Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
   }


   public obtenerEstadosEvento(){
    this.administradorService.obtenerEstadoEventos().subscribe({
      next: (data) => {
        const estados = data.respuesta.map((item: EstadoEventoDTO) => item.nombre);

        this.estadoEvento = estados;
        this.alerta = {
          mensaje: data.respuesta,
          tipo: "success"
        }

      },
      error: (error) => {

        this.alerta = {
          mensaje: error.error.respuesta,
          tipo: "danger"
        }

      }
    });
  }

   
}
