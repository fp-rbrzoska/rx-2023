import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, map, pipe, throwError } from 'rxjs';

export interface User {
  id?: string;
  name: string;
  age: number;
}
export interface AppState {
  users: User[];
  pending: boolean;
  isLoggedIn: boolean;
}

const initialAppState: AppState = {
  users: [],
  pending: false,
  isLoggedIn: false
}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private _appStore = new BehaviorSubject<AppState>(initialAppState);
  private _actionHistory: { actionName: string, state: AppState}[] = [];
  appState$ = this._appStore.asObservable();


  isLoggedIn$ = this._appStore.pipe(
      map(state => state.isLoggedIn),
      distinctUntilChanged()
    );

  users$ = this._appStore.pipe(
      map(state => state.users),
      distinctUntilChanged()
    );

  pending$ = this._appStore.pipe(
        map(state => state.pending),
        distinctUntilChanged()
      );

  constructor(private http: HttpClient) { }

  loadUsers() {
    this._setState({pending: true }, 'LOAD_USERS');
    this.http.get<User[]>('http://localhost:3000/user')
    .pipe(catchError((err) => {
      this._setState({pending: false}, 'LOAD_USERS_FAIL')
      return throwError(() => err)
    }))
    .subscribe(users => {
      this._setState({ users, pending: false }, 'LOAD_USERS_SUCCESS')
    })
  }

  logIn() {
   //call auth service login
    this._setState({ isLoggedIn: true}, 'LOGIN');
  }

  logOut() {
   //call auth service logout
    this._setState({ isLoggedIn: false}, 'LOGOUT');
  }

  private _setState(substate: Partial<AppState>, actionName: string){
    const currentState = this._appStore.value;
    const newState = {...currentState, ...substate};
    this._actionHistory.push({actionName, state: newState})
    this._appStore.next(newState);
  }

}
