import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdoptService } from 'src/app/service/adopt.service';
import { PetFormModel } from '../../interfaces/pet.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DialogComponent } from '../../dialog/dialog.component';

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

  constructor(private formBuilder: FormBuilder, private service: AdoptService, public dialog: MatDialog) { }

  form = this.formBuilder.group({
    name: ['', Validators.required],
    species: ['', Validators.required],
    city: ['', Validators.required],
    type: ['', Validators.required],
    size: ['', Validators.required],
    color: ['', Validators.required],
    age: ['', Validators.required],
    sex: ['', Validators.required],
    ligation: [false],
    introduction: ['', Validators.required],
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
    this.selectedPetId = 0;
    this.service.showPetGivingRecord(this.userId).subscribe(response => {
      console.log(response.response), this.petList = response.response
    });
  }

  deletePetInfo() {
    //重新查詢
    this.service.deletePetInfo(this.selectedPetId).subscribe(response => {
      if (response.statusCode === '0000') {
        this.ngOnInit();
        this.dialog.open(DialogComponent, {
          data: { dialogMode: 'deleteSuccessDialog' }
        });
      } else {
        this.dialog.open(DialogComponent, {
          data: { dialogMode: 'deleteFailedDialog' }
        });
      }
    });
  }

  modifyPetInfo() {
    if (this.form.invalid) {
      this.dialog.open(DialogComponent, {
        data: { dialogMode: 'invalidInputDialog' }
      });
    } else if (this.form.valid) {
      const petData: PetFormModel = {
        id: this.selectedPetId,
        name: this.form.value.name || null,
        species: this.form.value.species || null,
        city: this.form.value.city || null,
        type: this.form.value.type || null,
        size: this.form.value.size || null,
        color: this.form.value.color || null,
        age: this.form.value.age || null,
        sex: this.form.value.sex || null,
        ligation: this.form.value.ligation === true ? 'Y' : 'N',
        introduction: this.form.value.introduction!,
        photo: null,//待解決
        postStatus: null,//沒用到
        publishDate: null,//沒用到
        conditionAffidavit: this.form.value.affidavit === true ? 'Y' : 'N',
        conditionFollowUp: this.form.value.followUp === true ? 'Y' : 'N',
        conditionAgeLimit: this.form.value.ageLimit === true ? 'Y' : 'N',
        conditionParentalPermission: this.form.value.parentalPermission === true ? 'Y' : 'N',
        //先預設userId = 2
        userId: this.userId
      };
      console.log(this.form);
      console.log(petData);
      this.modifyInfoList.push(petData);
      this.service.updatePetInfo(this.modifyInfoList).subscribe(response => {
        //更新成功dialog
        if (response.statusCode === '0000') {
          this.ngOnInit();
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateSuccessDialog' }
          });
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateFailedDialog' }
          });
        }
      });
    }
  }

  selectPet(pet: PetFormModel[]) {
    this.selectedPetId = pet[0].id!;
    console.log(pet[0]);
    //將值放到畫面上
    this.form.patchValue({
      name: pet[0].name,
      //要再想想，因為pet[0].species是speciesName，不是speciesId，已在後端更改
      //圖片問題
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

}
