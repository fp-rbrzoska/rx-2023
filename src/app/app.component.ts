import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav
  title = 'rx-proj';
  sidenavOpen = true;
  isSmall = false;
  pending$!: Observable<boolean>;
  constructor(private _appStateService: AppStateService, private breakPointObserver: BreakpointObserver ) {
    this.pending$ = _appStateService.pending$;
    this.breakPointObserver.observe([Breakpoints.Small]).subscribe(br => {

      this.isSmall = !br.matches
      this.sidenavOpen = !this.isSmall;
    })
  }

  ngAfterViewInit(): void {
      // setTimeout(() => this.sidenav.close());

  }
}
