import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  editProductId;
  editProduct = new Product(null, null, null);
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  submitButtonText = "Add";
  constructor(private _location: Location, private _productService: ProductService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.editProductId = paramMap.get('id');

      if (this.editProductId) {
        this.submitButtonText = "Save";
        this._productService.getProduct(this.editProductId).subscribe(result => {
          this.editProduct.name = result.name;
          this.editProduct.id = result.id;
          this.editProduct.name = result.name;
          this.editProduct.createdDate = result.createdDate;
        });
      }
    });
  }

  addProduct() {
    if (!this.form.value.name) {
      if (!this.form.valid) {
        this.setInputsInvalid('name');
        return;
      }
    }

    if (!this.editProductId) {
      this._productService.addProduct(this.editProduct).subscribe(result => {
        this.router.navigate([''])
      });
    }
    else {
      this._productService.updateProduct(this.editProduct).subscribe(result => this.router.navigate(['/']));
    }
  }

  setInputsInvalid(name) {
    this.form.controls[name].setErrors({ 'incorrect': true });
    this.form.controls[name].markAsTouched()
  }

  cancelClicked() {
    this._location.back();
  }
}
