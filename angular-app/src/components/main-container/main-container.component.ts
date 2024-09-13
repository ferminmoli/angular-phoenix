import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductsService } from '../../services';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from './components/product-card';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { ProductFormDialogComponent } from './components/product-form-dialog';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe,  MatButtonModule, MatTableModule, MatToolbarModule, MatIconModule],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  private productsService = inject(ProductsService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  
  products$: Observable<Product[]> = of([]);
  displayedColumns: string[] = ['id', 'title', 'description', 'price', 'actions'];

  constructor(){
    this.loadProducts();
  }

  loadProducts(){
    this.products$ = this.productsService.getProducts();
    this.cdr.markForCheck();
  }

  openProductDialog(product?: Product): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '400px',
      data: product || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateProduct(result);
        } else {
          this.createProduct(result);
        }
      }
    });
  }

  createProduct(product: Product): void {
    this.productsService.createProduct(product).subscribe(() => {
      this.loadProducts();
    });
  }

  updateProduct(product: Product): void {
    this.productsService.updateProduct(product.id!, product).subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
