import { Injectable } from '@angular/core';
import { SidenavitemsInterface } from '../interfaces/sidenavitems-interface';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private itemList: SidenavitemsInterface[] = [
    {title: "Dashboard", icon: "dashboard", route: 'dashboard'},
    {title: "Invoices", icon: "request_page", route: 'invoices'},
    {title: "My Wallet", icon: "wallet", route: 'wallet'},
    {title: "Activity", icon: "analytics", route: 'activity'},
    {title: "Reports", icon: "monitoring", route: 'reports'},
    {title: "Settings", icon: "settings", preferences: true, route: 'settings'},
    {title: "Help Center", icon: "help", preferences: true, route: 'help'},
  ]

  getAll(){
    return this.itemList;
  }
}
