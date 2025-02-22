import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this._productService.getAllProducts().subscribe((result) => {
      this.products = result as Product[];
    });
  }

  addProduct() {
    this.router.navigate(['/addproduct']);
  }

  editProduct(id: number) {
    this.router.navigate(['/addproduct/' + id]);
  }

  deleteProduct(id: number, index: number) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.value) {
        this._productService.deleteProduct(id).subscribe((result) => {
          this.products.splice(index, 1);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
