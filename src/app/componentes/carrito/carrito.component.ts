import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoDTO } from '../../dto/carrito-dto';
import { DetalleCarritoDTO } from '../../dto/detalle-carrito-dto';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { PublicoService } from '../../servicios/publico.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DetalleCarritoConPrecio } from '../../dto/detalle-carrito-con-precio';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  carrito: CarritoDTO;
  carritoItems: DetalleCarritoConPrecio[] = [];
  listaEventos: ItemEventoDTO[] = [];
  cargando: boolean = true; // Estado para saber si los datos están cargando

  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private publicService: PublicoService,
    private cdr: ChangeDetectorRef
  ) {
    this.carrito = {
      id: '',
      idUsuario: '',
      fecha: '',
      items: this.carritoItems
    };
    this.inicializarDatos();
  }

  async inicializarDatos() {
    try {
      await Promise.all([this.cargarEventos(), this.cargarCarrito()]);
      this.asociarDatosEvento();

      await this.consultarPreciosParaItems();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      this.cargando = false;
    }
  }

  private async consultarPreciosParaItems(): Promise<void> {
    const precioPromises = this.carritoItems.map(async (item) => {
      const precio = await this.precioLocalidad(item.idEvento, item.nombreLocalidad).toPromise();
      item.precio = precio ?? 0;
    });

    await Promise.all(precioPromises);
    this.cdr.detectChanges();
  }




  cargarCarrito(): Promise<void> {
    return new Promise((resolve, reject) => {
      const token = this.tokenService.getToken();
      if (token) {
        const payload = this.tokenService.decodePayload(token);
        const userId = payload.id;

        this.clienteService.obtenerCarritoCliente(userId).subscribe({
          next: (data) => {
            this.carritoItems = data.respuesta.items.map((item: DetalleCarritoDTO) => ({
              cantidad: item.cantidad,
              nombreLocalidad: item.nombreLocalidad,
              idEvento: item.idEvento,
              foto: '',
              nombreEvento: ''
            }));
            this.carrito = data.respuesta;
            resolve();
          },
          error: (error) => {
            console.error(error.error.respuesta);
            reject(error);
          }
        });
      } else {
        reject('Token no encontrado');
      }
    });
  }

  cargarEventos(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.publicService.listarEventos(0).subscribe({
        next: (data) => {
          this.listaEventos = data.respuesta;
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar los eventos:', error);
          reject(error);
        }
      });
    });
  }

  private asociarDatosEvento(): void {
    this.carritoItems.forEach((item) => {
      const evento = this.listaEventos.find((evento) => evento.id === item.idEvento);
      if (evento) {
        item.foto = evento.urlImagenPoster;
        item.nombre = evento.nombre;
      }
    });
  }

  eliminarItemCarrito(idCarrito: string, idEvento: string) {
    this.clienteService.eliminarItemCarrito(idCarrito, idEvento).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Item Carrito',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46'
        });
        this.inicializarDatos();
        window.location.reload();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Item Carrito',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000'
        });
      }
    });
  }

  calcularTotal() {
    return this.carritoItems.reduce((total, item) => {
      const precio = item.precio || 0;
      return total + item.cantidad * precio;
    }, 0);
  }

  precioLocalidad(idEvento: string, nombreLocalidad: string): Observable<number> {
    return this.clienteService.precioLocalidad(idEvento, nombreLocalidad).pipe(
      map((data) => data.respuesta),
      catchError((error) => {
        console.error(error.error.respuesta);
        return of(0);
      })
    );
  }


  actualizarCantidad(item: DetalleCarritoDTO) {
    // Aquí puedes agregar la lógica para actualizar la cantidad en el backend si es necesario
  }
}
