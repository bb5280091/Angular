import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionService } from '../../service/adoption.service';
import { DialogComponent } from '../dialog/dialog.component';
import { simpleAnimal } from './../../adpotion-model';

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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.adoptionService.onQueryRankCtr().subscribe((res) => {
      this.displayRankAnimals = res.animal;
    });
    console.log(this.displayRankAnimals);
    //取得token
    this.route.queryParams.subscribe((params) => {
      const disableError = params['accountDisable'];
      const token = params['token'];
      if (disableError) {
        this.dialog.open(DialogComponent, {
          data: { dialogMode: 'accountDisable' },
        });
      }
      if (token) {
        console.log('JWT Token: ', token);
        localStorage.setItem('jwtToken', token);
        console.log(localStorage.getItem('jwtToken'));

        console.log('decode' + this.adoptionService.decodeFormJwt(token));
        //儲存相關資訊
        this.adoptionService.savaJwtwithStorge(token);
        console.log('mail' + localStorage.getItem('mail'));
        this.loginInSuccess();
      }
    });
  }
  slides = [
    { img: "assets/images/wp1.jpg" },
    { img: "assets/images/wp2.jpg" },
    { img: "assets/images/wp3.jpg" }
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true
  };
  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
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

  loginInSuccess() {
    this.dialog.open(DialogComponent, {
      data: { dialogMode: 'loginSuccessDialog' }
    })
    this.router.navigate(['/'])
  }

}
