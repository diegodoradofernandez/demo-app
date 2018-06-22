


import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class NumerosService {

  private url = 'https://qrng.anu.edu.au/API/jsonI.php?length=7&type=uint16';  // URL to web API


  constructor(private http: Http) {
  }


  /**
   * Obtenemos un array de numeros aleatorios.
   * @returns {Observable<R|T>}
   */
  random(): Observable<any[]> {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }


  /**
   * Error genérico
   * @param res
   * @returns {any|Array}
   */
  handleError(error: Response | any) {
    let errorMessage: string;
      errorMessage = 'Error al obtener los números';
    return Observable.throw(errorMessage);
  }


  

}