import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductListComponent } from './product-list/product-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsHttpService } from '../services/products-http.service';
import { ProductsResolver } from './products.resolver';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './reducers/product.reducer';

export const productRoutes: Routes = [
  {
    path: ':productUrl',
    component: ProductComponent,
  },
  {
    path: '',
    component: HomeComponent,
    resolve: {
      products: ProductsResolver,
    },
  },
];

@NgModule({
  declarations: [HomeComponent, ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(productRoutes),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature("products", productsReducer)
  ],
  exports: [HomeComponent, ProductComponent, ProductListComponent],
  providers: [
    ProductsHttpService,
    ProductsResolver
  ],
})
export class ProductsModule {}
