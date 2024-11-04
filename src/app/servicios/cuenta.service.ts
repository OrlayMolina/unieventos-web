import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { CambiarPasswordDTO } from '../dto/cambiar-password-dto';
import { EditarCuentaDTO } from '../dto/editar-cuenta-dto';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private cuentaURL = "http://localhost:8080/api/cuenta";

  constructor(private http: HttpClient) { }

  public enviarCodigo(correo: string) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.cuentaURL}/enviar-codigo/${correo}`, null);
  }

  public cambiarPassword(datos: CambiarPasswordDTO) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.cuentaURL}/cambiar-password`, datos);
  }

  public editarPerfil(cuentaEditada: EditarCuentaDTO) : Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.cuentaURL}/editar-perfil`, cuentaEditada);
  }

  public obtenerPerfil(idCuenta: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.cuentaURL}/obtener/${idCuenta}`);
  }
}
