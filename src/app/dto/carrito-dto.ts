import { DetalleCarritoDTO } from "./detalle-carrito-dto";

export interface CarritoDTO {

  id: string,
  idUsuario: string,
  fecha: string,
  items: DetalleCarritoDTO[]
}
