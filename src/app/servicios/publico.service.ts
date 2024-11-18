import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { FiltroEventoDTO } from '../dto/filtro-evento-dto';

@Injectable({
  providedIn: 'root',
})
export class PublicoService {

  private publicoURL = 'https://unieventosoryan-xijl.onrender.com/api/publico';

  constructor(private http: HttpClient) {}

  public listarTipos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-tipos`);
  }
  public listarCiudades(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publicoURL}/evento/obtener-ciudades`
    );
  }

  public listarEventos(pagina: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.publicoURL}/evento/obtener-todos/${pagina}`
    );
  }

  public filtroEvento(filtro: FiltroEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicoURL}/evento/filtrar`, filtro);
  }


  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener/${id}`);
  }
}
