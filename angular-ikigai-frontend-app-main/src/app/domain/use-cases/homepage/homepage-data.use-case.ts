import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HomepageDataResponse } from "../../../data/responses/hompage/homepage-data.response";
import { HomePageResponse } from "../../../core/models/hompage/homepage.model";

@Injectable({
  providedIn: 'root'
})
export class getHomePageDataService {
  execute(): HomePageResponse {
    return HomepageDataResponse;
  }
}