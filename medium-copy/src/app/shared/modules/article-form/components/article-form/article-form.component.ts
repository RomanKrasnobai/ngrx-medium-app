import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleInputInterface} from '../../../../types/article-input.interface';
import {BackendErrorsInterface} from '../../../../types/backend-errors.interface';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent implements OnInit {
  form: FormGroup;

  @Input('initValues') initValuesProps: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps: boolean;
  @Input('errors') errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent: EventEmitter<ArticleInputInterface> =
    new EventEmitter<ArticleInputInterface>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    this.articleSubmitEvent.emit(this.form.value);
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: this.initValuesProps.title,
      description: this.initValuesProps.description,
      body: this.initValuesProps.body,
      tagList: this.initValuesProps.tagList.join(' ')
    });
  }
}
