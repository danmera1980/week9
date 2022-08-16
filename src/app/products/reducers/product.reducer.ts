import { Product } from "../model/product";
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { ProductActions } from "../action-types";

export interface ProductState extends EntityState<Product> {
  allProductsLoaded: boolean;
}

export const adapter = createEntityAdapter<Product>();

export const initialProductsState = adapter.getInitialState({
  allProductsLoaded: false
});

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductActions.allProductsLoaded,
    (state, action) => adapter.addMany(action.products, {
      ...state,
      allProductsLoaded:true
    })
  )
)

export const {selectAll} = adapter.getSelectors();
