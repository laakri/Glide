import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-settings.component.html',
})
export class DeliverySettingsComponent {
  showForm: boolean = false;
  currentStep: number = 1;

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.reset();
    }
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  reset() {
    this.currentStep = 1;
    this.showForm = false;
  }
}
