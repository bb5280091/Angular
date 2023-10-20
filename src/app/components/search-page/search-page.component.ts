import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AdoptionService } from 'src/app/adoption.service';
import { animal, city, simpleAnimal, species } from 'src/app/adpotion-model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  displayAnimals!: animal[];
  cityOptions!: city[];
  speciesOptions!: species[];
  constructor(private adoptionService: AdoptionService, private fb: FormBuilder) { }

  ngOnInit(): void {
    forkJoin({
      animals: this.adoptionService.onQueryAllanimal(),
      cities: this.adoptionService.onQueryAllCity(),
      species: this.adoptionService.onQueryAllSpecies()
    }).subscribe((result) => {
      this.displayAnimals = result.animals.response;
      console.log(this.displayAnimals)
      this.cityOptions = result.cities.data;
      console.log(this.cityOptions)
      this.speciesOptions = result.species.data;
    });
  }
  searchForm = this.fb.group(
    {
      cityId: ['',[Validators.required]],
      sex: ['',[Validators.required]],
      speciesId: ['',[Validators.required]]
    }
  )
  /**
   * 送出篩選條件並搜尋
   */
  onSubmit() {
    const values = this.searchForm.value;
    if (values.cityId === '' && values.sex === '' && values.speciesId === '') {
      this.adoptionService.onQueryAllanimal().subscribe((res) => {
        this.displayAnimals = res.response;
      })
      return;
    }
    if(this.searchForm.valid){
      this.displayAnimals = this.adoptionService.onQueryConditionalAnimal(values.cityId, values.sex, values.speciesId)
    }
   
  }
}
