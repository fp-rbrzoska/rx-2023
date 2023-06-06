import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav
  title = 'rx-proj';
  pending$!: Observable<boolean>;
  constructor(private _appStateService: AppStateService ) {
    this.pending$ = _appStateService.pending$;
  }

  ngAfterViewInit(): void {
      setTimeout(() => this.sidenav.close());

  }
}
