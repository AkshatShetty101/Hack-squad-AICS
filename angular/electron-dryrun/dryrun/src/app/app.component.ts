import { Component } from '@angular/core';

@Component({
  selector: 'dry-root',
  template: `
    <h1> Testing CSS Grid </h1>
    <div class="container">
      <div class="content">
        A
      </div>
      <div class="content">
        B
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: grid;
      grid-template-columns: auto auto;
    }

    .content {
      text-align: center;
      height: 50vh;
      border: 5px solid blue;
    }
  `]
})
export class AppComponent {
  title = 'dry';
}
