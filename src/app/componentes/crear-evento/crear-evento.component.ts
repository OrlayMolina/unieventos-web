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
import { AdministradorService } from '../../servicios/administrador.service';
import { Alerta } from '../../dto/alerta';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {

  tiposDeEvento: string[];
  crearEventoForm!: FormGroup;
  alerta!:Alerta;

  constructor(private administradorService: AdministradorService, private formBuilder: FormBuilder,
  private eventosService: EventosService) 
  {
    this.crearFormulario();
    this.tiposDeEvento = ['Concierto', 'Fiesta', 'Teatro', 'Deportes'];
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
    this.administradorService.crearEvento(this.crearEventoForm.value as CrearEventoDTO);
    Swal.fire("Exito!", "Se ha creado un nuevo evento.", "success");
   }
   
}
