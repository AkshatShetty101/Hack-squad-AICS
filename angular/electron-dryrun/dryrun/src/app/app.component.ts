import { Component } from '@angular/core';

@Component({
  selector: 'dry-root',
  template: `
    <!--<h1> Testing CSS Grid </h1>
    <div class="container">
      <div class="content">
        A
      </div>
      <div class="content">
        B
      </div>
    </div>-->
    <body>
    
    <h1>Auto-placement</h1>
    <div class="grid autoFlowRow">
        <div class="rowauto-column1">row 1 x column 1</div>
        <div class="rowauto-column2">row 1 x column 2</div>
        <div class="rowauto-column3">row 1 x column 3</div>
        <div class="rowauto-column3">row 2 x column 3</div>
        <div class="rowauto-column1span2">row 2 x column 1-2</div>
        <div class="rowauto-column1">row 3 x column 1</div>
        <div class="rowauto-column2span2">row 3 x column 2-3</div>
        <div class="rowauto-column1span3">row 4 x column 1-3</div>
        <div>row 5 x column 1</div>
        <div>row 5 x column 2</div>
        <div>row 5 x column 3</div>
    </div>

    <br>

    <div class="grid autoFlowRow">
        <div class="row1-column1">row 1 x column 1</div>
        <div class="row1span2-columnauto">row 1-2 x column 2</div>
        <div class="row1-column3">row 1 x column 3</div>
        <div class="row2span2-columnauto">row 2-3 x column 1</div>
        <div>row 2 x column 3</div>
        <div>row 3 x column 2</div>
        <div>row 3 x column 3</div>
    </div>

    <br>

    <div class="grid autoFlowColumn">
        <div class="row1-columnauto">row 1 x column 1</div>
        <div class="row2-columnauto">row 2 x column 1</div>
        <div class="row3-columnauto">row 3 x column 1</div>
        <div class="row3-columnauto">row 3 x column 2</div>
        <div class="row1span2-columnauto">row 1-2 x column 2</div>
        <div class="row1-columnauto">row 1 x column 3</div>
        <div class="row2span2-columnauto">row 2-3 x column 3</div>
        <div class="row1span3-columnauto">row 1-3 x column 4</div>
        <div>row 1 x column 5</div>
        <div>row 2 x column 5</div>
        <div>row 3 x column 5</div>
    </div>

    <br>

    <div class="grid autoFlowColumn">
        <div class="row1-column1">row 1 x column 1</div>
        <div class="rowauto-column1span2">row 2 x column 1-2</div>
        <div class="row3-column1">row 3 x column 1</div>
        <div class="rowauto-column2span2">row 1 x column 2-3</div>
        <div>row 3 x column 2</div>
        <div>row 2 x column 3</div>
        <div>row 3 x column 3</div>
    </div>
  `,
  styles: [`
    /*.container {
      display: grid;
      grid-template-columns: auto auto;
    }

    .content {
      text-align: center;
      height: 50vh;
      border: 5px solid blue;
    }*/
    
    h1 {
      text-align: center;
    }
    
    .grid {
      display: -ms-grid;
      display: grid;
      background-color: #DDD;
    }
  
    .grid > :nth-child(1) {
        background-color: #FCC;
    }
    
    .grid > :nth-child(2) {
        background-color: #CFC;
    }
    
    .grid > :nth-child(3) {
        background-color: #CCF;
    }
    
    .grid > :nth-child(4) {
        background-color: #C99;
    }
    
    .grid > :nth-child(5) {
        background-color: #9C9;
    }
    
    .grid > :nth-child(6) {
        background-color: #99C;
    }
    
    .grid > :nth-child(7) {
        background-color: #FFC;
    }
    
    .grid > :nth-child(8) {
        background-color: #FCF;
    }
    
    .grid > :nth-child(9) {
        background-color: #CFF;
    }
    
    .grid > :nth-child(10) {
        background-color: #CC9;
    }
    
    .grid > :nth-child(11) {
        background-color: #C9C;
    }
    
    .grid > :nth-child(12) {
        background-color: #9CC;
    }
    
    .row1-column1 {
        -ms-grid-row: 1;
        grid-row: 1;
        -ms-grid-column: 1;
        grid-column: 1;
    }
    
    .row1-column2 {
        -ms-grid-row: 1;
        grid-row: 1;
        -ms-grid-column: 2;
        grid-column: 2;
    }
    
    .row1-column3 {
        -ms-grid-row: 1;
        grid-row: 1;
        -ms-grid-column: 3;
        grid-column: 3;
    }
    
    .row1-column4 {
        -ms-grid-row: 1;
        grid-row: 1;
        -ms-grid-column: 4;
        grid-column: 4;
    }
    
    .row2-column1 {
        -ms-grid-row: 2;
        grid-row: 2;
        -ms-grid-column: 1;
        grid-column: 1;
    }
    
    .row2-column2 {
        -ms-grid-row: 2;
        grid-row: 2;
        -ms-grid-column: 2;
        grid-column: 2;
    }
    
    .row2-column3 {
        -ms-grid-row: 2;
        grid-row: 2;
        -ms-grid-column: 3;
        grid-column: 3;
    }
    
    .row2-column4 {
        -ms-grid-row: 2;
        grid-row: 2;
        -ms-grid-column: 4;
        grid-column: 4;
    }
    
    .row3-column1 {
        -ms-grid-row: 3;
        grid-row: 3;
        -ms-grid-column: 1;
        grid-column: 1;
    }
    
    .row3-column2 {
        -ms-grid-row: 3;
        grid-row: 3;
        -ms-grid-column: 2;
        grid-column: 2;
    }
    
    .row3-column3 {
        -ms-grid-row: 3;
        grid-row: 3;
        -ms-grid-column: 3;
        grid-column: 3;
    }
    
    .row1-columnauto {
        -ms-grid-row: 1;
        grid-row: 1;
    }
    
    .row2-columnauto {
        -ms-grid-row: 2;
        grid-row: 2;
    }
    
    .row3-columnauto {
        -ms-grid-row: 3;
        grid-row: 3;
    }
    
    .rowauto-column1 {
        -ms-grid-column: 1;
        grid-column: 1;
    }
    
    .rowauto-column2 {
        -ms-grid-column: 2;
        grid-column: 2;
    }
    
    .rowauto-column3 {
        -ms-grid-column: 3;
        grid-column: 3;
    }
    
    .autoFlowRow {
        grid-auto-flow: row;
    }
    
    .autoFlowColumn {
        grid-auto-flow: column;
    }
    
    .verticalRL {
        -webkit-writing-mode: vertical-rl;
    }
    
    .verticalLR {
        -webkit-writing-mode: vertical-lr;
    }
    
    .horizontalBT {
        -webkit-writing-mode: horizontal-bt;
    }
    
    .directionRTL {
        direction: rtl;
    }
    
    .directionLTR {
        direction: ltr;
    }
  
  `]
})
export class AppComponent {
  title = 'dry';
}
