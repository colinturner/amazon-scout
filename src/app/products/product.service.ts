import { Injectable } from '@angular/core';
import { Product } from './product';
import { Http, Response } from '@angular/http';

@Injectable()
export class ProductService {
  private productsUrl = '/api/products';

  constructor (private http: Http) {}

  // get('/api/products')
  getProducts(): Promise<void | Product[]> {
    return this.http.get(this.productsUrl)
      .toPromise()
      .then(response => response.json() as Product[])
      .catch(this.handleError);
  }

  // post('/api/products')
  storeProduct(newProduct: Product): Promise<void | Product> {
    return this.http.post(this.productsUrl, newProduct)
      .toPromise()
      .then(response => response.json() as Product)
      .catch(this.handleError);
  }

  // delete('/api/products/:id')
  deleteProduct(productId: String): Promise<void | String> {
    return this.http.delete(this.productsUrl + '/' + productId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put('/api/products/:id;)
  updateProduct(product: Product): Promise<void | Product> {
    const putUrl = this.productsUrl + '/' + product._id;
    return this.http.put(putUrl, product)
      .toPromise()
      .then(response => response.json() as Product)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
  }




}