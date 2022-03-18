import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from './task';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private TODO_API_URL = 'https://622b473014ccb950d23522d1.mockapi.io/api/todo';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient) { }

    getTask(id: number): Observable<Task> {
        const URL = `${this.TODO_API_URL}/${id}`;
        return this.http.get<Task>(URL).pipe(
            tap(() => console.log('Task fetched by id')),
            tap((res) => console.log(res)),
            catchError(this.handleError<Task>(`getTask id=${id}`))
        );
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.TODO_API_URL).pipe(
            tap(() => console.log('Tasks Fetched')),
            catchError(this.handleError<Task[]>('getTasks', []))
        );
    }

    addTask(task: Task): Observable<Task>{
        return this.http.post<Task>(this.TODO_API_URL, task, this.httpOptions).pipe(
            tap((newTask: Task) => console.log(`added task with id=${newTask.id}`)),
            catchError(this.handleError<Task>('addTask'))
        );
    }

    updateTask(task: Task): Observable<any> {
        return this.http.put<Task>(`${this.TODO_API_URL}/${task.id}`, task, this.httpOptions).pipe(
            tap(()=> console.log(`updated task id=${task.id}`)),
            catchError(this.handleError<any>('updateTask'))
        );
    }

    updateTaskStatus(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.TODO_API_URL}/${task.id}`, {"completed": !task.completed}, this.httpOptions).pipe(
            tap(()=> console.log(`updated task id=${task.id}`)),
            catchError(this.handleError<any>('updateTask'))
        );
    }

    deleteTask(task: Task): Observable<any> {
        return this.http.delete<Task>(`${this.TODO_API_URL}/${task.id}`).pipe(
            tap(()=> console.log(`deleted task id=${task.id}`)),
            catchError(this.handleError<any>('deleteTask'))
        );
    }


    /**
    * Handle Http operation that failed.
    * Let the app continue.
    *
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
