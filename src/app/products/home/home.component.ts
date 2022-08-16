import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../model/product';
import { ProductsHttpService } from '../../services/products-http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectAllProducts } from '../products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.reload();
  }

  reload(){
    this.products$ = this.store.pipe(select(selectAllProducts))
    .pipe(
      map(products => products),
      shareReplay()
    )
  }

}
