import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, NgbModalModule],
  exports: [NgbModalModule, ConfirmationComponent],
})
export class SharedModule {}
