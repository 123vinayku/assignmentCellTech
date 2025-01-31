import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  onDismiss() {
    this.activeModal.dismiss('Cross click');
  }

  onConfirm() {
    this.activeModal.close('YES');
  }

  onClose() {
    this.activeModal.close('NO');
  }
}
