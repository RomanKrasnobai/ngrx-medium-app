import {ValidationErrors} from '@angular/forms';

export interface SettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: ValidationErrors | null;
}
