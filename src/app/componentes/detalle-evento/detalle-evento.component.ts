import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importación necesaria
import { AdministradorService } from '../../servicios/administrador.service';
import { ClienteService } from '../../servicios/cliente.service';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';
import { MensajeDTO } from '../../dto/mensaje-dto';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {
  evento: InformacionEventoDTO | undefined;

  constructor(private route: ActivatedRoute, private administradorService: AdministradorService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const eventoId = this.route.snapshot.paramMap.get('id');
    if (eventoId) {
      this.obtenerEvento(eventoId);
    }
  }

  obtenerEvento(id: string): void {
    this.clienteService.obtenerEvento(id).subscribe({
      next: (response) => {
        this.evento = response.respuesta;
      },
      error: (err) => {
        console.error('Error al obtener los detalles del evento', err);
      }
    });
  }
}
