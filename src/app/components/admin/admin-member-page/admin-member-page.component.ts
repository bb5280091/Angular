import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RespUser, Users } from 'src/app/adpotion-model';
import { AdoptionService } from 'src/app/service/adoption.service';

@Component({
  selector: 'app-admin-member-page',
  templateUrl: './admin-member-page.component.html',
  styleUrls: ['./admin-member-page.component.css'],
})

export class AdminMemberPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private adoptionService: AdoptionService
  ) { }
  ngOnInit(): void {
    this.onSubmit();
  }
  displayUsers!: RespUser[];
  recordUserCondition: {
    selection: any;
    keyWord: any;
  } = {
      selection: '',
      keyWord: '',
    };

  selectForm = this.fb.group({
    selection: [''],
    keyWord: [''],
  });

  displayForm = this.fb.group({
    userId: [''],
  });

  //送出查詢
  onSubmit() {
    this.recordOfCondition();
    this.onSearch();
  }

  recordOfCondition() {
    const values = this.selectForm.value;
    this.recordUserCondition.selection = values.selection;
    this.recordUserCondition.keyWord = values.keyWord;
  }

  onSearch() {
    const values = this.selectForm.value;
    if (!values.keyWord && !values.selection) {
      console.log('觸發');
      this.adoptionService.onQueryAllUser().subscribe((res) => {
        //檢查是哪一種return
        if ('statusCode' in res) {
          console.log('查無資料');
          this.displayUsers = [];
        }
        if ('users' in res) {
          this.displayUsers = res.users;
          console.log(this.displayUsers);
        }
      });
    }
    if (values.selection === 'number') {
      if (!values.keyWord) {
        this.adoptionService.onQueryAllUser().subscribe((res) => {
          //檢查是哪一種return
          if ('statusCode' in res) {
            console.log('查無資料');
            this.displayUsers = [];
          }
          if ('users' in res) {
            this.displayUsers = res.users;
          }
        });
      } else {
        this.adoptionService
          .onQueryUserByUserId(Number(values.keyWord))
          .subscribe((res) => {
            if ('statusCode' in res) {
              console.log('查無資料');
              this.displayUsers = [];
            }
            if ('user' in res) {
              console.log(res);
              const user: RespUser[] = [res.user];
              this.displayUsers = user;
            }
          });
      }
    }
    if (values.selection === 'email') {
      if (!values.keyWord) {
        this.adoptionService.onQueryAllUser().subscribe((res) => {
          //檢查是哪一種return
          if ('statusCode' in res) {
            this.displayUsers = [];
          }
          if ('users' in res) {
            this.displayUsers = res.users;
          }
        });
      } else {
        this.adoptionService
          .onQueryUsersByGoogleAccount(values.keyWord)
          .subscribe((res) => {
            if ('statusCode' in res) {
              this.displayUsers = [];
            }
            if ('users' in res) {
              this.displayUsers = res.users;
            }
          });
      }
    }
  }

  putStatusOn() {
    console.log('on');
    const userId = this.displayForm.value.userId;
    if (userId) {
      const index = this.displayUsers.findIndex(
        (user) => user.userId === Number(userId)
      );
      if (this.displayUsers[index].status === 'Y') {
        return;
      } else {
        this.adoptionService
          .onPutUserStatusOn(Number(userId))
          .subscribe((res) => {
            if (res.statusCode) {
              console.log('成功');
              this.onReset();
            } else {
              console.log('失敗');
            }
          });
      }
    }
  }
  putStatusOff() {
    console.log('off');
    const userId = this.displayForm.value.userId;
    console.log(userId);
    if (userId) {
      console.log(userId);
      const index = this.displayUsers.findIndex(
        (user) => user.userId === Number(userId)
      );
      if (this.displayUsers[index].status === 'N') {
        return;
      } else {
        console.log('off');
        this.adoptionService
          .onPutUserStatusOff(Number(userId))
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode) {
              console.log('成功');
              this.onReset();
            } else {
              console.log('失敗');
            }
          });
      }
    }
  }

  onReset() {
    console.log('onrest');
    this.selectForm.setValue({
      selection: this.recordUserCondition.selection,
      keyWord: this.recordUserCondition.keyWord,
    });
    this.onSearch();
    this.selectForm.setValue({
      selection: '',
      keyWord: '',
    });
  }
}
