import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModel } from '../../interfaces/user.interface';
import { DialogComponent } from '../../dialog/dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AdoptService } from '../../../service/adopt.service';

@Component({
  selector: 'app-member-info-page',
  templateUrl: './member-info-page.component.html',
  styleUrls: ['./member-info-page.component.css']
})
export class MemberInfoPageComponent {
  infoList: UserFormModel[] = [];
  modifyInfoList: UserFormModel[] = [];

  constructor(private formBuilder: FormBuilder, private service: AdoptService, public dialog: MatDialog) { }

  form = this.formBuilder.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required]
  })

  ngOnInit() {
    //show user's info
    this.service.showUserInfo(Number(localStorage.getItem('userId'))).subscribe(response => {
      this.infoList.push(response.user);
      this.form.controls['name'].setValue(response.user.name);
      this.form.controls['mobile'].setValue(response.user.mobile);
    });
  }

  modifyInfo() {
    //輸入錯誤
    if (this.form.invalid) {
      this.dialog.open(DialogComponent, {
        data: { dialogMode: 'invalidInputDialog' }
      });
    } else if (this.form.valid) {
      //更新成功
      const formData = this.form.value;
      const userData: UserFormModel = {
        name: formData.name || null,
        mobile: formData.mobile || null,
        googleAccount: this.infoList[0].googleAccount,
        userId: this.infoList[0].userId,
        status: null//不可更改
      };
      this.modifyInfoList.push(userData);
      this.service.updateUserInfo(this.modifyInfoList).subscribe(response => {
        //更新成功dialog
        if (response.returnCode === '0000') {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateSuccessDialog' }
          });
        } else {
          this.dialog.open(DialogComponent, {
            data: { dialogMode: 'updateFailedDialog' }
          });
        }
      });
    }
  }

}
