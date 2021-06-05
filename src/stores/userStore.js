import AsyncStorage from '@react-native-async-storage/async-storage';
import {action, observable} from 'mobx';
import {loginWithEmail} from '../API/auth';
import {AuthenticateParams} from '../enums';

class UserStore {
  @observable
  userId = '';

  @action
  async login(email, password) {
    const userId = await loginWithEmail(email, password);
    if (userId === 'Wrong Details') {
      alert('Wrong Details');
    } else {
      this.userId = userId;
      AsyncStorage.setItem(AuthenticateParams.USER_ID, userId);
    }
  }

  @action
  async syncUserId() {
    const userId = await AsyncStorage.getItem(AuthenticateParams.USER_ID);
    if (userId) {
      this.userId = userId;
    }
  }
}

export default UserStore;
