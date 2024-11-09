import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { EventoDTO } from '../../dto/evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { CardEventoComponent } from '../card-evento/card-evento.component';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [RouterModule,CardEventoComponent],
  //imports: [RouterModule],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent {
  listaEventos: InformacionEventoDTO[] = [];
  eventos: EventoDTO[];
  seleccionados: InformacionEventoDTO[];
  textoBtnEliminar: string;

  constructor(public administradorService:AdministradorService) {
    this.eventos = [];
    this.seleccionados = [];
    this.textoBtnEliminar = "";
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  private cargarEventos(): void {
    this.administradorService.listarEventos(0).subscribe({
      next: (data) => {
        this.listaEventos = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    });
  }


  public seleccionar(evento: InformacionEventoDTO, estado: boolean) {


    if (estado) {
      this.seleccionados.push(evento);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(evento), 1);
    }


    this.actualizarMensaje();


   }


   private actualizarMensaje() {
    const tam = this.seleccionados.length;


    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
   }

   public confirmarEliminacion() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción cambiará el estado de los eventos a Inactivos.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarEventos();
        Swal.fire("Eliminados!", "Los eventos seleccionados han sido eliminados.", "success");
      }
    });
   }

   public eliminarEventos() {
    this.seleccionados.forEach(e1 => {
      this.administradorService.eliminarEvento(e1.nombre);
      this.eventos = this.eventos.filter(e2 => e2.id !== e1.nombre);
    });
    this.seleccionados = [];
    this.actualizarMensaje();


   }

}
