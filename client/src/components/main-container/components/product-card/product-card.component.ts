import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, JsonPipe],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
