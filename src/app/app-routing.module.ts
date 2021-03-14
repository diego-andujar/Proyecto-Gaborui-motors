<<<<<<< HEAD
import { ClientPageComponent } from './pages/client-page/client-page.component';
=======
// import { MecanicoPageComponent } from './pages/mecanico-page/mecanico-page.component';
>>>>>>> jhoelprueba
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ManagerPageComponent } from './pages/manager-page/manager-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { AuthClientGuard } from './guards/auth-client.guard';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  // { path: "sign-up", component: SignUpPageComponent },
  // { path: "log-in", component: LogInPageComponent },
  // { path: "manager", component: ManagerPageComponent },
  // { path: "perfil/:userID", canActivate: [AuthClientGuard], pathMatch: "full", component: ClientPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
