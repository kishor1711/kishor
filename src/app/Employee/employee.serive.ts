import { Injectable } from '@angular/core';
import { IEmployee } from '../Employee/IEmployee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable(
    { providedIn: 'root' }
)
export class EmployeeService {
    constructor(private http: HttpClient) { }

    baseUrl = "http://localhost:3000/employees";

    getEmployee(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(this.baseUrl).pipe(catchError(this.handleError));
    }

    getEmployeeById(id: number): Observable<IEmployee> {
        return this.http.get<IEmployee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

    addEmployee(employee: IEmployee): Observable<IEmployee> {
        return this.http.post<IEmployee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        })
            .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: IEmployee): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        })
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client Side Error', errorResponse.error);
        } else {
            console.log('Server Side Error', errorResponse.error);
        }

        return throwError('There is a problem with server.');
    }
}