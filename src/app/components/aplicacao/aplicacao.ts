import { Component, effect, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from '../../services/sidenav-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavitemsInterface } from '../../interfaces/sidenavitems-interface';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-aplicacao',
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatSlideToggleModule, RouterLink, RouterOutlet, RouterLinkActive, MatMenuModule],
  templateUrl: './aplicacao.html',
  styleUrl: './aplicacao.scss',
})
export class Aplicacao {
  sidenavserv: SidenavService = inject(SidenavService);
  logo: string = 'logo.png';
  auth = inject(AuthService);

  sidenavitems: SidenavitemsInterface[] = [];
  
  isDark = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    this.sidenavitems = this.sidenavserv.getAll();
    // Carrega preferência do usuário
    const saved = localStorage.getItem('dark-mode');
    if (saved === 'true') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark-theme');
      this.logo = "logo_branco.png"
    }

    // Sempre salva quando muda
    effect(() => {
      localStorage.setItem('dark-mode', this.isDark().toString());
    });

    const token = this.authService.getToken();
    if(token){
      this.authService.fetchUser(token);
    }
  }

  toggleDarkMode() {
    this.isDark.update(v => !v);

    if (this.isDark()) {
      document.documentElement.classList.add('dark-theme');
      this.logo = "logo_branco.png";
    } else {
      document.documentElement.classList.remove('dark-theme');
      this.logo = "logo.png";
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
