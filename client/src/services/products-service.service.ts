import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Product, ProductsResponse } from '../models/product.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of products from the API.
   * Handles errors by returning an empty array if the request fails.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching products:', error.message);
        return of([]); // Return an empty array on error
      })
    );
  }

  /**
   * Fetches a single product by its ID.
   * Handles errors by throwing a user-friendly message.
   */
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Failed to fetch product. Please try again later.'));
      })
    );
  }

  /**
   * Creates a new product on the server.
   * Handles errors by returning a user-friendly error message.
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Failed to create product. Please try again later.'));
      })
    );
  }

  /**
   * Updates an existing product by its ID.
   * Handles errors by returning a user-friendly error message.
   */
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Failed to update product. Please try again later.'));
      })
    );
  }

  /**
   * Deletes a product by its ID.
   * Handles errors by returning an empty observable on failure.
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Failed to delete product. Please try again later.'));
      })
    );
  }
}
