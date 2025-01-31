import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormStorageKeys, IForm } from 'src/app/form-design/types';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public forms: Array<IForm> = [];

  constructor(
    public modalService: NgbModal,
    public router: Router,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getForms();
  }

  getForms() {
    this.forms = this.storageService.getData(FormStorageKeys.FORMS);
  }

  async onDelete(form: IForm) {
    const modalRef = this.modalService.open(ConfirmationComponent, {
      centered: true,
      backdrop: true,
    });
    modalRef.componentInstance.message = 'Do you want to delete this form ?';
    const result = await modalRef.result;
    console.log(result);
    if (result === 'YES') {
      const forms = this.forms.filter((e: IForm) => e.id !== form.id);
      this.storageService.setData(FormStorageKeys.FORMS, JSON.stringify(forms));
      this.getForms();
    }
  }

  onCreate() {
    this.router.navigate(['form-design']);
  }

  onEdit(form: IForm) {
    this.router.navigate(['form-design/edit/', form.id]);
  }

  onOpen(form: IForm) {
    this.router.navigate(['form-design/form/', form.id]);
  }

  onOpenResponses(form: IForm) {
    this.router.navigate(['forms/responses/', form.id]);
  }
}
