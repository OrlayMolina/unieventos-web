import { Component } from '@angular/core';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { InformacionEventoDTO } from '../../dto/informacion-evento-dto';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent {

  codigoEvento: string = '';
  evento: EventoDTO | undefined;


 constructor(private route: ActivatedRoute, private publicoService: PublicoService) {
   this.route.params.subscribe((params) => {
     this.codigoEvento = params['id'];
     this.obtenerEvento();
   });
 }


 public obtenerEvento() {
   const eventoConsultado = this.publicoService.obtenerEvento(this.codigoEvento);
 }

}
