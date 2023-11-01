import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdoptionService } from '../../service/adoption.service';
import { animal, city, species } from '../../adpotion-model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  totalAnimals = 0;
  displayAnimals!: animal[];
  cityOptions!: city[];
  speciesOptions!: species[];
  nowPage = 0;

  constructor(private adoptionService: AdoptionService, private fb: FormBuilder, private router: Router) { }
  /**
   * 初始畫面加載
   * 1.點入畫面呈現所有動物搜尋結果
   * 2.篩選畫條件後畫面呈現
   * 3.寵物點擊次數增加
   */
  ngOnInit(): void {
    forkJoin({
      animals: this.adoptionService.onQueryAllAnimal(this.nowPage),
      cities: this.adoptionService.onQueryAllCity(),
      species: this.adoptionService.onQueryAllSpecies()
    }).subscribe((result) => {
      console.log(result.animals);
      this.totalAnimals = result.animals.totalCount;
      this.displayAnimals = result.animals.response;
      console.log(this.displayAnimals)
      this.cityOptions = result.cities.data;
      console.log(this.cityOptions)
      this.speciesOptions = result.species.data;
    });
  }
  searchForm = this.fb.group(
    {
      cityId: [''],
      sex: [''],
      speciesId: ['']
    }
  )
  /**
   * 送出篩選條件並搜尋放入displayAnimal上顯示
   */
  onSubmit() {
    console.log('觸發')
    const values = this.searchForm.value;
    if (values.cityId === '' && values.sex === '' && values.speciesId === '') {
      this.adoptionService.onQueryAllAnimal(this.nowPage).subscribe((res) => {
        this.totalAnimals = res.totalCount
        this.displayAnimals = res.response;
      })
      return;
    }
    const cityId = values.cityId || '';
    const sex = values.sex || '';
    const speciesId = values.speciesId || '';
    console.log(cityId, sex, speciesId)
    this.adoptionService.onQueryConditionalAnimal(cityId, sex, speciesId, this.nowPage).subscribe((res) => {
      console.log(res);
      this.totalAnimals = res.totalCount
      this.displayAnimals = res.response;
    })
  }

  cardClicked(animalId: number) {
    this.adoptionService.onAddCtr(animalId).subscribe((res) => {
      if (res.statusCode !== '0000') {
        console.log('err點擊數尚未計算成功')
      }
      console.log(res.status)
    }
    )
    this.router.navigate(['/detail'], { queryParams: { animalId: animalId } });
  }

  // 換頁
  onPageChange(event: PageEvent) {
    console.log(event.pageIndex);
    this.nowPage = event.pageIndex
    this.adoptionService.onQueryAllAnimal(this.nowPage).subscribe(result => {
      this.displayAnimals = result.response;
    });

  }
}
