import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, catchError, debounceTime, from, fromEvent, map, of, throwError } from 'rxjs';

@Component({
  selector: 'app-rx-test',
  templateUrl: './rx-test.component.html',
  styleUrls: ['./rx-test.component.scss']
})
export class RxTestComponent {
  @ViewChild('myInput', { static: true }) myInput!: ElementRef<HTMLInputElement>;

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
      map((input: any) => input.target.value),

    )
    this.fromEventObs$.subscribe(v => console.log(v))
  }
}
