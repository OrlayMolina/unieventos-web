import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselInicioComponent } from '../carrusel-inicio/carrusel-inicio.component';
import { FiltrosInicioComponent } from '../filtros-inicio/filtros-inicio.component';
import { CardEventoComponent } from '../card-evento/card-evento.component';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { FiltroEventoDTO } from '../../dto/filtro-evento-dto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CarruselInicioComponent,
    FiltrosInicioComponent,
    CardEventoComponent,
    CommonModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listaEventos: ItemEventoDTO[] = [];

  constructor(private publicService: PublicoService) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  private cargarEventos(): void {
    this.publicService.listarEventos(0).subscribe({
      next: (data) => {
        this.listaEventos = data.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    });
  }

  public filtrarEventos(filtro: FiltroEventoDTO): void {
    console.log("Filtro enviado al backend:", filtro);
    this.publicService.filtroEvento(filtro).subscribe({
      next: (data) => {
        this.listaEventos = data.respuesta;
      },
      error: (error) => {
        console.error("Error al filtrar los eventos: ", error);
      }
    });
  }
}
