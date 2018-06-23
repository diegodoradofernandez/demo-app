import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';


import {routing} from './app.routing';


import { ImagesService } from './services/images.service'
import { NumerosService } from './services/numeros.service'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { InstruccionesComponent } from './instrucciones/instrucciones.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjb4lMbRfxfhahE3IzkFQrLSdGTdOM6B4' // api key de google maps
    }),
    routing
  ],
  declarations: [ AppComponent, HomeComponent, AboutComponent, InstruccionesComponent],
  providers: [ImagesService,NumerosService],
  bootstrap: [ AppComponent ]
})

export class AppModule {}



