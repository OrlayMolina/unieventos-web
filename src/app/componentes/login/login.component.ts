import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
          this.tokenService.login(data.respuesta.token);
          this.router.navigate(['/']).then( () => {
            window.location.reload();
          });
        }, 1500);
      },
      error: (error) => {
        this.alerta = new Alerta(error.error.respuesta, 'danger');
      },
    });
  }

}
