import { LocalidadDTO } from "./localidad-dto";
import { TipoEventoDTO } from "./tipo-evento-dto";

export interface CrearEventoDTO {

  ciudad: string,
  imagenPortada: string,
  imagenLocalidades: string,
  nombre: string,
  descripcion: string,
  direccion: string,
  tipoEvento: TipoEventoDTO,
  fechaEvento: string,
  localidades: LocalidadDTO
  
}
