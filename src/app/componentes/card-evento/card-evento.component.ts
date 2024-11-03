import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEventoDTO } from '../../dto/item-evento-dto';

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
}
