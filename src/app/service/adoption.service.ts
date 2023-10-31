import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  DecodedToken,
  MinimalistAnimalList,
  OneUser,
  RespUser,
  ReturnStatus,
  SubscriptionDetail,
  User,
  UserStatus,
  Users,
  actionStatus,
  animals,
  cityData,
  simpleAnimals,
  speciesData,
} from '../adpotion-model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AdoptionService {


  constructor(private http: HttpClient, private router: Router) { }

  /**
   * 搜尋前三名點擊的寵物資訊
   * @returns 裝有所有待送養的寵物list
   */
  onQueryRankCtr(): Observable<simpleAnimals> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = 'http://localhost:8080/adoptions/rankCtr';
    return this.http.get<simpleAnimals>(requestUrl, { headers });
  }

  //
  /**
   * 增加寵物點擊
   * @param animalId
   * @returns
   */
  onAddCtr(animalId: number): Observable<actionStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/adoptions/ctr?id=${animalId}`;
    return this.http.put<actionStatus>(requestUrl, null, { headers });
  }
  /**
   * 查詢全部寵物資料
   * @returns animals
   */
  onQueryAllAnimal(page: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = 'http://localhost:8080/adoptions';
    return this.http.get<animals>(requestUrl, { params: { page: page } });
  }

  /**
   * 透過寵物Idt查詢寵物細節資料
   * @returns animals
   */
  onQueryAnimalById(animalId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestUrl = `http://localhost:8080/adoptions?animalId=${animalId}`;
    return this.http.get<animals>(requestUrl, { headers });
  }

  /**
   * 有條件查詢寵物
   * @param cityId 城市
   * @param sex 性別
   * @param speciesId 寵物類別id
   * @returns animals
   */
  onQueryConditionalAnimal(cityId?: string, sex?: string, speciesId?: string, page?: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let queryParams = [];
    if (cityId) {
      queryParams.push(`cityId=${cityId}`);
    } else {
      queryParams.push(`cityId`);
    }
    if (sex) {
      queryParams.push(`sex=${sex}`);
    } else {
      queryParams.push(`sex`);
    }
    if (speciesId) {
      queryParams.push(`speciesId=${speciesId}`);
    } else {
      queryParams.push(`speciesId`);
    }
    queryParams.push(`page=${page}`);

    const queryString = queryParams.join('&');
    const requestUrl = `http://localhost:8080/adoptions?${queryString}`;
    console.log(requestUrl);
    return this.http.get<animals>(requestUrl, { headers });
  }
  /**
   * 找到所有城市
   * @returns 所有城市的list
   */
  onQueryAllCity() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = 'http://localhost:8080/comment/city';
    return this.http.get<cityData>(requestUrl, { headers });
  }

  /**
   * 找到所有品種
   * @returns 所有品種的list
   */
  onQueryAllSpecies() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const requestUrl = 'http://localhost:8080/comment/species';
    return this.http.get<speciesData>(requestUrl, { headers });
  }

  onQueryAllUser() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = 'http://localhost:8080/users';
    type ApiResponse = Users | ReturnStatus;
    return this.http.get<ApiResponse>(requestUrl, { headers });
  }
  onQueryUserByUserId(userId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users?userId=${userId}`;
    type ApiResponse = OneUser | ReturnStatus;
    return this.http.get<ApiResponse>(requestUrl, { headers });
  }
  onQueryUsersByGoogleAccount(googleAccount: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users?googleAccount=${googleAccount}`;
    type ApiResponse = Users | ReturnStatus;
    return this.http.get<ApiResponse>(requestUrl, { headers });
  }

  onPutUserStatusOn(userId: number) {
    const userStatus: UserStatus = {
      status: 'Y',
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users/status?userId=${userId}`;
    return this.http.put<actionStatus>(requestUrl, userStatus, { headers });
  }

  onPutUserStatusOff(userId: number) {
    const userStatus: UserStatus = {
      status: 'N',
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users/status?userId=${userId}`;
    return this.http.put<actionStatus>(requestUrl, userStatus, { headers });
  }

  onGetUserSubscription(userId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users/subscription?userId=${userId}`;
    type ApiResponse = MinimalistAnimalList | ReturnStatus;
    return this.http.get<ApiResponse>(requestUrl, { headers });
  }
  UserSubscription(userId: number, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users/subscription`;
    const userSubscription: SubscriptionDetail = {
      userId: userId,
      id: id,
    };
    return this.http.put<ReturnStatus>(requestUrl, userSubscription, {
      headers,
    });
  }
  UserUnsubscription(userId: number, id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestUrl = `http://localhost:8080/users/unsubscription`;
    const userSubscription: SubscriptionDetail = {
      userId: userId,
      id: id,
    };
    return this.http.put<ReturnStatus>(requestUrl, userSubscription, {
      headers,
    });


  }

  /**
   * 若任合需要登入的尚未使用的服務則使用該函數
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  decodeFormJwt(jwtToken: string) {
    try {
      return jwtDecode(jwtToken) as unknown as DecodedToken;
    } catch (Error) {
      return null;
    }
  }
  savaJwtwithStorge(jwtToken: string) {
    const decodedToken = this.decodeFormJwt(jwtToken);
    if (decodedToken) {
      localStorage.setItem('mail', decodedToken.sub);
      console.log(localStorage.getItem('mail'));
      localStorage.setItem('role', decodedToken.role);
      console.log(localStorage.getItem('role'));
      localStorage.setItem('userId', decodedToken.userId.toString());
      console.log(localStorage.getItem('userId'));
      localStorage.setItem('name', decodedToken.realname);
      console.log(localStorage.getItem('name'));
    }
  }
}

