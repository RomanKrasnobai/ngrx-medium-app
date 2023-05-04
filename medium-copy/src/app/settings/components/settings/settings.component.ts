import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {CurrentUserInterface} from '../../../shared/types/current-user.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {OnDestroyService} from '../../../shared/services/on-destroy.service';
import {Observable} from 'rxjs';
import {currentUserSelector} from '../../../auth/store/selectors';
import {filter, takeUntil} from 'rxjs/operators';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {updateCurrentUserAction} from '../../../auth/store/actions/update-current-user.actions';
import {CurrentUserInputInterface} from '../../../shared/types/current-user-input.interface';
import {logoutAction} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  isSubmitting$: Observable<boolean>;
  errors$: Observable<BackendErrorsInterface | null>;

  currentUser: CurrentUserInterface;

  form: FormGroup;

  constructor(
    @Inject(OnDestroyService) private destroy$: Observable<void>,
    private fb: FormBuilder,
    private store: Store,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
  }

  submit(): void {
    const currentUser: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput: currentUser }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  private initListeners(): void {
    this.store.pipe(
      select(currentUserSelector),
      filter(Boolean),
      takeUntil(this.destroy$)
    ).subscribe((currentUser: CurrentUserInterface) => {
      this.currentUser = currentUser;
      this.initForm();

      this.cd.detectChanges();
    });
  }

  private initValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    });
  }
}
