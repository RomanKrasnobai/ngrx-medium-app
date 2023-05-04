import {ProfileInterface} from '../../shared/types/profile.interface';

export interface UserProfileStateInterface {
  isLoading: boolean;
  data: ProfileInterface | null;
  error: string | null;
}
