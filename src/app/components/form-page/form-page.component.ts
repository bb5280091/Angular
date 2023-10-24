import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptService } from 'src/app/service/adopt.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PetFormModel } from '../interfaces/pet.interface';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {

  constructor(private formBuilder: FormBuilder, private service: AdoptService, public dialog: MatDialog) { }
  cityList: any;
  speciesList: any;
  createPetList: PetFormModel[] = [];
  selectedFile!: Blob;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    city: ['', Validators.required],
    type: ['', Validators.required],
    size: ['', Validators.required],
    color: ['', Validators.required],
    age: ['', Validators.required],
    sex: ['', Validators.required],
    ligation: [''],
    introduction: ['', Validators.required],
    photo: ['', Validators.required],
    affidavit: [''],
    followUp: [''],
    ageLimit: [''],
    parentalPermission: ['']
  })

  onSubmit() {
    console.log(this.form);
    console.log(this.form.value);
    console.log(this.form.value.photo);

    //輸入錯誤
    if (this.form.invalid) {
      this.dialog.open(DialogComponent, {
        data: { dialogMode: 'invalidInputDialog' }
      });
    } else if (this.form.valid) {
      //新增成功
      const formData = this.form.value;
      console.log(formData);
      const petData: PetFormModel = {
        id: null,
        name: formData.name || null,
        species: formData.species || null,
        city: formData.city || null,
        type: formData.type || null,
        size: formData.size || null,
        color: formData.color || null,
        age: formData.age || null,
        sex: formData.sex || null,
        ligation: formData.ligation ? "T" : "Y",
        introduction: formData.introduction || null,
        photo: this.selectedFile || null,
        //photo: null,
        postStatus: null,//沒用到
        publishDate: null,//沒用到
        conditionAffidavit: formData.affidavit ? "T" : "Y",
        conditionFollowUp: formData.followUp ? "T" : "Y",
        conditionAgeLimit: formData.ageLimit ? "T" : "Y",
        conditionParentalPermission: formData.parentalPermission ? "T" : "Y",
        //先預設userId = 1
        userId: 1
      };
      console.log(petData);
      this.createPetList.push(petData);
      this.service.createPetInfo(this.createPetList).subscribe(response => {
        console.log(response), response.returnCode = '0000' ? this.dialog.open(DialogComponent, {
          //新增成功dialog
          data: { dialogMode: 'createSuccessDialog' }
        }) : this.dialog.open(DialogComponent, {
          data: { dialogMode: 'createFailedDialog' }
        })
      });
      this.clearInput();
    } else {
      this.dialog.open(DialogComponent, {
        data: { dialogMode: 'createFailedDialog' }
      });
    }

  }

  ngOnInit() {
    //遍歷下拉式選單
    this.service.showAllCity().subscribe(response => {
      this.cityList = response.data;
    });

    this.service.showAllSpecies().subscribe(response => {
      this.speciesList = response.data;
    });
  }

  clearInput() {
    this.form.setValue({
      name: '',
      species: '',
      city: '',
      type: '',
      size: '',
      color: '',
      age: '',
      sex: '',
      ligation: '',
      introduction: '',
      photo: '',
      affidavit: '',
      followUp: '',
      ageLimit: '',
      parentalPermission: '',
    })
    this.createPetList = [];
  }

  onPhotoChange(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.form.patchValue({
    //     photo: file
    //   });
    // }
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
