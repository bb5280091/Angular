import { simpleAnimal } from './../../adpotion-model';

import { AdoptionService } from './../../adoption.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  /**
   *呈現main頁面的前三名的寵物資訊
   * @type {animal[]}
   * @memberof MainPageComponent
   */
  displayRankAnimals: simpleAnimal[] = [];
  constructor(
    private adoptionService: AdoptionService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.adoptionService.onQueryRankCtr().subscribe((res) => {
      this.displayRankAnimals = res.animal;
    });
    console.log(this.displayRankAnimals)
    //取得token
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        console.log('JWT Token: ', token);
        localStorage.setItem('jwtToken', token);
        console.log(localStorage.getItem('jwtToken'));

        console.log('decode'+this.adoptionService.decodeFormJwt(token))
        //儲存相關資訊
        this.adoptionService.savaJwtwithStorge(token);
        console.log('mail'+ localStorage.getItem('mail'));
      }
    });
  }
  cardClicked(animalId: number) {
    this.adoptionService.onAddCtr(animalId).subscribe((res) => {
      if (res.statusCode !== '0000') {
        console.log('err點擊數尚未計算成功');
      }
      console.log(res.status);
    });
    this.router.navigate(['/detail'], { queryParams: { animalId: animalId } });
  }
}
