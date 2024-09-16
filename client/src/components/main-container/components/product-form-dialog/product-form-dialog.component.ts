import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButton,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
  ],
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-bottom: 15px;
      }
    `,
  ],
})
export class ProductFormDialogComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      id: data.id,
      title: [data.title || '', Validators.required],
      description: [data.description || '', Validators.required],
      price: [data.price || '', [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
