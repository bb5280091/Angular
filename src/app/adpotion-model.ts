
//comment to use

//新增異動刪除狀態碼(成功status code 為'0000')
export interface actionStatus {
  statusCode: null | string;
  status: null | string;
}

//SimpleAnimal
export interface simpleAnimal {
  id: number;
  name: string;
  speciesName: string;
  sex: string;
  cityName: string;
  conditionAffidavit: string;
  conditionFollowup: string;
  conditionAgeLimit: string;
  conditionParentalPermission: string;
  introduction: string;
  photo: string;
}

//animal
export interface animal {
  id: number;
  name: string;
  species: string;
  type: string;
  sex: string;
  size: string;
  color: string;
  age: string;
  ligation: string;
  city: string;
  conditionAffidavit: string;
  conditionFollowup: string;
  conditionAgeLimit: string;
  conditionParentalPermission: string;
  introduction: string;
  photo: string;
  userId: number;
}

// species
export interface species {
  speciesId: string;
  speciesName: string;
}

//city
export interface city {
  cityId: string;
  cityName: string;
}

//Event

/**
 * get adptions/rankCtr Resp
 */
export interface simpleAnimals {
  animal: simpleAnimal[];
}

/**
 * get /comment/species
 */
export interface speciesData {

  data: species[];
}

export interface cityData {
  data: city[];
}


//User

/**
 * get adptions/adoptions Resp
 */
export interface animals {
  response: animal[];
}


//JWT自訂

export interface User{
  sub: string;
  role: string;
  exp: number;
  userId: number;
  iat: number;
  realname: string;
}

export interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
  userId: number;
  iat: number;
  realname: string;
}
