import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  editProfile() {
    console.log('Edit Profile button clicked');
  }
  submitProfile(form: NgForm) {
    if (form.valid) {
      console.log('Profile Data:', form.value);
    }
  }
}
