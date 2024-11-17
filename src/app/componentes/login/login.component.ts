import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/login-dto';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertaComponent, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginDTO: LoginDTO;
  alerta!:Alerta;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginDTO = new LoginDTO();
  }

  public logearse() {
    this.authService.loginUsuario(this.loginDTO).subscribe({
      next: (data) => {
        setTimeout(() => {
          this.tokenService.login(data.respuesta.token, data.respuesta.refreshToken);
        }, 1500);
      },
      error: (error) => {

        Swal.fire({
          title: 'Error',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000'
        });
      },
    });
  }

}
