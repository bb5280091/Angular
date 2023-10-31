import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MinimalistAnimal } from 'src/app/adpotion-model';
import { AdoptionService } from 'src/app/service/adoption.service';

@Component({
  selector: 'app-apply-record-page',
  templateUrl: './apply-record-page.component.html',
  styleUrls: ['./apply-record-page.component.css']
})
export class ApplyRecordPageComponent implements OnInit {
  constructor(private adoptionService: AdoptionService,private router: Router) { }
  dispalyAnimal!: MinimalistAnimal[];
  ngOnInit(): void {
    this.adoptionService.onGetUserSubscription(Number(localStorage.getItem('userId'))).subscribe((res) => {
      if ('response' in res) {
        this.dispalyAnimal = res.response;
      } else {
        console.log('查無資料')
      }

    })
  }
  unsubscription(id: number) {
    this.adoptionService.UserUnsubscription(Number(localStorage.getItem('userId')), id).subscribe((res) => {
      if (res.statusCode === '0000') {
        console.log('刪除成功');
      } else {
        console.log('刪除失敗');
      }

    })
  }
  navigateToYourPath(id :number) {
    this.router.navigate(['/detail'], { queryParams: { animalId: id } });
  }

}
