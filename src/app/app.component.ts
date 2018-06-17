import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav></mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Auth0 NgRx</span>
          <span class="spacer"></span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class AppComponent {
  constructor() {}
}
