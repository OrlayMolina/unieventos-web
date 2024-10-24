import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../dto/mensaje-dto';
import { LoginDTO } from '../dto/login-dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { CambiarPasswordDTO } from '../dto/cambiar-password-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  public activarCuenta(email: string, codigo: string): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/confirmar-cuenta`, { email, codigo});
  }

  public loginUsuario(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }

  public enviarCodigo(correo: string) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/enviar-codigo-password`, correo);
  }

  public cambiarPassword(datos: CambiarPasswordDTO) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cambiar-password`, datos);
  }

}
