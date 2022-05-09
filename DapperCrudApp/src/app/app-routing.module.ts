import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './notFound.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [{ path: '', component: ProductListComponent },
{ path: 'products', component: ProductListComponent },
{ path: 'addproduct', component: AddProductComponent },
{ path: 'addproduct/:id', component: AddProductComponent },
{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
