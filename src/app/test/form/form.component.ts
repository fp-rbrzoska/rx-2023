import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  myForm = new FormGroup({
    name: new FormControl(), //text input
    country: new FormControl(), // autocomplete
    city: new FormControl(), // select
    birthDate: new FormControl(new Date()), // datepicker
  })

  countries = ['Polska', 'Portugalia', 'Peru', 'San Escobar', 'San Salvador'];
  cities = ['Racibórz', 'Radom', 'Warszawa', 'Sosnowiec'];
  filteredCountries!: Observable<string[]>;

  ngOnInit() {
    this.filteredCountries = this.myForm.controls.country.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }
}
