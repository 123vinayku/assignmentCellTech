import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public forms = [
    { name: 'Abc', fieldsCount: 2, id: 1 },
    { name: 'Wxz', fieldsCount: 12, id: 2 },
    { name: 'Mno', fieldsCount: 20, id: 3 },
  ];

  constructor(public modalService: NgbModal) {}

  async onDelete() {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      centered: true,
      backdrop: true,
    });
    modalRef.componentInstance.message = 'Do you want to delete this form ?';
    const result = await modalRef.result;
    console.log(result);
  }
}
