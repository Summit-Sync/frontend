import { CategoryPriceDTO } from "../price/CategoryPriceDTO";
import { PostCategoryPriceDTO } from "../price/PostCategoryPriceDTO";

export interface PostCourseTemplateDTO{
  acronym:string,
  title:string,
  description:string,
  numberOfDates:number,
  duration:number,
  numberParticipants:number,
  numberWaitlist:number,
  location:number,
  meetingPoint:string,
  price: PostCategoryPriceDTO[],
  requiredQualifications:number[],
  numberTrainers:number,
}
