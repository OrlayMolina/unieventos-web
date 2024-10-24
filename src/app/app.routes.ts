import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'activar-cuenta', component: ActivarCuentaComponent },
  { path: 'crear-evento', component: CrearEventoComponent },
  { path: "gestion-eventos", component: GestionEventosComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];
