import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { InformacionCuponDTO } from '../../dto/informacion-cupon-dto';

@Component({
  selector: 'app-gestion-cupones',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './gestion-cupones.component.html',
  styleUrl: './gestion-cupones.component.css'
})
export class GestionCuponesComponent {

  cupones!: InformacionCuponDTO[] ;

  cuponesSeleccionados: InformacionCuponDTO[] = [];
  textoBtnDesactivar: string = '';
  constructor(private adminService: AdministradorService){
    this.listarCupones();

  }
  listarCupones(){
    this.adminService.listarCupones().subscribe({
      next: (data) => {
        this.cupones = data.respuesta;
        console.log(data.respuesta);
        console.log(this.cupones);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }



  seleccionarCupon(cupon: InformacionCuponDTO, estado: boolean) {
    if (estado) {
      this.cuponesSeleccionados.push(cupon);
    } else {
      const index = this.cuponesSeleccionados.indexOf(cupon);
      if (index !== -1) {
        this.cuponesSeleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const tam = this.cuponesSeleccionados.length;
    this.textoBtnDesactivar = tam === 1 ? '1 elemento' : `${tam} elementos`;
  }

  confirmarDesactivacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cambiará el estado de los cupones seleccionados a Inactivos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.desactivarCupones();
        Swal.fire('Desactivados', 'Los cupones seleccionados han sido desactivados.', 'success');
      }
    });
  }

  desactivarCupones() {
    const peticiones = this.cuponesSeleccionados.map((cupon) =>
      this.adminService.eliminarCupon(cupon.id).toPromise()
    );

    Promise.all(peticiones)
    .then(() => {
      this.listarCupones();
      this.cuponesSeleccionados = [];
      this.actualizarMensaje();
      Swal.fire('Desactivados', 'Los cupones seleccionados han sido desactivados.', 'success');
    })
    .catch((error) => {
      console.error('Error al desactivar cupones:', error);
      Swal.fire('Error', 'Hubo un problema al desactivar los cupones.', 'error');
    });

  }

  trackById(index: number, item: InformacionCuponDTO) {
    return item.codigo;
  }
}
