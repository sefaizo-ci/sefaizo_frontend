import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    
    this.router.navigate(['/auth/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    if (this.authService.isClient()) {
      return true;
    }
    
    const role = this.authService.userRole();
    if (role === 'PRO') {
      this.router.navigate(['/espace-pro']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
    
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    if (this.authService.isPro()) {
      return true;
    }
    
    const role = this.authService.userRole();
    if (role === 'CLIENT') {
      this.router.navigate(['/espace-client']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
    
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    if (this.authService.isAdmin()) {
      return true;
    }
    
    const role = this.authService.userRole();
    if (role === 'CLIENT') {
      this.router.navigate(['/espace-client']);
    } else if (role === 'PRO') {
      this.router.navigate(['/espace-pro']);
    } else {
      this.router.navigate(['/']);
    }
    
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    
    const role = this.authService.userRole();
    if (role === 'CLIENT') {
      this.router.navigate(['/espace-client']);
    } else if (role === 'PRO') {
      this.router.navigate(['/espace-pro']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
    
    return false;
  }
}
