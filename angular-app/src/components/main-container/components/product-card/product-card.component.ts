import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
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
