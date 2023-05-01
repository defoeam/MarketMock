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
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AuthComponent } from './components/auth/auth.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutPageComponent } from './components/about-page/about-page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingHeroComponent,
    StockLandingComponent,
    StockGraphComponent,
    PortoflioLandingComponent,
    AuthComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
     // Import the module into the application, with configuration
     AuthModule.forRoot({
      domain: environment.domain,
      clientId:  environment.clientId,
      authorizationParams: {
        redirect_uri: 'http://localhost:4200/stock-landing'
      }
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
