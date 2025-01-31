import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, NgbModalModule],
  exports: [NgbModalModule, ConfirmationComponent],
  providers: [StorageService],
})
export class SharedModule {}
