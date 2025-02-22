import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProductService],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  newProduct = new Product(0, '', null);

  submitButtonText = 'Add';
  constructor(
    private _productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.getProduct(Number(productId));
    }
  }

  saveProduct() {
    if (!this.newProduct.name) return;

    if (!this.newProduct.id) {
      this._productService.addProduct(this.newProduct).subscribe((result) => {
        this.router.navigate(['']);
      });
    } else {
      this._productService
        .updateProduct(this.newProduct)
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  getProduct(productId: number) {
    this.submitButtonText = 'Save';
    this._productService.getProduct(Number(productId)).subscribe((res) => {
      this.newProduct = { ...res } as Product;
    });
  }

  cancelClicked() {
    this.router.navigate(['']);
  }
}
