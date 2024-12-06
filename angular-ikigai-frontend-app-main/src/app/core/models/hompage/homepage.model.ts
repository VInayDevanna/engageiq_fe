export interface homepageTeamMembersResponse{
  empID: string;
  empName: string;
  empPicture: string;
  empDesignation: string;
  empOneToOneStatus: string;
}

export interface homepageTeamsResponse{
  teamID: string;
  teamName: string;
  teamSMName: string;
  ikigaiStatus: boolean;
  teamOneToOneStatus: string;
  teamOneToOneStatusSummary: string;
  totalTeamMembersCount: number;
  totalOnetoOneCompletedCount: number;
  teamMembersList: homepageTeamMembersResponse[];
  // subMenus: [];
}

export interface HomePageResponse{
  currentMonth: string;
  isValid: boolean;
  dataQueriedMonth: string;
  dataQueriedYear: number;
  remarks: string;
  teams: homepageTeamsResponse[];
}