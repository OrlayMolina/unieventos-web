import { Component } from '@angular/core';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule, Router } from '@angular/router';
import { CiudadDTO } from '../../dto/ciudad-dto';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-filtros-inicio',
  standalone: true,
  imports: [
    RouterModule,
    AlertaComponent
  ],
  templateUrl: './filtros-inicio.component.html',
  styleUrl: './filtros-inicio.component.css'
})
export class FiltrosInicioComponent {

  ciudades: CiudadDTO[];
  alerta!:Alerta;

  constructor(private publicoService: PublicoService, private router: Router){
    this.ciudades = [];
    this.listarCiudades();
  }

  public listarCiudades(){
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        const ciudades = data.respuesta.map((item: CiudadDTO) => item.nombre);

        this.ciudades = ciudades;
        this.alerta = {
          mensaje: data.respuesta,
          tipo: "success"
        }

      },
      error: (error) => {

        this.alerta = {
          mensaje: error.error.respuesta,
          tipo: "danger"
        }

      }
    });
  }

}
