import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { MemberPageComponent } from './components/member-page/member-page.component';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'form',
    component: FormPageComponent
  },
  {
    path: 'member',
    component: MemberPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
