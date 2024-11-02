import { Component } from '@angular/core';
import { CarruselInicioComponent } from '../carrusel-inicio/carrusel-inicio.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarruselInicioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
