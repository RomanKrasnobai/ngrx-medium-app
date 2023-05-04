import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OnDestroyService} from '../../../shared/services/on-destroy.service';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
  providers: [OnDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagFeedComponent implements OnInit {
  apiUrl: string;
  tagName: string;

  constructor(
    @Inject(OnDestroyService) private destroy$: Observable<void>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: Params) => {
        this.tagName = params.slug;
        this.apiUrl = `/articles?tag=${params.slug}`;
      });
  }
}
