import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  showToast(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): void {
    const toastContainer = this.renderer.createElement('div');
    this.renderer.addClass(toastContainer, 'toast');
    this.renderer.addClass(toastContainer, 'toast-bottom');
    this.renderer.addClass(toastContainer, 'toast-end');

    const alertDiv = this.renderer.createElement('div');
    this.renderer.addClass(alertDiv, 'alert');

    switch (type) {
      case 'info':
        this.renderer.addClass(alertDiv, 'alert-info');
        break;
      case 'success':
        this.renderer.addClass(alertDiv, 'alert-success');
        break;
      case 'warning':
        this.renderer.addClass(alertDiv, 'alert-warning');
        break;
      case 'error':
        this.renderer.addClass(alertDiv, 'alert-error');
        break;
      default:
        break;
    }

    const messageSpan = this.renderer.createElement('span');
    const text = this.renderer.createText(message);
    this.renderer.appendChild(messageSpan, text);
    this.renderer.appendChild(alertDiv, messageSpan);
    this.renderer.appendChild(toastContainer, alertDiv);

    document.body.appendChild(toastContainer);

    setTimeout(() => {
      this.renderer.removeChild(document.body, toastContainer);
    }, 5000);
  }
}
