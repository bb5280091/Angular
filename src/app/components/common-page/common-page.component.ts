import { Component } from '@angular/core';

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.css']
})
export class CommonPageComponent {
  get userRole() {
    return localStorage.getItem('role');
  }
/**
 *
 *若為Admin則推向'/admin' 其他則推向 '/member'，若沒有登入則會由守衛啟動dialog
 * @readonly
 * @memberof CommonPageComponent
 */
get routeBasedOnRole() {
    console.log('this.userRole:'+ this.userRole);
    return this.userRole === 'ADMIN' ? '/admin' : '/member';
  }
}
