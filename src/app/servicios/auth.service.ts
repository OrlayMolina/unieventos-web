import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { LoginDTO } from '../dto/login-dto';
import { Observable, tap } from 'rxjs';
import { CrearCuentaDTO } from '../dto/crear-cuenta-dto';
import { ActivarCuentaDTO } from '../dto/activar-cuenta-dto';
import { TokenDTO } from '../dto/token-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public activarCuenta(datos: ActivarCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/activar-cuenta`, datos);
  }

  public loginUsuario(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }

  public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/refresh`, tokenDTO).pipe(
      tap((response: MensajeDTO) => {
        const newToken = response.respuesta;
        console.log(newToken);
        if (newToken) {
          this.tokenService.setToken(newToken);
        }
      })
    );
  }

  public crearCuenta(cuenta: CrearCuentaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuenta);
  }
}
