import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';
import { CrearCuponDTO } from '../dto/crear-cupon-dto';
import { EditarCuponDTO } from '../dto/editar-cupon-dto';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  private adminURL = 'https://unieventosoryan-xijl.onrender.com/api/admin';

  constructor(private http: HttpClient) {}
 public listarCiudades(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(
    `${this.adminURL}/evento/obtener-ciudades`
  );
}

  public crearEvento(crearEventoDTO: CrearEventoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.adminURL}/evento/crear`,
      crearEventoDTO
    );
  }

  public actualizarEvento(
    editarEventoDTO: EditarEventoDTO
  ): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(
      `${this.adminURL}/evento/editar`,
      editarEventoDTO
    );
  }

  public obtenerEvento(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
  }

  public eliminarEvento(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(
      `${this.adminURL}/evento/eliminar/${id}`
    );
  }

  public listarEventosAdmin(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-todos`);
  }

  public listarEventos(pagina: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.adminURL}/evento/obtener-infoEventos/${pagina}`
    );
  }

  public crearCupon(cuponDTO: CrearCuponDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.adminURL}/crear-cupon`, cuponDTO);
  }

  public actualizarCupon(cuponDTO: EditarCuponDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.adminURL}/cupon/editar`, cuponDTO);
  }

  public listarCupones(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtener-todos`);
  }

  public obtenerInformacionCupon(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtener-informacion/${id}`);
  }

  public eliminarCupon(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.adminURL}/eliminar-cupon/${id}`);
  }

 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/imagen/subir`, imagen);
 }

}
