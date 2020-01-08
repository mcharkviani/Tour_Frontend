import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {ITour} from '../interfaces/ITour';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>(this.url).pipe(
        catchError(this.errorHandler)
      );
  }

  getTour(id: string): Observable<ITour> {
    return this.http.get<ITour>(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  addTour(tour: ITour): Observable<ITour> {
    return this.http.post<ITour>(this.url, tour).pipe(
      tap(data => console.log(data)),
      catchError(this.errorHandler)
    );
  }

  updateTour(id: string, tour: ITour): Observable<ITour> {
    return this.http.put<ITour>(`${this.url}/${id}`, tour).pipe(
      map((data) => data),
      catchError(this.errorHandler)
    );
  }

  deleteTour(id: string): Observable<ITour> {
    return this.http.delete<ITour>(`${this.url}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getImage(image: any): Observable<Blob> {
    return this.http.get(`${this.url}/${image}`, {responseType: 'blob'}).pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
