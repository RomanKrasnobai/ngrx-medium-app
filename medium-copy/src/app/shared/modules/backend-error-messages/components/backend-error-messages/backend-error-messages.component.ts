import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../../../../types/backend-errors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorMessagesComponent implements OnInit {
  errorMessages: string[];

  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map((name: string) => {
      const messages = this.backendErrorsProps[name].join(', ');
      return `${name} ${messages}`;
    });
  }

}
