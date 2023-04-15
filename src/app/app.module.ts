import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LandingHeroComponent } from './components/landing-hero/landing-hero.component';
import { StockLandingComponent } from './components/stock-landing/stock-landing.component';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortoflioLandingComponent } from './components/portoflio-landing/portoflio-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingHeroComponent,
    StockLandingComponent,
    StockGraphComponent,
    PortoflioLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
