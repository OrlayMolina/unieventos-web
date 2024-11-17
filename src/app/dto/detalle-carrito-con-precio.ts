import { DetalleCarritoDTO } from "./detalle-carrito-dto";

export interface DetalleCarritoConPrecio extends DetalleCarritoDTO {
  precio?: number;
}
