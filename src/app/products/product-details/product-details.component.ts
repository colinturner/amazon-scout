import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent {
  @Input()
  product: Product;

  @Input()
  createHandler: Function;

  @Input()
  updateHandler: Function;

  @Input()
  deleteHandler: Function;

  @Input()
  fetchHandler: Function;

  constructor (private productService: ProductService) {}

  fetchProduct(asin: string) {
    this.productService
      .fetchProduct(asin)
      .then((fetchedProduct: Product) => {
        this.product.name = fetchedProduct.name;
        this.product.dimensions = fetchedProduct.dimensions;
        this.product.rank = JSON.stringify(fetchedProduct.rank);
      })
  }

  createProduct(product: Product) {
    this.productService
      .createProduct(product)
      .then((newProduct: Product) => this.createHandler(newProduct));
  }

  updateProduct(product: Product) {
    this.productService
      .updateProduct(product)
      .then((updatedProduct: Product) => this.updateHandler(updatedProduct));
  }

  deleteProduct(productId: String): void {
    this.productService
      .deleteProduct(productId)
      .then((deletedProductId: String) => this.deleteHandler(deletedProductId));
  }
}
