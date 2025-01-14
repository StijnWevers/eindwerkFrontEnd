import { Component } from '@angular/core';
import { UserContainerComponent } from "../../user-container/user-container.component";


@Component({
  selector: 'app-home',
  imports: [UserContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
