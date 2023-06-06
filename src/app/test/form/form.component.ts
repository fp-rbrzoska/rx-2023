import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

}
