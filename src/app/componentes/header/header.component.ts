import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  mostrarElementos: boolean = true;
  isLoggedIn: boolean = false;
  nombreUsuario: string = '';
  userMenuOpen: boolean = false;
  cartMenuOpen: boolean = false;
  carritoItems = [
    { nombre: 'Producto 1', cantidad: 1 },
    { nombre: 'Producto 2', cantidad: 2 }
  ];


  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
    this.router.events.subscribe(() => {
      this.verificarRuta();
    });

    this.verificarToken();
  }

  verificarRuta() {
    const rutaActual = this.router.url;
    this.mostrarElementos = !['/login', '/registro', '/activar-cuenta', '/cambiar-password', '/enviar-codigo'].includes(rutaActual);
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

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    this.cartMenuOpen = false;
  }

  toggleCartMenu() {
    this.cartMenuOpen = !this.cartMenuOpen;
    this.userMenuOpen = false;
  }

  editarPerfil() {
    console.log('Editar perfil');

  }

  logout() {
    console.log('Logout');
    this.tokenService.logout();
  }
}
