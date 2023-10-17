import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonPageComponent } from './components/common-page/common-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { MemberPageComponent } from './components/member-page/member-page.component';





@NgModule({
  declarations: [
    AppComponent,
    CommonPageComponent,
    MainPageComponent,
    FormPageComponent,
    MemberPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
