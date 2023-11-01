import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { city, species } from '../../adpotion-model';
import { AdoptService } from '../../service/adopt.service';
import { DialogComponent } from '../dialog/dialog.component';
import { PetFormModel } from '../interfaces/pet.interface';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})
export class FormPageComponent {

  constructor(private formBuilder: FormBuilder, private service: AdoptService, public dialog: MatDialog) { }
  cityList!: city[];
  speciesList!: species[];
  createPetList: PetFormModel[] = [];
  selectedFile!: string | undefined;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    species: ['', Validators.required],
    city: ['', Validators.required],
    type: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    size: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    color: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    sex: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    ligation: [''],
    introduction: [''],
    photo: ['', Validators.required],
    affidavit: [''],
    followUp: [''],
    ageLimit: [''],
    parentalPermission: ['']
  })

  onSubmit() {
    console.log(this.form);
    console.log(this.selectedFile);
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
        ligation: formData.ligation ? "Y" : "N",
        introduction: formData.introduction || null,
        photo: this.selectedFile || null,
        postStatus: null,//沒用到
        publishDate: null,//沒用到
        conditionAffidavit: formData.affidavit ? "Y" : "N",
        conditionFollowUp: formData.followUp ? "Y" : "N",
        conditionAgeLimit: formData.ageLimit ? "Y" : "N",
        conditionParentalPermission: formData.parentalPermission ? "Y" : "N",
        userId: Number(localStorage.getItem('userId'))
      };
      console.log(Number(localStorage.getItem('userId')));
      console.log(petData);
      this.createPetList.push(petData);
      this.service.createPetInfo(this.createPetList).subscribe(response => {
        if (response.statusCode === '0000') {
          this.dialog.open(DialogComponent, {
            //新增成功dialog
            data: { dialogMode: 'createSuccessDialog' }
          });
          this.clearInput();
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'createFailedDialog' }
          })
        }
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
    this.selectedFile = undefined;
    this.createPetList = [];
  }

  async onPhotoChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = await this.getBase64(file).then();
      this.selectedFile = this.selectedFile!.split(",")[1];//將前綴(blob:)拿掉
      console.log(this.selectedFile);
    }
  }

  getBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
