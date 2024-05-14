import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ToastService} from "../../../services/toast/toast.service";
import {ToastEvent} from "../../../models/toast/toastEvent";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{
  currentToasts: ToastEvent[] = [];
  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toasts) => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message
      };
      this.currentToasts.push(currentToast);
      setTimeout(() => {
        this.removeToast(0);
      }, 2500)
      this.cdr.detectChanges();
    });
  }

  removeToast(index: number){
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }

}
