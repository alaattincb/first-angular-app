import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Kullanıcının giriş yapıp yapmadığını kontrol et
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Yönlendirme URL'sini kontrol et ve uygun yönlendirmeyi yap
      const redirectUrl = state.url === '/chat' ? '/chat-login' : '/login';
      this.router.navigate([redirectUrl]);
      return false;
    }
  }
}
