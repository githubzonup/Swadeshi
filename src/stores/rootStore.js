import UserStore from './userStore';

export default class RootStore {
  userStore;

  constructor() {
    this.userStore = new UserStore();
  }
}
