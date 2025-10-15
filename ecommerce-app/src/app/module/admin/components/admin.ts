import { Component } from '@angular/core';
import { AdminRoutingModule } from "../admin-routing-module";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone:true,
  imports: [AdminRoutingModule, RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

}
