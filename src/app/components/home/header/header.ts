import { Component, inject } from '@angular/core';
import { TabMenu } from "./tab-menu/tab-menu";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-header',
  imports: [TabMenu, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
