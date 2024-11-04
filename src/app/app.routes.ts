import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { EnviarCodigoComponent } from './componentes/enviar-codigo/enviar-codigo.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { CrearOrdenComponent } from './componentes/crear-orden/crear-orden.component';
import { LoginGuard } from './guards/permiso.service';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'activar-cuenta', component: ActivarCuentaComponent },
  { path: 'enviar-codigo', component: EnviarCodigoComponent },
  { path: 'cambiar-password', component: CambiarPasswordComponent },
  { path: 'crear-evento', component: CrearEventoComponent },
  { path: "gestion-eventos", component: GestionEventosComponent },
  { path: 'detalle-evento/:id', component: DetalleEventoComponent },
  { path: "crear-orde", component: CrearOrdenComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];
