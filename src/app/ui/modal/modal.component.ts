import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  componentToRender: Type<any> | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private modalService: ModalService) { }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.modalService.isOpen$.subscribe((isOpen) => {
        const dialog = this.modalRef.nativeElement;

        if (isOpen)
          dialog.showModal();
        else
          dialog.close();
      }),
      this.modalService.component$.subscribe((component) => {
        this.componentToRender = component;
      })
    );
  }

  closeModal() {
    this.modalService.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
