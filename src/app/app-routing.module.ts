import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingHeroComponent } from './components/landing-hero/landing-hero.component';
import { StockLandingComponent } from './components/stock-landing/stock-landing.component';
const routes: Routes = [
  { path: '',component: LandingHeroComponent },
  { path: 'stock-landing', component: StockLandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
