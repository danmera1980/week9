import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../products/model/product';

@Injectable()
export class ProductsHttpService {

  url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.url}/products?include=image_attachment.blob,category,master&[page][size]=42`)
    .pipe(
      map(res => res['data'])
    );
  }

  getProductBySlug(value: string): Observable<Product> {
    return this.http.get<any>(`${this.url}/products/${value}?include=image_attachment.blob,category,master`)
    .pipe(
      map(res => res['data'])
    )
  }

}
