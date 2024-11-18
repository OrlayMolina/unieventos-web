import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private publicoURL = 'https://unieventosoryan-xijl.onrender.com/api/publico'; // Cambia la URL si es diferente

  constructor(private http: HttpClient) {}
  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener/${id}`);
  }
}
