import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../reducers';
import { loadAllProducts } from './products.actions';
import { areProductsLoaded } from './products.selectors';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  loading: boolean = false;

  constructor(private store: Store<AppState>){

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store
      .pipe(
        select(areProductsLoaded),
        tap((productsLoaded) => {
          if(!this.loading && !productsLoaded){
            this.loading = true;
            this.store.dispatch(loadAllProducts());
          }
        }),
        filter(productsLoaded => productsLoaded),
        first(),
        finalize(() => this.loading = false)
      );
  }
}
