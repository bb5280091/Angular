import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdoptService } from 'src/app/service/adopt.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { PetFormModel } from '../../interfaces/pet.interface';

@Component({
  selector: 'app-petgiving-record-page',
  templateUrl: './petgiving-record-page.component.html',
  styleUrls: ['./petgiving-record-page.component.css']
})
export class PetgivingRecordPageComponent {
  cityList: any;
  speciesList: any;
  userId = 1;
  petList: PetFormModel[] = [];
  showDetails = false;
  selectedPetId = 0;
  petPhoto: string | undefined;
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
    //看要怎樣傳入id，可能登入之後做查詢存在service之後方便使用
    this.service.showPetGivingRecord(this.userId).subscribe(response => {
      console.log(response.response), this.petList = response.response
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
    console.log(this.form.value);
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
        //先預設userId = 2
        userId: this.userId
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
    this.service.showPetGivingRecord(this.userId).subscribe(response => {
      console.log(response.response), this.petList = response.response
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
      //要再想想，因為pet[0].species是speciesName，不是speciesId，已在後端更改
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
      console.log(this.selectedFile);
      console.log(this.selectedFile!.split(",")[1]);
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
