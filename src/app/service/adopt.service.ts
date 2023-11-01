import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PetFormModel } from '../components/interfaces/pet.interface';
import { UserFormModel } from '../components/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdoptService {
  url = 'http://localhost:8080';
  cityList = new Subject<any>();
  speciesList = new Subject<any>();

  constructor(private http: HttpClient) { }

  //用來遍歷city
  showAllCity() {
    return this.http.get<any>(this.url + "/comment/city");
  }

  //用來遍歷species
  showAllSpecies() {
    return this.http.get<any>(this.url + "/comment/species");
  }

  //新增寵物資料
  createPetInfo(list: PetFormModel[]) {
    const postData = {
      "request": {
        "name": list[0].name,
        "species": list[0].species,
        "type": list[0].type,
        "sex": list[0].sex,
        "size": list[0].size,
        "color": list[0].color,
        "age": list[0].age,
        "ligation": list[0].ligation,
        "city": list[0].city,
        "conditionAffidavit": list[0].conditionAffidavit,
        "conditionFollowUp": list[0].conditionFollowUp,
        "conditionAgeLimit": list[0].conditionAgeLimit,
        "conditionParentalPermission": list[0].conditionParentalPermission,
        "introduction": list[0].introduction,
        "photo":
          list[0].photo
        ,
        "userId":  Number(localStorage.getItem('userId'))
      }
    }
    return this.http.post<any>(this.url + "/adoptions", postData);
  };

  //更新會員資訊:可用於會員只更新名字電話，管理員停權更改status(有別隻api)
  updateUserInfo(list: UserFormModel[]) {
    const postData = {
      "request": {
        "userId": list[0].userId,
        "name": list[0].name,
        "mobile": list[0].mobile,
        "googleAccount": list[0].googleAccount,
        "status": list[0].status
      }
    }
    return this.http.put<any>(this.url + "/users", postData);
  }

  //查詢會員資訊
  showUserInfo(userId: number) {
    return this.http.get<any>(this.url + "/users", { params: { userId: userId } });
  }

  //查詢會員送養紀錄
  showPetGivingRecord(userId: number) {
    return this.http.get<any>(this.url + "/adoptions", { params: { userId: userId } });
  }

  //修改寵物資訊，ctr跟post status會重置(後端設定)
  updatePetInfo(list: PetFormModel[]) {
    const postData = {
      "request": {
        "id": list[0].id,
        "name": list[0].name,
        "species": list[0].species,
        "city": list[0].city,
        "type": list[0].type,
        "size": list[0].size,
        "color": list[0].color,
        "age": list[0].age,
        "sex": list[0].sex,
        "ligation": list[0].ligation,
        "introduction": list[0].introduction,
        "photo": list[0].photo,
        "conditionAffidavit": list[0].conditionAffidavit,
        "conditionFollowUp": list[0].conditionFollowUp,
        "conditionAgeLimit": list[0].conditionAgeLimit,
        "conditionParentalPermission": list[0].conditionParentalPermission,
        "userId": list[0].userId
      }
    }
    return this.http.put<any>(this.url + "/adoptions", postData);
  }

  //刪除寵物資訊
  deletePetInfo(id: number) {
    return this.http.delete<any>(this.url + "/adoptions", { params: { id: id } });
  }

 //查詢寵物資訊
 showPetInfo(page:number) {
  return this.http.get<any>(this.url + "/adoptions", { params: { page: page } });
}

  //查詢寵物資訊by animalId
  queryPetByPetId(animalId: number) {
    return this.http.get<any>(this.url + "/adoptions", { params: { animalId: animalId } });
  }

  //修改發文狀態
  updatePostStatus(id: number, postStatus: String) {
    const postData = {
      "id": id,
      "status": postStatus
    }
    return this.http.put<any>(this.url + "/adoptions/status", postData);
  }

  //查詢對話
  showMessages(userId: number) {
    return this.http.get<any>(this.url + "/messages", { params: { userId: userId } });
  }

  //查詢一對一的聊天紀錄
  showChatroomMessages(userId: number, otherId: number) {
    return this.http.get<any>(this.url + "/messages", { params: { userId: userId, otherId: otherId } });
  }

   //查詢留言
   showDiscussionMessages(animalId: number) {
    return this.http.get<any>(this.url + "/discussion", { params: { animalId: animalId } });
  }

   //查詢留言
   showReplyDiscussionMessages(animalId: number) {
    return this.http.get<any>(this.url + "/discussionReply", { params: { animalId: animalId } });
  }

}



