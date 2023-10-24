import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdoptService } from 'src/app/service/adopt.service';
import { PetFormModel } from '../../interfaces/pet.interface';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-admin-post-page',
  templateUrl: './admin-post-page.component.html',
  styleUrls: ['./admin-post-page.component.css']
})
export class AdminPostPageComponent {
  cityList: any;
  speciesList: any;
  searchingOption = 'all'; //看是否有點選特定查詢
  petList: PetFormModel[] = [];
  selectedPetId = 0;

  constructor(private service: AdoptService, public dialog: MatDialog) { }

  ngOnInit() {
    (document.getElementById('searchInput') as HTMLInputElement).valueAsNumber = NaN;//清空輸入
    this.selectedPetId = 0;
    this.service.showAllCity().subscribe(response => {
      this.cityList = response.data;
    });

    this.service.showAllSpecies().subscribe(response => {
      this.speciesList = response.data;
    });
    //show all pets
    //看要怎樣傳入id，可能登入之後做查詢存在service之後方便使用
    this.service.showPetInfo().subscribe(response => {
      console.log(response.response), this.petList = response.response
    });
  }

  selectPet(pet: PetFormModel[]) {
    this.selectedPetId = pet[0].id!;
    console.log(pet[0]);
  }

  search() {
    let searchInput = (document.getElementById('searchInput') as HTMLInputElement).valueAsNumber;
    console.log(searchInput);
    if (Number.isNaN(searchInput)) {
      //都沒輸入也查全部
      this.service.showPetInfo().subscribe(response => {
        console.log(response.response);
        this.petList = response.response
      });
    }
    else if (this.searchingOption === 'byPetId') {
      //以animalId查詢
      this.service.queryPetByPetId(searchInput).subscribe(response => {
        console.log(response.response);
        console.log(response);
        this.petList = response.response;
        if (response.response === undefined) {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'queryFailedDialog' }
          });
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'querySuccessDialog' }
          });
          this.petList = response.response;
        }
      });
    } else if (this.searchingOption === 'byUserId') {
      //以userId查詢
      this.service.showPetGivingRecord(searchInput).subscribe(response => {
        console.log(response.response);
        console.log(response);
        this.petList = response.response;
        if (response.response === undefined) {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'queryFailedDialog' }
          });
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'querySuccessDialog' }
          });
          this.petList = response.response;
        }
      });
    }
  }

  post() {
    //抓this.selectedPetId去更改postStatus
    //目前改不了，但swagger可以
    console.log(this.selectedPetId);
    this.service.updatePostStatus(this.selectedPetId, 'Y').subscribe(response => {
      console.log(response);
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
    })
  }

  cancelPosting() {
    this.service.updatePostStatus(this.selectedPetId, 'N').subscribe(response => {
      console.log(response);
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
    })
  }
}
