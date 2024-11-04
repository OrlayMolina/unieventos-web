import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DetalleCarritoDTO } from '../../dto/detalle-carrito-dto';

@Component({
  selector: 'app-carrito-header',
  standalone: true,
  imports: [],
  templateUrl: './carrito-header.component.html',
  styleUrl: './carrito-header.component.css'
})
export class CarritoHeaderComponent {

  @Input("item") item?: DetalleCarritoDTO;

}
