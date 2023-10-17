import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {

  constructor(private formBuilder: FormBuilder) { }

  form = this.formBuilder.group({
    name: [''],
    species: [''],
    city: [''],
    type: [''],
    size: [''],
    color: [''],
    age: [''],
    sex: [''],
    ligation: [''],
    introduction: [''],
    photo: [''],
    affidavit: [''],
    followUp: [''],
    ageLimit: [''],
    parentalPermission: ['']
  })

  onSubmit() {

  }

}
