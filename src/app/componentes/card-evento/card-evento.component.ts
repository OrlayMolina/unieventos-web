import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-evento',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-evento.component.html',
  styleUrls: ['./card-evento.component.css']
})
export class CardEventoComponent {
  @Input() evento!: ItemEventoDTO;

  constructor(private clienteService: ClienteService, private router: Router){

  }

  public irDetalleEvento(id: string){
    this.router.navigate(['/detalle-evento',id]);
  }

}
