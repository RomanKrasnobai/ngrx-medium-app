import {BackendErrorsInterface} from '../../shared/types/backend-errors.interface';
import {ArticleInterface} from '../../shared/types/article.interface';

export interface EditArticleStateInterface {
  isLoading: boolean;
  isSubmitting: boolean;
  article: ArticleInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
