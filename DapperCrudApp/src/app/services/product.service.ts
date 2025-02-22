import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
  APIUrl = environment.API_URL;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getAllProducts() {
    return this.http.get(this.APIUrl + '/product/getall');
  }

  getProduct(id: number) {
    return this.http.get(this.APIUrl + '/product/get/?id=' + id);
  }

  addProduct(product: Product) {
    product.id = 0;
    return this.http.post(this.APIUrl + '/product/create', product);
  }

  updateProduct(product: Product) {
    return this.http.put(this.APIUrl + '/product/update', product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.APIUrl + '/product/delete/?id=' + id);
  }
}
