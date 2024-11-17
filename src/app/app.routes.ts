import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { EnviarCodigoComponent } from './componentes/enviar-codigo/enviar-codigo.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { CrearOrdenComponent } from './componentes/crear-orden/crear-orden.component';
import { LoginGuard } from './guards/permiso.service';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RolesGuard } from './guards/roles.service';
import { GestionCuponesComponent } from './componentes/gestion-cupones/gestion-cupones.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { EditarCuponComponent } from './componentes/editar-cupon/editar-cupon.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'activar-cuenta', component: ActivarCuentaComponent },
  { path: 'enviar-codigo', component: EnviarCodigoComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  { path: 'editar-perfil/:id', component: EditarPerfilComponent },
  { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
  { path: 'crear-cupon', component: CrearCuponComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
  { path: "gestion-eventos", component: GestionEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
  { path: "gestion-cupones", component: GestionCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
  { path: 'editar-cupon/:id', component: EditarCuponComponent,   canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] }  },
  { path: "gestion-carrito", component: CarritoComponent },
  { path: 'detalle-evento/:id', component: DetalleEventoComponent },
  { path: "crear-orde", component: CrearOrdenComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];
