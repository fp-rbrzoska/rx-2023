import { Component } from '@angular/core';
import { AppStateService } from './app-state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rx-proj';
  pending$!: Observable<boolean>;
  constructor(private _appStateService: AppStateService ) {
    this.pending$ = _appStateService.pending$;
  }
}
