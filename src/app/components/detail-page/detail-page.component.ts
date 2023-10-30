import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionService } from 'src/app/service/adoption.service';
import { animal } from 'src/app/adpotion-model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})

export class DetailPageComponent implements OnInit {
  displayAnimals!: animal;
  animalId!: number;
  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      this.animalId = +param['animalId'];
      console.log(this.animalId);
      this.adoptionService.onQueryAnimalById(this.animalId).subscribe(res => {
        this.displayAnimals = res.response[0];
        console.log(res);

      });
    });
  }
  onSubscription(){
if(localStorage.getItem('userId')){
this.adoptionService. UserSubscription(Number(localStorage.getItem('userId')), this.animalId).subscribe((res)=>{
console.log(res)
  if(res.statusCode==='0000'){
  console.log("訂閱成功")
}else{
  console.log("訂閱失敗")
}

})
}
  }

}
