import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  providers: [ MenuService ]
})
export class HorizontalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId;
  public menuItems: Array<Menu>;
  constructor(public menuService: MenuService, public userService: UserService) { }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId); 
  }

}
