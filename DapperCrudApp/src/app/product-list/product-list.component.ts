import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'Dapper Crud App';

  public products: Product[] = [];

  constructor(private _productService: ProductService, private route: ActivatedRoute, private router: Router) {

  };

  ngOnInit() {
    this._productService.getAllProducts().subscribe(result => {
      this.products = result;
    });
  }

  addProduct() {
    this.router.navigate(['/addproduct']);
  }

  editProduct(id) {
    this.router.navigate(['/addproduct/' + id]);
  }

  deleteProduct(id, index) {
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this._productService.deleteProduct(id).subscribe(result => {
          this.products.splice(index, 1);
        });
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }
}
