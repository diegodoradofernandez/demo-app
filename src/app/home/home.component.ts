
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MouseEvent } from '@agm/core';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ImagesService } from '../services/images.service';
import { NumerosService } from '../services/numeros.service';

import {environment} from '../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  title = 'Top ventas';
  subTitle  = 'Productos más vendidos en todas las tiendas.';

   // Marcas de posición de las tiendas
   markers: Marker[] = [
  {
    lat: 43.4874961,
    lng: -8.2103802,
    label: 'Ferrol',
    search: 'fashion urban'
  },
  {
    lat: 43.362923,
    lng: -8.411674,
    label: 'La Coruña',
    search : 'lady'
  },
  {
    lat: 42.872134,
    lng: -8.544539,
    label: 'Santiago de Compostela',
    search : 'fashion complements'
  },
  {
    lat: 42.432466,
    lng: -8.650075,
    label: 'Pontevedra',
    search: 'deportive clothes',
  },
  {
    lat: 42.238036,
    lng: -8.723630,
    label: 'Vigo',
    search: 'legs women'
  },
  {
    lat: 43.019085,
    lng: -7.559398,
    label: 'Lugo',
    search: 'men trousers'
  },
  {
    lat: 42.339186,
    lng: -7.878964,
    label: 'Ourense',
    search: 'girl clothes'
  }
];

  // parametros google maps
  zoom  = 8;
  lat = 43.0274961;
  lng = -8.2103802;

  // parametros de búsqueda
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  // imagenes
  images = [];
  loading = true;
  errorMessage = '';
  searchEvent: any;
  searchQuery = '';
  searchActive = false;
  imageBox = [];

  // numeros
  ventas = [];
  prendas = [];
  ventasTotales = 0;
  prendasTotales = 0;

  ventasTienda = 0;
  prendasTienda = 0;
  fechaActualizacion;

  nombreTienda = '';
  tiendaSeleccionada = -1;

  // detalle
  hayDetalleVentas = false;
  hayDetallePrendas = false;
  hayDetalleCiudad = false;

  detalleVentas = [];
  detallePrendas = [];
  detalleCiudad = [];

  constructor(private imageService: ImagesService, private numeroService: NumerosService) {}

  ngOnInit() {

    // Obtenemos  las ventas
    this.numeros();


    this.queryChanged
      .debounceTime(300) // esperamos 300ms despues del ultimo evento de búsqueda
      .distinctUntilChanged() // solo emitimos si el valor es diferente
      .subscribe(query => {
        this.query = query;
        this.imageService.search(this.query, 0);
      });

    // inicializamos la busqueda
    this.search();

    // Buscamos por defecto
    this.queryChanged.next('fashion');



    // lanzamos un timer cada 10 segundos
    const timer = Observable.timer(2000, 10000);
    timer.subscribe(t => this.numeros());

}

 /**
   * Obtiene los datos de ventas de la tienda.
   * @param search
   * @returns index
   */
  clickedMarker(search: string, index: number) {

    // limpiamos las imagenes
    this.images = [];

    // Obtenemos imagenes aleatorias en funcion del parametro de búsqueda
    this.queryChanged.next(search);

    this.tiendaSeleccionada = index;

    this.ventasTienda = this.ventas[index];

    this.nombreTienda = this.markers[index]['label'];

  }

  numeros() {
    this.numeroService.random16()
      .subscribe(datos => {

        this.ventas = [];

        for (let i = 0; i < datos['data'].length; i++) {
          this.ventas.push(datos['data'][i]);
          this.ventasTotales += datos['data'][i];
        }

        if (this.tiendaSeleccionada !== -1) {
          this.ventasTienda = this.ventas[this.tiendaSeleccionada];
        }

        this.fechaActualizacion = new Date();

        this.errorMessage = '';
      }, error => {
        this.errorMessage = error;
      });


      this.numeroService.random8()
      .subscribe(datos => {

        this.prendas = [];

        for (let i = 0; i < datos['data'].length; i++) {
          this.prendas.push(datos['data'][i]);
          this.prendasTotales += datos['data'][i];
        }

        if (this.tiendaSeleccionada !== -1) {
          this.prendasTienda = this.ventas[this.tiendaSeleccionada];
        }

        this.errorMessage = '';
      }, error => {
        this.errorMessage = error;
      });


  }


  search() {
    this.errorMessage = '';
    this.searchEvent = this.imageService.getSearchEvent()
      .subscribe(value => {
        this.searchActive = true;
        if (value.hasOwnProperty('loading')) {

          this.imageBox = [];
          this.searchQuery = value.query;
          this.loading = true;

        } else if (value.hasOwnProperty('loading')) {

          this.loading = true;

        } else if (value.hasOwnProperty('errorMessage')) {

          this.errorMessage = value.errorMessage;
          this.loading = false;

        } else if (value.hasOwnProperty('results')) {

          this.loading = false;
          this.imageBox.push(value.results);

        } else {

          this.searchActive = false;
          this.errorMessage = '';
          this.searchQuery = '';
          this.imageBox = [];

        }
      }, error => {

        this.loading = false;
        this.errorMessage = error;

    });

  }

  detalle(dato) {

    console.log(dato);

    switch (dato) {
      
      case 'ventas':
        this.hayDetalleVentas === true  ? this.hayDetalleVentas = false : this.hayDetalleVentas = true;
        this.detalleVentas = this.randomOrder(environment.categorias).slice(0, 4);
        break;

      case 'prendas':
        this.hayDetallePrendas === true  ? this.hayDetallePrendas = false : this.hayDetallePrendas = true;
        this.detallePrendas = this.randomOrder(environment.prendas).slice(0, 4);
        break;

      case 'ciudad':
        this.hayDetalleCiudad === true  ? this.hayDetalleCiudad = false : this.hayDetalleCiudad = true;
        this.detalleCiudad = this.randomOrder(environment.prendas).slice(0, 4);
        break;
    }
  }

  randomOrder(_array) {
    for (let i = _array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_array[i], _array[j]] = [_array[j], _array[i]];
    }
    return _array;
  }


}

// definición del interface del mapa
 interface Marker {
  lat: number;
  lng: number;
  label?: string;
  search?: string;
}

