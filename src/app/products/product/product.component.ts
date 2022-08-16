import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsHttpService } from 'src/app/services/products-http.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$!: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsHttpService
  ) { }

  ngOnInit(): void {
    const slug: string | null = this.route.snapshot.paramMap.get('productUrl');

    if(slug){
      this.product$ = this.productService.getProductBySlug(slug);
      console.log(this.product$);
    }
  }

  handleMissingImage(event: Event){
    (event.target as HTMLImageElement).src = '../../../assets/images/no-image.jpg';
  }

}
