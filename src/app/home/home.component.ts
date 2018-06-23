import { Component,OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MouseEvent } from '@agm/core';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ImagesService } from '../services/images.service'
import { NumerosService } from '../services/numeros.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  title: string = 'Top ventas';
  subTitle : string ='Productos más vendidos en todas las tiendas.';

  // parametros google maps
  zoom: number = 7;
  lat: number = 43.4874961;
  lng: number = -8.2103802;

  //parametros de búsqueda
  query = '';
  queryChanged: Subject<string> = new Subject<string>();

  //imagenes
  images = [];
  loading = true;
  errorMessage = '';
  searchEvent: any;
  searchQuery = '';
  searchActive = false;
  imageBox = [];

  //numeros
  ventas=[];
<<<<<<< HEAD
  prendas = [];
  ventasTotales = 0;
  prendasTotales =0;

  ventasTienda = 0;
  prendasTienda = 0;
=======
  ventasTotales = 0;
  ventasTienda = 0
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
  fechaActualizacion : any;

  nombreTienda: string = '';
  tiendaSeleccionada : number = -1;

  constructor(private imageService: ImagesService,private numeroService: NumerosService) {}

  ngOnInit() {

    //Obtenemos  las ventas
    this.numeros();


    this.queryChanged
      .debounceTime(300) // esperamos 300ms despues del ultimo evento de búsqueda
      .distinctUntilChanged() // solo emitimos si el valor es diferente
      .subscribe(query => {
        this.query = query;
        this.imageService.search(this.query, 0);
      });

    //inicializamos la busqueda
    this.search();

    //Buscamos por defecto
    this.queryChanged.next('fashion');



    //lanzamos un timer cada 10 segundos
    let timer = Observable.timer(2000,10000);
    timer.subscribe(t => this.numeros());

}  

<<<<<<< HEAD
 /**
   * Obtiene los datos de ventas de la tienda.
   * @param search
   * @returns index
   */
=======

>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
  clickedMarker(search: string, index: number) {
    
    //limpiamos las imagenes
    this.images = [];
<<<<<<< HEAD

=======
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
    //Obtenemos imagenes aleatorias en funcion del parametro de búsqueda
    this.queryChanged.next(search);

    this.tiendaSeleccionada = index;

    this.ventasTienda = this.ventas[index];

    this.nombreTienda = this.markers[index]['label'];

  }
  
<<<<<<< HEAD
=======
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  

>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8

  //Marcas de posición de las tiendas
  markers: marker[] = [
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
      search :'lady'
	  },
	  {
		  lat: 42.872134,
		  lng: -8.544539,
      label: 'Santiago de Compostela',
      search :'fashion complements'
    },
    {
		  lat: 42.432466,
		  lng: -8.650075,
      label: 'Pontevedra',
      search:'deportive clothes',
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
      search:'men trousers'      
    },
    {
		  lat: 42.339186,
		  lng: -7.878964,
      label: 'Ourense',
      search:'girl clothes'
	  }    
  ];

  numeros() {
<<<<<<< HEAD
    this.numeroService.random16()
=======
    this.numeroService.random()
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
      .subscribe(datos => {

        this.ventas = [];

        for (let i = 0; i < datos["data"].length; i++) {
          this.ventas.push(datos["data"][i]);
          this.ventasTotales +=datos["data"][i];
        }     
        
        if (this.tiendaSeleccionada !== -1){
<<<<<<< HEAD
=======
          console.log(this.ventas[this.tiendaSeleccionada]);
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
          this.ventasTienda = this.ventas[this.tiendaSeleccionada];
        }


        this.fechaActualizacion = new Date();
  
        this.errorMessage = '';
      }, error => {
        this.errorMessage = error;
      });
<<<<<<< HEAD


      this.numeroService.random8()
      .subscribe(datos => {

        this.prendas = [];

        for (let i = 0; i < datos["data"].length; i++) {
          this.prendas.push(datos["data"][i]);
          this.prendasTotales +=datos["data"][i];
        }     
        
        if (this.tiendaSeleccionada !== -1){
          this.prendasTienda = this.ventas[this.tiendaSeleccionada];
        }
  
        this.errorMessage = '';
      }, error => {
        this.errorMessage = error;
      });


=======
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
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

}

// definición del interface del mapa
 interface marker {
	lat: number;
	lng: number;
  label?: string;
  search?: string;
}


