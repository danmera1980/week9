import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input()
  products!: Product[] | null;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }



  handleMissingImage(event: Event){
    (event.target as HTMLImageElement).src = '../../../assets/images/no-image.jpg';
  }

}
