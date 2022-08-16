import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { ProductsHttpService } from "../services/products-http.service";
import { ProductActions } from "./action-types";
import { allProductsLoaded } from "./products.actions";

@Injectable()
export class ProductsEffects {

  loadProducts$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(ProductActions.loadAllProducts),
        concatMap(action => this.productsHttpService.getAllProducts()),
        map(products => allProductsLoaded({products}))
      )
  )

  constructor(private actions$: Actions,
    private productsHttpService: ProductsHttpService){}
}
