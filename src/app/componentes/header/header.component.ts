import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';
import { ItemEventoDTO } from '../../dto/item-evento-dto';
import { ClienteService } from '../../servicios/cliente.service';
import { CarritoHeaderComponent } from '../carrito-header/carrito-header.component';
import { DetalleCarritoDTO } from '../../dto/detalle-carrito-dto';
import { PublicoService } from '../../servicios/publico.service';
import { CarritoDTO } from '../../dto/carrito-dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarritoHeaderComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  mostrarElementos: boolean = true;
  isLoggedIn: boolean = false;
  email: string = '';
  nombreUsuario: string = '';
  userMenuOpen: boolean = false;
  cartMenuOpen: boolean = false;
  carrito: CarritoDTO;
  carritoItems: DetalleCarritoDTO[] = [];
  listaEventos: ItemEventoDTO[] = [];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private publicService: PublicoService
  ) {

    this.carrito = {
      id: '',
      idUsuario: '',
      fecha: '',
      items:[]
    }
    this.isLoggedIn = this.tokenService.isLogged();
    if (this.isLoggedIn) {
      this.email = this.tokenService.getEmail();
    }
    this.router.events.subscribe(() => {
      this.verificarRuta();
    });

    this.verificarToken();
    this.cargarEventos();
    this.cargarCarrito();
  }

  verificarRuta() {
    const rutaActual = this.router.url;
    this.mostrarElementos = ![
      '/login',
      '/registro',
      '/activar-cuenta',
      '/cambiar-password',
      '/enviar-codigo',
    ].includes(rutaActual);
  }

  verificarToken() {
    const token = this.tokenService.getToken();
    if (token) {
      const payload = this.tokenService.decodePayload(token);
      this.isLoggedIn = true;
      this.nombreUsuario = payload.nombre || '';
    } else {
      this.isLoggedIn = false;
      this.nombreUsuario = '';
    }
  }

  cargarCarrito() {
    const token = this.tokenService.getToken();
    if (token) {
      const payload = this.tokenService.decodePayload(token);
      const userId = payload.id;

      this.clienteService
        .obtenerCarritoCliente(userId)
        .subscribe({
          next: (data) => {
            this.carritoItems = data.respuesta.items.map((item: DetalleCarritoDTO) => ({
              cantidad: item.cantidad,
              nombreLocalidad: item.nombreLocalidad,
              idEvento: item.idEvento,
              foto: ''
            }));

            this.carrito = data.respuesta;

            this.asociarImagenes();
          },
          error: (error) => {
            console.error(error.error.respuesta);
          }
        });
    }
  }

  private cargarEventos(): void {
    this.publicService.listarEventos(0).subscribe({
      next: (data) => {
        this.listaEventos = data.respuesta;
      },
      error: (error) => {
        console.error('Error al cargar los eventos:', error);
      }
    });
  }

  private asociarImagenes(): void {

    if (this.carritoItems.length > 0 && this.listaEventos.length > 0) {
      this.carritoItems.forEach((item) => {

        const evento = this.listaEventos.find((evento) => evento.id === item.idEvento);

        if (evento) {
          item.foto = evento.urlImagenPoster;
        }
      });
    }
  }

  eliminarItemCarrito(idCarrito: string, idEvento: string){
    this.clienteService.eliminarItemCarrito(idCarrito, idEvento).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Item Carrito',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.cargarCarrito();

      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Item Carrito',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.cartMenuOpen = false;
  }

  toggleCartMenu() {
    this.cartMenuOpen = !this.cartMenuOpen;
    this.userMenuOpen = false;
  }

  editarPerfil() {
    this.router.navigate(['/editar-perfil', this.tokenService.getIDCuenta()]);
  }

  logout() {
    this.tokenService.logout();
  }
}
