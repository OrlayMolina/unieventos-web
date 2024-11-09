import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteURL = "http://localhost:8080/api/cliente";

  constructor(private http: HttpClient) { }

  public obtenerCarritoCliente(idCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/carrito/obtener/${idCliente}`);
  }

  public eliminarItemCarrito(idCarrito: string, idEvento: string): Observable<MensajeDTO> {

    const params = new HttpParams().set('idEvento', idEvento);
    return this.http.delete<MensajeDTO>(`${this.clienteURL}/carrito/eliminarItem/${idCarrito}`, { params });
  }

  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/evento/obtener/${id}`);
  }
}
