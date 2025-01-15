
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SiteService } from '../../services/site.service';
import { ProductService } from '../../services/product.service';
import { Site } from '../../models/site';
import { Product } from '../../models/product';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-product-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './new-order.component.html',
  styleUrl:'./new-order.component.css',
})
export class NewOrderComponent {
  private snackBar = inject(MatSnackBar);
 
  constructor( private siteService: SiteService,private productService: ProductService,private orderService: OrderService) {
  
    
  }
  sites: Site[] = [];

  products: Product[] = [];
 
   ngOnInit(): void {
        this.loadSites();
        this.loadProducts();
   }
 
   loadSites(){
     this.siteService.getSites().subscribe((data) => {
       this.sites = data;
     })
    }


   loadProducts(){
    this.productService.getProducts().subscribe((data) => {
      
      this.products = data;
      this.products.forEach(product => {
        product.counter = 0;
      });
    })
   }



  selectedSiteId: number | null = null;
  productCounters: Record<number, number> = Object.fromEntries(
    this.products.map(product => [product.id, 0])
  );

  onSiteSelect(): void {
    this.products.forEach(product => {
      product.counter = 0;
    });
  }

totalOrderPrice: number = 0;

incrementCounter(product: Product): void {
    product.counter++;
    this.productCounters[product.id] = product.counter;
    this.calculateTotalPrice();
}

decrementCounter(product: Product): void {
    if (product.counter > 0) {
        product.counter--;
        this.productCounters[product.id] = product.counter;
        this.calculateTotalPrice();
    }
}

calculateTotalPrice(): void {
    this.totalOrderPrice = this.products
        .filter(product => product.counter > 0)
        .reduce((total, product) => total + (product.price * product.counter), 0);
}
  hasProductsSelected(): boolean {
    return this.products.some(product => product.counter > 0);
  }

  submitOrder(): void {
    if (!this.selectedSiteId) {
      this.snackBar.open('Site is not selected!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return;
    }

    const order = {
      siteId: this.selectedSiteId,
      totalPrice: this.totalOrderPrice
    };

    this.orderService.addOrder(order).subscribe({
      next: (response) => {
        this.snackBar.open('Order sent successfully! 🎉', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.onSiteSelect();
      },
      error: (error) => {
        this.snackBar.open('Error occurred while sending the order', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
}