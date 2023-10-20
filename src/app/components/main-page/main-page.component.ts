import { simpleAnimal } from './../../adpotion-model';


import { AdoptionService } from './../../adoption.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  /**
   *呈現main頁面的前三名的寵物資訊
   * @type {animal[]}
   * @memberof MainPageComponent
   */
  displayRankAnimals: simpleAnimal[] = []
  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionService.onQueryRankCtr().subscribe((res) => {
      this. displayRankAnimals = res.animal;
    })
  }
  cardClicked(animalId: number) {
    this.adoptionService.onAddCtr(animalId).subscribe((res) =>{
    if (res.statusCode !== '0000') {
      console.log('err點擊數尚未計算成功')
    }
  console.log(res.status)
  }

    )

  }

}
