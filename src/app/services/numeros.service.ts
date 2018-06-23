


import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class NumerosService {

  private url = 'https://qrng.anu.edu.au/API/jsonI.php?length=7&type=';  // URL

  private _uint16 = "uint16";

  private _uint8 = "uint8";

  constructor(private http: Http) {
  }


  /**
   * Obtenemos un array de numeros aleatorios.
   * @returns {Observable<R|T>}
   */
  random16(): Observable<any[]> {
    return this.http.get(this.url + this._uint16)
      .map(response => response.json())
      .catch(this.handleError);
  }

  random8(): Observable<any[]> {
    return this.http.get(this.url + this._uint8)
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