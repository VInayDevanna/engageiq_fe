import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { ikigaiIndividualResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { ikigaiIndividualTeamsResponse } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { getIkigaiIndividualDataService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';
@Component({
  selector: 'app-ikigai-teams',
  standalone: true,
  imports: [ MatIconModule, MatChipsModule, MatTableModule, MatSelect, MatOption, CommonModule ],
  templateUrl: './ikigai-teams.component.html',
  styleUrl: './ikigai-teams.component.scss'
})
export class IkigaiTeamsComponent {
  public goingGood: string = 
`1. Handling PR Reviews, giving good feedbacks and communication with other team members.
2. Helping peers on queries, pairing with them.
3. Scaling up good in terms of Tech lead role; e.g taking care of tasks, assigning to relevant members, proper follow up and helping them with solutions`;

  public KeyImprovementsMustHave: string = `1. Identyfing Global Impact based on changes and validate/share necessary info with Team members/QA.`

  public KeyImprovementsGoodToHave: string = 
`1. Delegating task to team members, helping them to scale.
2. Plan and Complete certifications.
3. Complete Key Results for all the Objectives within the quarter.`

displayedColumns: string[] = ['actions', 'category', 'addedOn', 'status', 'actionsDropdown'];
dataSource = [
  { actions: 'Dummy', category: 'Must Have', addedOn: 'Sept, 2024', status: 'New' },
  { actions: 'Dummy', category: 'Must Have', addedOn: 'Aug, 2024', status: 'Good' },
  {
    actions: 'Turning on video cams (external meetings/meetings with stakeholders), joining meeting in time',
    category: 'Good Have',
    addedOn: 'July, 2024',
    status: 'Satisfactory'
  },
  { actions: 'Dummy', category: 'Good Have', addedOn: 'Aug, 2024', status: 'New' },
  { actions: 'Dummy', category: 'Good Have', addedOn: 'July, 2024', status: 'Unsatisfactory' }
];
actionOptions = ['Select', 'Option 1', 'Option 2'];

  headerEdit: boolean = false;
  goingGoodDisabled: boolean = true;
  KeyImprovementsDisabled: boolean = true;
  ikigaiTeamData: ikigaiIndividualResponse = {} as ikigaiIndividualResponse;
  ikigaiIndividualTeams: ikigaiIndividualTeamsResponse = {} as ikigaiIndividualTeamsResponse;

  constructor(private getIkigaiIndividualDataService: getIkigaiIndividualDataService) {}

  ngOnInit(): void {
    this.ikigaiTeamData = this.getIkigaiIndividualDataService.execute();
    console.log("IKIGAI Team Data",this.ikigaiTeamData);
    this.ikigaiIndividualTeams = this.ikigaiTeamData.teams[1];
    console.log("IKIGAI Individual Teams",this.ikigaiIndividualTeams);
  }

  handleGoingGood() {
    this.headerEdit = !this.headerEdit;
    this.goingGoodDisabled = !this.goingGoodDisabled;
  }

  handleKeyImprovements() {
    this.headerEdit = !this.headerEdit;
    this.KeyImprovementsDisabled = !this.KeyImprovementsDisabled;
  }

}
