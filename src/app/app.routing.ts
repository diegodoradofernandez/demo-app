import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {InstruccionesComponent} from './instrucciones/instrucciones.component';


export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'instrucciones', component: InstruccionesComponent},
  {path: '**', component: HomeComponent}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
