import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
declare var GitGraph: any;

@Injectable()
export class ChartServiceService {
  parties: any;
  swimlanes: any = [];
  gitgraph: any;
  constructor(
    private snackBar: MatSnackBar

  ) {

  }
  public templateCreator(){
    return  {
    colors: ["#979797", "#008fb5", "#f1c109"],
    branch: {
      lineWidth: 10,
      spacingX: 50,
      labelRotation: 0
    },
    commit: {
      spacingY: -80,
      dot: {
        size: 14
      },
      message: {
        displayAuthor: false,
        displayBranch: true,
        displayHash: false,
        font: "normal 12pt Arial"
      }
    }
  };
  }
  public buildEventChart(sampleJson: any[]) {
    let number = 0;
    console.log(this.templateCreator());
    let template = new GitGraph.Template(this.templateCreator());
    this.gitgraph = new GitGraph({template:template});
    console.log(this.gitgraph);
    this.parties = Array.from(new Set(sampleJson.map(item => item.newHolderType)));

    sampleJson.forEach(element => {
      if (number == 0) {
        this.swimlanes[0] = this.gitgraph.branch(element.personType);
        this.swimlanes[0].commit({
          message:element.type,
          author:" ",
          onClick: function(commit) {
            this.snackBar.open(element.type);
          }
        });
      } else {
        let personSwimlaneNumber = this.findSwimlaneNumber(element.personType);
        let newPersonSwimlaneNumber = this.findSwimlaneNumber(element.newHolderType);
       
        if (element.personType == element.newHolderType) {
          this.swimlanes[personSwimlaneNumber].commit(element.type);
        } else if (newPersonSwimlaneNumber > personSwimlaneNumber) {
          this.swimlanes[newPersonSwimlaneNumber] = this.swimlanes[personSwimlaneNumber].branch(element.newHolderType);
          this.swimlanes[newPersonSwimlaneNumber].commit(element.type);
        }
        else if (newPersonSwimlaneNumber < personSwimlaneNumber) {
          this.swimlanes[personSwimlaneNumber].merge(this.swimlanes[newPersonSwimlaneNumber])
        }
      }
      number = number + 1;
    });
  }
  private markSwimlaneCreated(swimlaneNumber: number) {

  }
  private findSwimlaneNumber(type: string) {
    return this.parties.indexOf(type)
    // return 1;
  }
  public buildChart() {
    this.gitgraph = new GitGraph();
    let master = this.gitgraph.branch("master");
    master.commit("Testing");
    let branch = master.branch("branch");
    branch.commit("Testing");
    branch.merge(master);
    let branch2 = master.branch("Reassigned");
    master.commit("Double");
    branch2.commit("Abc");

  }
}
