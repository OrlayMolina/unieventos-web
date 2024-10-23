export class CrearCuentaDTO {
  constructor(
    public cedula: string = '',
    public nombre: string = '',
    public email: string = '',
    public direccion: string = '',
    public telefono: string = '',
    public password: string = ''
  ){}
}
