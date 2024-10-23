export class CambiarPasswordDTO {

  constructor(
      public email: string = '',
      public codigoVerificacion: string = '',
      public passwordNueva: string = ''){

  }
}
