import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit {

  products: Product[]
  selectedProduct: Product

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService
    .getProducts()
    .then((products: Product[]) => this.products = products);
 }

 private getIndexOfProduct = (productId: String) => {
   return this.products.findIndex((product) => product._id === productId)
 }

 private selectProduct = (product: Product) => this.selectedProduct = product;

 private createNewProduct = () => {
   const product: Product = {
     name: '',
     dimensions: '',
     rank: '',
   }

   // default to a blank product when creating a new one
   this.selectProduct(product);
 }
 
 private deleteProduct = (productId: String) => {
   const idx = this.getIndexOfProduct(productId);
   if (idx !== -1) {
     this.products.splice(idx, 1);
     this.selectProduct(null);
   }
   return this.products;
 }

 private addProduct = (product: Product) => {
   this.products.push(product);
   this.selectProduct(product);
   return this.products;
 }

 private updateProduct = (product: Product) => {
   const idx = this.getIndexOfProduct(product._id);
   if (idx !== -1) {
     this.products[idx] = product;
     this.selectProduct(product);
   }
   return this.products;
 }

}
