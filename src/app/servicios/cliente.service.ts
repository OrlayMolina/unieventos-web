import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ItemEventoDTO } from '../dto/item-evento-dto';

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

  public precioLocalidad(idEvento: string, nombreLocalidad: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/carrito/item-evento/${idEvento}/localidad/${nombreLocalidad}`);
  }

  public agregarItemCarrito(idCarrito: string, eventoDetalle: ItemEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/carrito/agregarItem/${idCarrito}`, eventoDetalle);
  }
}
