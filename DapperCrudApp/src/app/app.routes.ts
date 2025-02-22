import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';

export const routes: Routes = [
  { path: 'addproduct', component: AddProductComponent },
  { path: 'addproduct/:id', component: AddProductComponent },
  { path: '**', component: ProductListComponent },
];
