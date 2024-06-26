import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  faqs: FAQ[] = [
    {
      question: 'How can I track my order?',
      answer:
        'You can track your order by logging into your account and visiting the "Order History" section. There, you\'ll find real-time updates on your package\'s status and location.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Please visit our Returns page for more detailed information and to initiate a return.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can check if we ship to your country during the checkout process.',
    },
    {
      question: 'How can I change or cancel my order?',
      answer:
        "If you need to change or cancel your order, please contact our customer service team as soon as possible. We'll do our best to accommodate your request, but please note that once an order has been shipped, it cannot be changed or cancelled.",
    },
    {
      question: 'Do you offer gift wrapping?',
      answer:
        "Yes, we offer gift wrapping services for a small additional fee. You can select this option during the checkout process. We'll beautifully wrap your item and include a gift message of your choice.",
    },
  ];

  submitForm() {
    // Here you would typically send the form data to your backend
    console.log('Form submitted', {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
    });
    // Reset form after submission
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    // You might want to show a success message to the user here
  }
}
