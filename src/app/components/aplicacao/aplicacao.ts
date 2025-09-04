import { Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from '../../services/sidenav-service';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavitemsInterface } from '../../interfaces/sidenavitems-interface';


@Component({
  selector: 'app-aplicacao',
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatSlideToggleModule, RouterLink, RouterOutlet, RouterLinkActive, MatMenuModule],
  templateUrl: './aplicacao.html',
  styleUrl: './aplicacao.scss',
})
export class Aplicacao {
  sidenavserv: SidenavService = inject(SidenavService);
  logo: string = 'logo.png'

  sidenavitems: SidenavitemsInterface[] = [];
  
  isDark = signal(false);

  constructor() {
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
}
