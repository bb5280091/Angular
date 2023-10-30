import { Timestamp } from "rxjs";

export interface PetFormModel {
  id: number | null,
  name: string | null,
  species: string | null,
  city: string | null,
  type: string | null,
  size: string | null,
  color: string | null,
  age: string | null,
  sex: string | null,
  ligation: string | null,
  introduction: string | null,
  photo: string | null,
  conditionAffidavit: string | null,
  conditionFollowUp: string | null,
  conditionAgeLimit: string | null,
  postStatus: string | null,
  conditionParentalPermission: string | null,
  publishDate: string | null|String,
  userId: number | null,
}
