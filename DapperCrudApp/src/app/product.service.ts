import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIurls } from './urls';

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    constructor(private http: HttpClient) {
        this.http = http;
    }

    getAllProducts(): Observable<any> {
        let url = APIurls.getAllProductsUrl;
        return this.http.get<any>(url);
    }

    getProduct(id): Observable<Product> {
        return this.http.get<Product>(APIurls.getProductUrl + id);
    }

    addProduct(product) {
        let headers = new HttpHeaders({
            'Accept': 'application/json',
        });

        let options = {
            headers: headers
        };
        product.id = 0;
        return this.http.post<Product>(APIurls.addProductUrl, product, options);
    }

    updateProduct(product) {
        let headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        let options = { headers: headers };
        return this.http.put(APIurls.updateProductUrl, product, options);
    }

    deleteProduct(id) {
        let headers = new HttpHeaders({
            'Accept': 'application/json'
        });

        let options = {
            headers: headers
        };

        return this.http.delete(APIurls.deleteProductUrl + id, options);
    }
}