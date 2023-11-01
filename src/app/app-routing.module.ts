import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMessagePageComponent } from './components/admin/admin-message-page/admin-message-page.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminPostPageComponent } from './components/admin/admin-post-page/admin-post-page.component';
import { AdminMemberPageComponent } from './components/admin/admin-member-page/admin-member-page.component';
import { ApplyRecordPageComponent } from './components/member/apply-record-page/apply-record-page.component';
import { FormPageComponent } from './components/form-page/form-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MemberInfoPageComponent } from './components/member/member-info-page/member-info-page.component';
import { MemberPageComponent } from './components/member/member-page/member-page.component';
import { MessagePageComponent } from './components/member/message-page/message-page.component';
import { PetgivingRecordPageComponent } from './components/member/petgiving-record-page/petgiving-record-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { ChatRoomPageComponent } from './components/chat-room-page/chat-room-page.component';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'detail',
    component: DetailPageComponent
  }
  ,
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'form',
    component: FormPageComponent,
    canActivate: [authGuard],
    data: { roles: [ 'USER','ADMIN'] } ,
  },
  {
    path: 'member',
    component: MemberPageComponent,
    canActivate: [authGuard],
    data: { roles: [ 'USER','ADMIN'] } ,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: MemberInfoPageComponent
      },
      {
        path: 'applyrecord',
        component: ApplyRecordPageComponent
      },
      {
        path: 'petgivingrecord',
        component: PetgivingRecordPageComponent
      },
      {
        path: 'message',
        component: MessagePageComponent
      },
      {
        path: 'chatroom',
        component: ChatRoomPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [authGuard],
    data: { roles: [ 'ADMIN'] } ,
    children: [
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full'
      },
      {
        path: 'post',
        component: AdminPostPageComponent
      },
      {
        path: 'member',
        component: AdminMemberPageComponent
      },
      {
        path: 'message',
        component: AdminMessagePageComponent
      },
      {
        path: 'chatroom',
        component: ChatRoomPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
