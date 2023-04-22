import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingHeroComponent } from './components/landing-hero/landing-hero.component';
import { StockLandingComponent } from './components/stock-landing/stock-landing.component';
import { PortoflioLandingComponent } from './components/portoflio-landing/portoflio-landing.component';
const routes: Routes = [
  { path: '',component: LandingHeroComponent },
  { path: 'stock-landing', component: StockLandingComponent },
  { path: 'portfolio-landing', component: PortoflioLandingComponent},
  { path: 'auth', component: AuthComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
