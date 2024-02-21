import { Component } from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faDashboard,faLocation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  faDashboard = faDashboard;


}
