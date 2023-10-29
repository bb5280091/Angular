import { simpleAnimal } from './../../adpotion-model';

import { AdoptionService } from './../../adoption.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.adoptionService.onQueryRankCtr().subscribe((res) => {
      this.displayRankAnimals = res.animal;
    });
    //取得token
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        console.log('JWT Token: ', token);
        // 保存token(可以的話應該要做一個dialog"成功登入")
        localStorage.setItem('jwtToken', token);
        const decodedToken = this.jwtHelper.decodeToken(token);
        //儲存User訊息
        localStorage.setItem('userInfo', JSON.stringify({
          email: decodedToken.sub,
          role: decodedToken.role,
          userId: decodedToken.userId,
          realname: decodedToken.realname
        }));
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
