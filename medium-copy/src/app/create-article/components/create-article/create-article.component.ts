import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/article-input.interface';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {select, Store} from '@ngrx/store';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {createArticleAction} from '../../store/actions/create-action.actions';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  initValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
