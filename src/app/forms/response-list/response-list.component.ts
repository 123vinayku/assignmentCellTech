import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { FormStorageKeys, IForm, IResponse } from 'src/app/form-design/types';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss'],
})
export class ResponseListComponent implements OnInit, OnDestroy {
  public responses: Array<IResponse> = [];
  public formDetails!: IForm;
  public formId!: number;
  public alive = true;

  constructor(
    public router: Router,
    public storageService: StorageService,
    public activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(takeWhile((_) => this.alive))
      .subscribe((res: any) => {
        this.formId = Number(res.formId ?? 0);
      });
    this.getFormDetails();
    this.getResponses();
  }

  getFormDetails() {
    if (this.formId) {
      const data = this.storageService.getData(FormStorageKeys.FORMS);
      this.formDetails = data.find((e: IForm) => e.id === this.formId) ?? null;
    }
  }

  getResponses() {
    const data = this.storageService.getData(FormStorageKeys.RESPONSES);
    this.responses = data.filter((e: IResponse) => e.formId === this.formId);
  }

  onView(response: IResponse) {
    this.router.navigate([
      'form-design/form/view/',
      response.formId,
      response.id,
    ]);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
