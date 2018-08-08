import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
