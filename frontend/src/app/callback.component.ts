import * as Auth0 from 'auth0-web';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  template: `
  <div *ngIf="!authenticated">Loading authentication details...</div>
  `
})
export class CallbackComponent implements OnInit {
  authenticated = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const self = this;
    Auth0.handleAuthCallback(err => {
      if (err) {
        console.error(err);
        alert(err);
      }
      this.authenticated = true;
      // console.log(`Bearer ${Auth0.getAccessToken()}`);
      self.router.navigate(['/']);
    });
  }
}
