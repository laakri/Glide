import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './adminpanel.component.html',
})
export class AdminPanelComponent {}
