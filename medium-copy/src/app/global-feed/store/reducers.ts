import {FeedStateInterface} from '../types/feed-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from './actions/get-feed.actions';
import {routerNavigatedAction} from '@ngrx/router-store';

const initState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

const feedReducer = createReducer(
  initState,
  on(getFeedAction, (state): FeedStateInterface => ({
    ...state,
    isLoading: true,
  })),
  on(getFeedSuccessAction, (state, action): FeedStateInterface => ({
    ...state,
    isLoading: false,
    data: action.feed
  })),
  on(getFeedFailureAction, (state): FeedStateInterface => ({
    ...state,
    isLoading: false,
  })),
  on(routerNavigatedAction, (): FeedStateInterface => initState)
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
