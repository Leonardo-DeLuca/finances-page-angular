import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tab-menu',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './tab-menu.html',
  styleUrl: './tab-menu.scss'
})
export class TabMenu {

}
