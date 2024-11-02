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

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
    this.router.events.subscribe(() => {
      this.verificarRuta();
    });

    this.verificarToken();
  }

  verificarRuta() {
    const rutaActual = this.router.url;
    if (['/login', '/registro', '/activar-cuenta', '/cambiar-password', '/enviar-codigo'].includes(rutaActual)) {
      this.mostrarElementos = false;
    } else {
      this.mostrarElementos = true;
    }
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
}
