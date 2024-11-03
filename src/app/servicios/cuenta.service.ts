import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { CambiarPasswordDTO } from '../dto/cambiar-password-dto';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private authURL = "http://localhost:8080/api/cuenta";

  constructor(private http: HttpClient) { }

  public enviarCodigo(correo: string) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/enviar-codigo/${correo}`, null);
  }

  public cambiarPassword(datos: CambiarPasswordDTO) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cambiar-password`, datos);
  }
}
