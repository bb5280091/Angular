import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdoptService } from '../../../service/adopt.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { PetFormModel } from '../../interfaces/pet.interface';
import { PageEvent } from '@angular/material/paginator';
import { city, species } from '../../../adpotion-model';

@Component({
  selector: 'app-admin-post-page',
  templateUrl: './admin-post-page.component.html',
  styleUrls: ['./admin-post-page.component.css']
})
export class AdminPostPageComponent {
  cityList!: city[];
  speciesList!: species[];
  searchingOption = 'all'; //看是否有點選特定查詢
  petList: PetFormModel[] = [];
  selectedPetId = 0;
  nowPage = 0;
  totalAnimals = 0;
  hidePaginator = false;

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
    this.service.showPetInfo(this.nowPage).subscribe(response => {
      this.petList = response.response;
      this.totalAnimals = response.totalCount;
    });
  }

  selectPet(pet: PetFormModel[]) {
    this.selectedPetId = pet[0].id!;
  }

  search() {
    let searchInput = (document.getElementById('searchInput') as HTMLInputElement).valueAsNumber;
    this.hidePaginator = false;
    //都沒輸入也查全部
    if (Number.isNaN(searchInput)) {
      this.service.showPetInfo(this.nowPage).subscribe(response => {
        this.petList = response.response;
        this.totalAnimals = response.totalCount;
      });
    }
    //以animalId查詢
    else if (this.searchingOption === 'byPetId') {
      this.service.queryPetByPetId(searchInput).subscribe(response => {
        this.hidePaginator = true;
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
        this.hidePaginator = true;
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

  // 換頁
  onPageChange(event: PageEvent) {
    this.nowPage = event.pageIndex
    this.service.showPetInfo(this.nowPage).subscribe(response => {
      this.petList = response.response;
      this.totalAnimals = response.totalCount;
    });
  }
}
