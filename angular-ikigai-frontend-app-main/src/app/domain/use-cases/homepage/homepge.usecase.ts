import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { ApiNames, HttpMethod } from "../../../Shared/sharedclasses";
import { HomePageResponse } from "../../../core/models/hompage/homepage.model";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HomePageService {

    private apiService = inject(ApiService);

    GetHomePageData(paramsObj: Record<string, string> = {}) {   
     // Convert the params object into HttpParams
     const params = Object.keys(paramsObj).reduce(
        (httpParams, key) => httpParams.set(key, paramsObj[key]),
        new HttpParams()
      );
        return this.apiService.callApi<HomePageResponse>(ApiNames.GetTeamStatistics, HttpMethod.GET,undefined,undefined,params);
    }
}
