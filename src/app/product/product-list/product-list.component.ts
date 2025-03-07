import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = 'priceLowHigh'

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.filteredProducts = products
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product added to cart", "Close", {
          duration: 2000,
          horizontalPosition: "right",
          verticalPosition: "top"
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    filterValue.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(filterValue));
  }

  sortProducts(sortOrder: string) {
    this.sortOrder = sortOrder;
    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

}
