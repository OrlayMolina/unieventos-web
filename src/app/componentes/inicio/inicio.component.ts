import { Component } from '@angular/core';
import { CarruselInicioComponent } from '../carrusel-inicio/carrusel-inicio.component';
import { FiltrosInicioComponent } from '../filtros-inicio/filtros-inicio.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CarruselInicioComponent,
    FiltrosInicioComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
