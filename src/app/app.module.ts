import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminMessagePageComponent } from './components/admin/admin-message-page/admin-message-page.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminPostPageComponent } from './components/admin/admin-post-page/admin-post-page.component';
import { CommonPageComponent } from './components/common-page/common-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ApplyRecordPageComponent } from './components/member/apply-record-page/apply-record-page.component';
import { MemberInfoPageComponent } from './components/member/member-info-page/member-info-page.component';
import { MemberPageComponent } from './components/member/member-page/member-page.component';
import { MessagePageComponent } from './components/member/message-page/message-page.component';
import { PetgivingRecordPageComponent } from './components/member/petgiving-record-page/petgiving-record-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatRoomPageComponent } from './components/chat-room-page/chat-room-page.component';
import { DatePipe } from '@angular/common';


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
    ChatRoomPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
