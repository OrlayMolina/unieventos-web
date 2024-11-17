import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { EventoDTO } from '../../dto/evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gestion-eventos.component.html',
  styleUrls: ['./gestion-eventos.component.css']
})
export class GestionEventosComponent {
  listaEventos: InformacionEventoDTO[] = [];
  eventos: EventoDTO[];
  seleccionados: InformacionEventoDTO[] = [];
  textoBtnEliminar: string = "";

  constructor(public administradorService: AdministradorService) {
    this.eventos = [];
  }

  ngOnInit(): void {
    this.cargarEventos();
  }

  /*private cargarEventos(): void {
    this.administradorService.listarEventos(0).subscribe({
      next: (data) => {
        this.listaEventos = data.respuesta;
        console.log('Eventos cargados:', this.listaEventos);
      },
      error: (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    });
  }*/

    private cargarEventos(): void {
      this.administradorService.listarEventos(0).subscribe({
        next: (data) => {
          // Filtrar solo los eventos que están activos
          this.listaEventos = data.respuesta.filter((evento: InformacionEventoDTO) => evento.estado === 'ACTIVO');
          console.log('Eventos cargados (solo activos):', this.listaEventos);
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
      this.seleccionados = this.seleccionados.filter(e => e.id !== evento.id);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    this.textoBtnEliminar = tam !== 0 ? `${tam} ${tam === 1 ? 'elemento' : 'elementos'}` : "";
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
      }
    });
  }

  public eliminarEventos() {
    // Itera sobre los eventos seleccionados y envía la solicitud de eliminación para cada uno
    this.seleccionados.forEach(evento => {
      this.administradorService.eliminarEvento(evento.id).subscribe({
        next: () => {
          console.log(`Evento con ID ${evento.id} eliminado exitosamente.`);
        },
        error: (error) => {
          console.error(`Error al eliminar el evento con ID ${evento.id}:`, error);
        },
        complete: () => {
          // Recargar la lista de eventos después de eliminar
          this.cargarEventos();
          Swal.fire("Eliminados!", "Los eventos seleccionados han sido eliminados.", "success");
        }
      });
    });
    // Limpiar la lista de seleccionados y actualizar el mensaje de selección
    this.seleccionados = [];
    this.actualizarMensaje();
  }
}
