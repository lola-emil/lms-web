import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('modalContent', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  isOpen = false;
  currentComponent?: ComponentRef<any>;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state;
    });

    this.modalService.modalComponent$.subscribe(component => {
      if (component) {
        this.loadComponent(component);
      } else {
        this.clearComponent();
      }
    });
  }

  loadComponent(component: any) {
    this.clearComponent();
    this.currentComponent = this.contentContainer.createComponent(component);
  }

  clearComponent() {
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    // this.contentContainer.clear();
  }

  closeModal() {
    this.modalService.close();
  }
}
