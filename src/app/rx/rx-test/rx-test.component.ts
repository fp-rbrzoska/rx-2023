import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, catchError, combineLatest, concatMap, debounceTime, delay, exhaustMap, forkJoin, from, fromEvent, map, merge, mergeMap, of, switchMap, tap, throwError, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-rx-test',
  templateUrl: './rx-test.component.html',
  styleUrls: ['./rx-test.component.scss']
})
export class RxTestComponent {
  @ViewChild('myInput', { static: true }) myInput!: ElementRef<HTMLInputElement>;
  @ViewChild('myButton', { static: true }) myButton!: ElementRef<HTMLButtonElement>;

  obs$ = new Observable(obs => {
    setTimeout(() => {
      obs.next('From observable 1')
    }, 2000)
    setTimeout(() => {
      obs.error('Error From observable 1')
    }, 2500)
    setTimeout(() => {
      obs.next('From observable 2')
    }, 3000)
  })

  ofObs$ = of(1, 2, 3, 4, 5);
  fromObs$ = from([1,2,3,4,5])
  fromEventObs$!: Observable<any>;
  clickObs$!: Observable<any>;


  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.obs$.pipe(
      catchError(err => {
        console.log('error in app')
        return of('Error')
      })
      ).subscribe(val => console.log(val))
    this.ofObs$.subscribe(val => console.log(val));
    this.fromEventObs$ = fromEvent(this.myInput.nativeElement, 'input').pipe(
      debounceTime(500),
      map((input: any) => input.target.value)),

    // this.fromEventObs$.pipe(
    //   concatMap((val) => this.http.get<any>('http://localhost:3000/user', {
    // params: { search: val}
    // })))

    this.clickObs$ =  fromEvent(this.myButton.nativeElement, 'click')
    // this.clickObs$.subscribe(() => this.http.get<any>('http://localhost:3000/user').subscribe())

    // const subs = this.http.get<any>('http://localhost:3000/user').subscribe();
    // setTimeout(() => subs.unsubscribe(), 500)

    // this.clickObs$.pipe(
    //     switchMap((val) => this.http.get<any>('http://localhost:3000/user')),
    //   ).subscribe(val => console.log(val))

    // this.clickObs$.pipe(
    //     concatMap((val) => this.http.get<any>('http://localhost:3000/user')),
    //   ).subscribe(val => console.log(val))

    // this.clickObs$.pipe(
    //     mergeMap((val) => this.http.get<any>('http://localhost:3000/user')),
    //   ).subscribe(val => console.log(val))

    // this.clickObs$.pipe(
    //     exhaustMap((val) => this.http.get<any>('http://localhost:3000/user')),
    //   ).subscribe(val => console.log(val))

    // merge(this.clickObs$, this.fromEventObs$).subscribe(console.log);
    combineLatest([this.clickObs$, this.fromEventObs$]).subscribe(console.log)
    // forkJoin([this.http.get<any>('http://localhost:3000/user').pipe(delay(2000)), this.http.get<any>('http://localhost:3000/user')]).subscribe(v => console.log(v))
  }
}
