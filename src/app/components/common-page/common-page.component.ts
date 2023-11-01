import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.css']
})

export class CommonPageComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) { }
  lastAttemptedUrl: string | null = null;
  ngOnInit() {
    //追蹤導航是否成功，若失敗則請使用者登入
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.lastAttemptedUrl = event.url;
        console.log(`嘗試導航到: ${event.url}`);

      } else if (event instanceof NavigationEnd) {
        console.log(`成功導航到: ${event.url}`);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        console.log("觸發錯誤")
        // 如為被守衛擋下(return false)則觸發dialog
        this.dialog.open(DialogComponent, {
          data: { dialogMode: 'loginDialog' }
        });
      }
    });
  }

  isLoggedIn(): boolean {
    return !localStorage.getItem('jwtToken');
  }

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
    console.log('this.userRole:' + this.userRole);
    return this.userRole === 'ADMIN' ? '/admin' : '/member';
  }
  //登出
  onLogout() {
    this.router.navigate(['/']);
    localStorage.setItem('jwtToken','');
    localStorage.setItem('mail', '');
    localStorage.setItem('role', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('name', '');
    this.dialog.open(DialogComponent, {
      data: { dialogMode: 'logoutSuccessDialog' }
    });
  }

}
