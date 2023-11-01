import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { PetFormModel } from '../../interfaces/pet.interface';
import { AdoptService } from '../../../service/adopt.service';
import { city, species } from '../../../adpotion-model';

@Component({
  selector: 'app-petgiving-record-page',
  templateUrl: './petgiving-record-page.component.html',
  styleUrls: ['./petgiving-record-page.component.css']
})
export class PetgivingRecordPageComponent {
  cityList!: city[];
  speciesList!: species[];
  petList: PetFormModel[] = [];
  showDetails = false;
  selectedPetId = 0;
  modifyInfoList: PetFormModel[] = [];
  selectedFile!: string | null;

  constructor(private formBuilder: FormBuilder, private service: AdoptService, public dialog: MatDialog) { }

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    species: ['', Validators.required],
    city: ['', Validators.required],
    type: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    size: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    color: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    age: ['', [Validators.required, Validators.pattern(/[\S]/)]],
    sex: ['', Validators.required],
    ligation: [false],
    introduction: [''],
    photo: [''],
    affidavit: [false],
    followUp: [false],
    ageLimit: [false],
    parentalPermission: [false]
  })

  ngOnInit() {
    this.service.showAllCity().subscribe(response => {
      this.cityList = response.data;
    });

    this.service.showAllSpecies().subscribe(response => {
      this.speciesList = response.data;
    });
    //show petgiving record
    this.service.showPetGivingRecord(Number(localStorage.getItem('userId'))).subscribe(response => {
      console.log(response.response);
      this.petList = response.response;
    });
  }

  deletePetInfo() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { dialogMode: 'deleteDialog', petName: this.form.value.name }
    });
    dialogRef.afterClosed().subscribe(petName => {
      //有確定刪除
      if (petName !== undefined) {
        console.log(petName);
        this.service.deletePetInfo(this.selectedPetId).subscribe(response => {
          console.log(response);
          if (response.statusCode === '0000') {
            this.dialog.open(DialogComponent, {
              data: { dialogMode: 'deleteSuccessDialog' }
            });
            //重新查詢
            this.refresh();
          } else {
            this.dialog.open(DialogComponent, {
              data: { dialogMode: 'deleteFailedDialog' }
            });
          }
        });
      }
    });
  }

  modifyPetInfo() {
    console.log(this.form);
    if (this.form.invalid) {
      this.dialog.open(DialogComponent, {
        data: { dialogMode: 'invalidInputDialog' }
      });
    } else if (this.form.valid) {
      const formData = this.form.value;
      console.log(formData);
      const petData: PetFormModel = {
        id: this.selectedPetId,
        name: formData.name || null,
        species: formData.species || null,
        city: formData.city || null,
        type: formData.type || null,
        size: formData.size || null,
        color: formData.color || null,
        age: formData.age || null,
        sex: formData.sex || null,
        ligation: formData.ligation === true ? 'Y' : 'N',
        introduction: formData.introduction!,
        photo: this.selectedFile,
        postStatus: null,//沒用到
        publishDate: null,//沒用到
        conditionAffidavit: formData.affidavit === true ? 'Y' : 'N',
        conditionFollowUp: formData.followUp === true ? 'Y' : 'N',
        conditionAgeLimit: formData.ageLimit === true ? 'Y' : 'N',
        conditionParentalPermission: formData.parentalPermission === true ? 'Y' : 'N',
        userId: Number(localStorage.getItem('userId'))
      };
      console.log(this.form);
      console.log(petData);
      this.modifyInfoList.push(petData);
      this.service.updatePetInfo(this.modifyInfoList).subscribe(response => {
        //更新成功dialog
        if (response.statusCode === '0000') {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateSuccessDialog' }
          });
          this.refresh();
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateFailedDialog' }
          });
        }
      });
    }
  }

  refresh() {
    this.service.showPetGivingRecord(Number(localStorage.getItem('userId'))).subscribe(response => {
      console.log(response.response);
      this.petList = response.response;
    });
    this.modifyInfoList = [];
    this.selectedPetId = 0;
  }

  selectPet(pet: PetFormModel[]) {
    console.log(this.form);
    this.selectedPetId = pet[0].id!;
    console.log(pet[0]);
    this.selectedFile = pet[0].photo;
    //將值放到畫面上
    this.form.patchValue({
      name: pet[0].name,
      species: pet[0].species,
      city: pet[0].city,
      type: pet[0].type,
      size: pet[0].size,
      color: pet[0].color,
      age: pet[0].age,
      sex: pet[0].sex,
      ligation: pet[0].ligation === 'Y' ? true : false,
      introduction: pet[0].introduction,
      photo: null,
      affidavit: pet[0].conditionAffidavit === 'Y' ? true : false,
      followUp: pet[0].conditionFollowUp === 'Y' ? true : false,
      ageLimit: pet[0].conditionAgeLimit === 'Y' ? true : false,
      parentalPermission: pet[0].conditionParentalPermission === 'Y' ? true : false
    });

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
