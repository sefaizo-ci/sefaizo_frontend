import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * @deprecated This component now redirects to the role selection page.
 * Use /auth/register/client or /auth/register/pro instead.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: '',
  styles: []
})
export class RegisterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirect to role selection page
    this.router.navigate(['/auth/register'], { replaceUrl: true });
  }
}
