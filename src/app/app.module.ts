import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonPageComponent } from './components/common-page/common-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { MemberPageComponent } from './components/member/member-page/member-page.component';
import { ApplyRecordPageComponent } from './components/member/apply-record-page/apply-record-page.component';
import { MemberInfoPageComponent } from './components/member/member-info-page/member-info-page.component';
import { PetgivingRecordPageComponent } from './components/member/petgiving-record-page/petgiving-record-page.component';
import { MessagePageComponent } from './components/member/message-page/message-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminPostPageComponent } from './components/admin/admin-post-page/admin-post-page.component';
import { AdminMessagePageComponent } from './components/admin/admin-message-page/admin-message-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';






@NgModule({
  declarations: [
    AppComponent,
    CommonPageComponent,
    MainPageComponent,
    FormPageComponent,
    MemberPageComponent,
    ApplyRecordPageComponent,
    MemberInfoPageComponent,
    PetgivingRecordPageComponent,
    MessagePageComponent,
    LoginPageComponent,
    AdminPageComponent,
    AdminPostPageComponent,
    AdminMessagePageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
