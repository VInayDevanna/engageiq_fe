import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavMenu, NavTeamIndividualResponse } from '../../../core/models/navigation/navigation.model';
import { NavTeamResponse } from '../../../core/models/navigation/navigation.model';
import { MsalService } from '@azure/msal-angular';
import { NavigationService } from '../../../domain/use-cases/navigation/navigation.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule, RouterModule, CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {



  //Inject Usecase to call the api
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  ErrorMessage = '';
  // Initializing the Signal with an initial menu list 
  sideNavMenus = signal<NavMenu[]>([]);
  sidenavTeamsLinks = signal<NavTeamIndividualResponse[]>([]);//signal<NavTeamResponse = {} as NavTeamResponse;

  constructor(private authService: MsalService,
  ) { }

  ngOnInit(): void {
    //call Navigation Menu Service  
    this.navigationService.GetNavigationMenusBasedOnUser()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {

          if (response.isValid) {
            // Set the signal with the fetched navigation data
            this.sideNavMenus.set(response.menuList);
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

    //call Teams Menu Service  
    this.navigationService.GetTeamsAndChildMenusBasedOnUser()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {

          if (response.isValid) {
            // Set the signal with the fetched team data
            this.sidenavTeamsLinks.set(response.teams);
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

  logoutFunction = () => {

    this.authService.logoutRedirect();

  }
}