import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IkigaiIndividualDataResponse } from '../../../data/responses/ikigaiIndividuals/ikigaiIndividual-data.response';
import { ikigaiIndividualResponse } from "../../../core/models/ikigai-individual/ikigaiIndividual.model"

@Injectable({
  providedIn: 'root'
})
export class getIkigaiIndividualDataService {
  execute(): ikigaiIndividualResponse {
    return IkigaiIndividualDataResponse;
  }
}