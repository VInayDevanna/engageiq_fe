import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HomePageResponse, homepageTeamsResponse } from '../../../core/models/hompage/homepage.model';
import { HomePageService } from '../../../domain/use-cases/homepage/homepge.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  homepageData: HomePageResponse = {} as HomePageResponse;

  // constructor(private getHomePageDataService: getHomePageDataService) { }


  //Inject Usecase to call the api
  private homePageService = inject(HomePageService);
  private destroyRef = inject(DestroyRef);
  ErrorMessage = '';
  // Initializing the Signal with an initial menu list 
  TeamsStatisticData = signal<homepageTeamsResponse[]>([]);

  ngOnInit(): void {

    //call Homepage Service  
    this.homePageService.GetHomePageData({
      Page: '',//1
      PageSize: '',//50
      TeamID: '',//1
      Month: '',//1
      Year: '',//2024
      OneToOneStatus: '',
    })
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {

          if (response.isValid) {
            // Set the signal with the fetched navigation data
            this.TeamsStatisticData.set(response.teams);
            console.log(response);
          }
          else {
            // Handle the failure response here
            this.ErrorMessage = response.remarks
          }
        },
        error: (error) => {
          // Handle any errors here
          if (error.status === 401) {
            this.ErrorMessage = "Unauthorized access - 401";
            // Handle 401 Unauthorized error
          } else if (error.status === 404) {
            this.ErrorMessage = "Resource not found - 404";
            // Handle 404 Not Found error
          } else if (error.status === 400) {
            this.ErrorMessage = "Bad request - 400";
            // Handle 400 Bad Request error
          } else {
            this.ErrorMessage = "An unexpected error occurred: " + error;
            // Handle other types of errors
          }
        },
      });
    //hide  loading
    //this.isloading = false;  
  }
}
