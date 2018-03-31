import { Injectable } from '@angular/core';
declare var GitGraph:any;

@Injectable()
export class ChartServiceService {
parties:any;
swimlanes:any = [];
 gitgraph:any;
    constructor() { 
    
  }
  public buildEventChart(sampleJson:any[]){
    let number = 0;
    this.gitgraph = new GitGraph();
    this.parties = Array.from(new Set(sampleJson.map(item => item.newHolderType)));
     console.log(this.parties);
    // this.swimlanes[0] = this.gitgraph.branch(this.parties[0]);

    // this.swimlanes[0] = this.gitgraph.branch(this.parties[0]);
    console.log(this.swimlanes[0]);
    sampleJson.forEach(element => {
      if(number == 0 ){
        console.log()
          this.swimlanes[0] = this.gitgraph.branch(element.personType);
      }else{
        console.log(element);
        if(element.personType == element.newHolderType){
        console.log(element.newHolderType);
        this.swimlanes[this.findSwimlaneNumber(element.personType)].commit();
        }else{
        // console.log("Test",this.findSwimlaneNumber(element.personType));
         this.swimlanes[1] = this.swimlanes[0].branch(element.newHolderType);
         this.swimlanes[0].branch("Test 2");
         
         console.log("Inside",this.swimlanes[0])
        }
      }
      number = number + 1;
    });
  }
  private markSwimlaneCreated(swimlaneNumber:number){
    
  }
  private findSwimlaneNumber(type:string){
       return this.parties.indexOf(type)
      // return 1;
  }
  public buildChart(){
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
