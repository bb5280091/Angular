import { Component, OnInit } from '@angular/core';
import { MinimalistAnimal } from 'src/app/adpotion-model';
import { AdoptionService } from 'src/app/service/adoption.service';

@Component({
  selector: 'app-apply-record-page',
  templateUrl: './apply-record-page.component.html',
  styleUrls: ['./apply-record-page.component.css']
})
export class ApplyRecordPageComponent implements OnInit{
  constructor(private adoptionService: AdoptionService){}
  dispalyAnimal! :MinimalistAnimal[];
  ngOnInit(): void {
   this.adoptionService.onGetUserSubscription(Number(localStorage.getItem('userId'))).subscribe((res)=>{
   if('response' in res){
    this.dispalyAnimal=res.response;
   }else{
    console.log('查無資料')
   }

   })
  }

}
