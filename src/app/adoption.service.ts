import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { actionStatus, animals, cityData, simpleAnimals, speciesData } from './adpotion-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) { }


  /**
   * 搜尋前三名點擊的寵物資訊
   * @returns 裝有所有待送養的寵物list
   */
  onQueryRankCtr(): Observable<simpleAnimals> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const RequestUrl = 'http://localhost:8080/adoptions/rankCtr'
    return this.http.get<simpleAnimals>(RequestUrl, { headers });
  }

  //
  /**
   * 增加寵物點擊
   * @param userId
   * @returns
   */
  onAddCtr(userId: number): Observable<actionStatus> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const RequestUrl = `http://localhost:8080/adoptions/ctr?id=${userId}`
    return this.http.put<actionStatus>(RequestUrl, null, { headers });
  }
  /**
   * 查詢全部寵物資料
   * @returns animals
   */
  onQueryAllanimal() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const RequestUrl = 'http://localhost:8080/adoptions'
    return this.http.get<animals>(RequestUrl, { headers });
  }

  /**
 * 有條件查詢寵物
 * @param cityId 城市
 * @param sex 性別
 * @param speciesId 寵物類別id
 * @returns animals
 */
  onQueryConditionalAnimal(cityId?: string, sex?: string, speciesId?: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let queryParams = [];
    if (cityId) queryParams.push(`cityId=${cityId}`);
    if (sex) queryParams.push(`sex=${sex}`);
    if (speciesId) queryParams.push(`speciesId=${speciesId}`);

    const queryString = queryParams.join('&');
    const RequestUrl = `http://localhost:8080/adoptions?${queryString}`;
    return this.http.get<animals>(RequestUrl, { headers });
  }
  /**
   * 找到所有城市
   * @returns 所有城市的list
   */
  onQueryAllCity() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const RequestUrl = 'http://localhost:8080/comment/city'
    return this.http.get<cityData>(RequestUrl, { headers });
  }

  /**
   * 找到所有品種
   * @returns 所有品種的list
   */
  onQueryAllSpecies() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const RequestUrl = 'http://localhost:8080/comment/species'
    return this.http.get<speciesData>(RequestUrl, { headers });
  }
}
