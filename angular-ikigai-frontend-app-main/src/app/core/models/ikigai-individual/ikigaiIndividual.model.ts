export interface ikigaiIndividualFeedbackResponse{
  goingGood: string;
  needImprovement: string;
}

export interface ikigaiIndividualTeamMembersResponse{
  empID: string;
  empName: string;
  empPicture: string;
  empDesignation: string;
  empOneToOneStatus: string;
}

export interface ikigaiIndividualTeamsResponse{
  teamID: string;
  teamName: string;
  teamSMName: string;
  ikigaiStatus: boolean;
  teamOneToOneStatus: string;
  teamOneToOneStatusSummary: string;
  totalTeamMembersCount: number;
  totalOnetoOneCompletedCount: number;
  teamMembersList: ikigaiIndividualTeamMembersResponse[];
  // subMenus: [];
}

export interface ikigaiIndividualResponse{
  currentMonth: string;
  isValid: boolean;
  dataQueriedMonth: string;
  dataQueriedYear: number;
  remarks: string;
  teams: ikigaiIndividualTeamsResponse[];
}